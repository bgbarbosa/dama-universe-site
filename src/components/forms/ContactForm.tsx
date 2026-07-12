"use client";

import { useState } from "react";

import { GlowButton, MetallicCard } from "@/components/ui";
import {
  CONTACT_LIMITS,
  CONTACT_TYPES,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";

type FormStatus = "idle" | "sending" | "success" | "error";

function getFormValue(formData: FormData, key: keyof ContactPayload) {
  return String(formData.get(key) ?? "").trim();
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: getFormValue(formData, "name"),
      email: getFormValue(formData, "email"),
      subject: getFormValue(formData, "subject"),
      contactType: getFormValue(formData, "contactType"),
      message: getFormValue(formData, "message"),
      website: getFormValue(formData, "website"),
    };

    const validation = validateContactPayload(payload);

    if (!validation.success) {
      setStatus("error");
      setFeedbackMessage(validation.message);
      return;
    }

    setStatus("sending");
    setFeedbackMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const result = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (response.ok) {
        form.reset();
        setStatus("success");
        setFeedbackMessage(
          result?.message ?? "Mensagem enviada com sucesso. Obrigado pelo contato."
        );
      } else {
        setStatus("error");
        setFeedbackMessage(
          result?.message ?? "Não foi possível enviar a mensagem neste momento."
        );
      }
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

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="contact-website">Não preencha este campo</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-chromeLight">
            <span>Nome</span>
            <input
              className="w-full rounded-2xl border border-border bg-backgroundSoft px-4 py-3 text-text outline-none transition placeholder:text-muted/70 focus:border-electric focus:ring-2 focus:ring-electric/25"
              name="name"
              placeholder="Seu nome"
              type="text"
              autoComplete="name"
              minLength={CONTACT_LIMITS.name.min}
              maxLength={CONTACT_LIMITS.name.max}
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
              maxLength={CONTACT_LIMITS.email.max}
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
              minLength={CONTACT_LIMITS.subject.min}
              maxLength={CONTACT_LIMITS.subject.max}
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
              {CONTACT_TYPES.map((type) => (
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
            minLength={CONTACT_LIMITS.message.min}
            maxLength={CONTACT_LIMITS.message.max}
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
