"use client";

import { useState } from "react";

import { GlowButton, MetallicCard } from "@/components/ui";

const contactTypes = [
  "Dúvida",
  "Sugestão",
  "Erro em programa",
  "Parceria",
  "Patrocínio",
  "Contato profissional",
  "Outro",
];

type FormStatus = "idle" | "sending" | "success" | "error";

type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  contactType: string;
  message: string;
};

const requiredFields: Array<keyof ContactFormPayload> = [
  "name",
  "email",
  "subject",
  "contactType",
  "message",
];

function getFormValue(formData: FormData, key: keyof ContactFormPayload) {
  return String(formData.get(key) ?? "").trim();
}

function validatePayload(payload: ContactFormPayload) {
  const missingField = requiredFields.find((field) => !payload[field]);

  if (missingField) {
    return "Preencha todos os campos obrigatórios antes de enviar.";
  }

  if (!payload.email.includes("@") || !payload.email.includes(".")) {
    return "Informe um e-mail válido para contato.";
  }

  if (payload.message.length < 10) {
    return "Escreva uma mensagem um pouco mais detalhada antes de enviar.";
  }

  return null;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ContactFormPayload = {
      name: getFormValue(formData, "name"),
      email: getFormValue(formData, "email"),
      subject: getFormValue(formData, "subject"),
      contactType: getFormValue(formData, "contactType"),
      message: getFormValue(formData, "message"),
    };

    const validationError = validatePayload(payload);

    if (validationError) {
      setStatus("error");
      setFeedbackMessage(validationError);
      return;
    }

    setStatus("sending");
    setFeedbackMessage(null);

    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

      if (!endpoint) {
        throw new Error("Endpoint do formulário não configurado.");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha no envio do formulário.");
      }

      form.reset();
      setStatus("success");
      setFeedbackMessage("Mensagem enviada com sucesso. Obrigado pelo contato.");
    } catch {
      setStatus("error");
      setFeedbackMessage(
        "Não foi possível enviar a mensagem neste momento. Verifique se o formulário foi configurado corretamente ou tente novamente mais tarde."
      );
    }
  }

  return (
    <MetallicCard className="mx-auto max-w-3xl border-electric/70 shadow-[0_0_35px_rgba(37,150,255,0.28)]">
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <input
          type="hidden"
          name="_subject"
          value="Nova mensagem enviada pelo Dama Universe"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-chromeLight">
            <span>Nome</span>
            <input
              className="w-full rounded-2xl border border-border bg-backgroundSoft px-4 py-3 text-text outline-none transition placeholder:text-muted/70 focus:border-electric focus:ring-2 focus:ring-electric/25"
              name="name"
              placeholder="Seu nome"
              type="text"
              autoComplete="name"
              required
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-chromeLight">
            <span>E-mail</span>
            <input
              className="w-full rounded-2xl border border-border bg-backgroundSoft px-4 py-3 text-text outline-none transition placeholder:text-muted/70 focus:border-electric focus:ring-2 focus:ring-electric/25"
              name="email"
              placeholder="seu@email.com"
              type="email"
              autoComplete="email"
              required
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-chromeLight">
            <span>Assunto</span>
            <input
              className="w-full rounded-2xl border border-border bg-backgroundSoft px-4 py-3 text-text outline-none transition placeholder:text-muted/70 focus:border-electric focus:ring-2 focus:ring-electric/25"
              name="subject"
              placeholder="Assunto da mensagem"
              type="text"
              required
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-chromeLight">
            <span>Tipo de contato</span>
            <select
              className="w-full rounded-2xl border border-border bg-backgroundSoft px-4 py-3 text-text outline-none transition focus:border-electric focus:ring-2 focus:ring-electric/25"
              name="contactType"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {contactTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-2 text-sm font-medium text-chromeLight">
          <span>Mensagem</span>
          <textarea
            className="min-h-40 w-full rounded-2xl border border-border bg-backgroundSoft px-4 py-3 text-text outline-none transition placeholder:text-muted/70 focus:border-electric focus:ring-2 focus:ring-electric/25"
            name="message"
            placeholder="Escreva sua mensagem de forma objetiva. Não inclua dados sensíveis."
            required
          />
        </label>

        {feedbackMessage ? (
          <div
            className={
              status === "success"
                ? "rounded-2xl border border-electric/30 bg-electric/10 px-4 py-3 text-sm text-electricLight"
                : "rounded-2xl border border-red-300/35 bg-red-400/10 px-4 py-3 text-sm text-red-100"
            }
            role="status"
            aria-live="polite"
          >
            {feedbackMessage}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <GlowButton type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar mensagem"}
          </GlowButton>

          <p className="text-xs leading-6 text-muted">
            Sua mensagem será enviada pelo formulário de contato do Dama Universe.
            Evite inserir dados sensíveis, documentos sigilosos, senhas ou informações
            relacionadas a procedimentos restritos.
          </p>
        </div>
      </form>
    </MetallicCard>
  );
}
