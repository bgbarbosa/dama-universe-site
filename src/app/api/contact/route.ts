import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

import { validateContactPayload, type ContactPayload } from "@/lib/contact";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const DUPLICATE_WINDOW_MS = 60 * 1000;
const UPSTREAM_TIMEOUT_MS = 8_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
  lastPayloadHash?: string;
  lastSubmittedAt?: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function json(message: string, status: number) {
  return NextResponse.json(
    { message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "unknown";
}

function hashPayload(payload: ContactPayload) {
  return createHash("sha256")
    .update(
      JSON.stringify({
        email: payload.email,
        subject: payload.subject,
        contactType: payload.contactType,
        message: payload.message,
      })
    )
    .digest("hex");
}

function checkRateLimit(clientId: string, payloadHash: string, now = Date.now()) {
  const current = rateLimitStore.get(clientId);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
      lastPayloadHash: payloadHash,
      lastSubmittedAt: now,
    });
    return { allowed: true as const };
  }

  if (
    current.lastPayloadHash === payloadHash &&
    current.lastSubmittedAt &&
    now - current.lastSubmittedAt < DUPLICATE_WINDOW_MS
  ) {
    return { allowed: false as const, duplicate: true as const };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false as const, duplicate: false as const };
  }

  current.count += 1;
  current.lastPayloadHash = payloadHash;
  current.lastSubmittedAt = now;
  return { allowed: true as const };
}

export async function POST(request: Request) {
  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return json("Não foi possível interpretar os dados enviados.", 400);
  }

  const validation = validateContactPayload(input);

  if (!validation.success) {
    return json(validation.message, 400);
  }

  const payload = validation.data;

  if (payload.website) {
    return json("Mensagem recebida.", 200);
  }

  const clientId = getClientIdentifier(request);
  const limit = checkRateLimit(clientId, hashPayload(payload));

  if (!limit.allowed) {
    return json(
      limit.duplicate
        ? "Esta mensagem já foi enviada. Aguarde antes de tentar novamente."
        : "Muitas tentativas de envio. Aguarde alguns minutos e tente novamente.",
      429
    );
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT?.trim();

  if (!endpoint) {
    console.error("[contact] Serviço de formulário não configurado.");
    return json("O formulário está temporariamente indisponível.", 503);
  }

  const formData = new FormData();
  formData.set("name", payload.name);
  formData.set("email", payload.email);
  formData.set("subject", payload.subject);
  formData.set("contactType", payload.contactType);
  formData.set("message", payload.message);
  formData.set("_subject", "Nova mensagem enviada pelo Dama Universe");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("[contact] Serviço externo recusou o envio.", {
        status: response.status,
      });
      return json("Não foi possível enviar a mensagem neste momento.", 502);
    }

    return json("Mensagem enviada com sucesso. Obrigado pelo contato.", 200);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "AbortError"
    ) {
      console.error("[contact] Tempo limite excedido no serviço externo.");
      return json("O serviço demorou para responder. Tente novamente.", 504);
    }

    console.error("[contact] Falha ao encaminhar mensagem.", error);
    return json("Não foi possível enviar a mensagem neste momento.", 502);
  } finally {
    clearTimeout(timeout);
  }
}
