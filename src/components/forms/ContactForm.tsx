"use client";

import { useRef, useState } from "react";
import { CONTACT_LIMITS, CONTACT_TYPES, validateContactPayload, type ContactPayload, type ContactType } from "@/lib/contact";
import { contextualContactMessage, supportsProgramContext, type PublicProgramOption } from "@/lib/contactContext";
import styles from "@/components/editorial/editorial.module.css";

type FormStatus = "idle" | "sending" | "success" | "error";
type Props = { initialContactType?: ContactType | ""; initialProgram?: string; programOptions?: readonly PublicProgramOption[] };

const help: Record<ContactType, string> = {
  "Dúvida": "Descreva o que tentou fazer, o que esperava e o que aconteceu. Não inclua dados de ocorrências, senhas, tokens ou documentos restritos.",
  "Sugestão": "Explique a melhoria desejada e sua utilidade.",
  "Erro em programa": "Descreva o que tentou fazer, o que esperava e o que aconteceu. Não inclua dados de ocorrências, senhas, tokens ou documentos restritos.",
  "Parceria": "Apresente a proposta de forma inicial. Não informe CNPJ, dados bancários ou documentos pessoais neste contato.",
  "Patrocínio": "Use este canal apenas para uma apresentação inicial sob consulta. Não há pagamento ou contratação por este formulário.",
  "Contato profissional": "Para assuntos da atuação profissional individual, consulte os canais diretos de Marco Barbosa. Não envie dados de casos ou documentos restritos.",
  "Outro": "Descreva o assunto de forma objetiva. Para capacitação, indique o tema de interesse, o público e o formato pretendido, sem dados pessoais de participantes. Isso não representa inscrição em turma.",
};

function getFormValue(formData: FormData, key: keyof ContactPayload) {
  return String(formData.get(key) ?? "").trim();
}

export function ContactForm({ initialContactType = "", initialProgram = "", programOptions = [] }: Props) {
  const validInitialType = CONTACT_TYPES.includes(initialContactType as ContactType) ? initialContactType : "";
  const validInitialProgram = programOptions.some((item) => item.slug === initialProgram) ? initialProgram : "";
  const [contactType, setContactType] = useState<ContactType | "">(validInitialType);
  const [programSlug, setProgramSlug] = useState(validInitialProgram);
  const [version, setVersion] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<{ field?: keyof ContactPayload; message: string } | null>(null);
  const inFlight = useRef(false);
  const program = programOptions.find((item) => item.slug === programSlug);
  const hasProgramContext = supportsProgramContext(contactType);
  const hasVersionContext = contactType === "Dúvida" || contactType === "Erro em programa";

  function errorProps(field: keyof ContactPayload) {
    return { "aria-invalid": fieldError?.field === field || undefined, "aria-describedby": fieldError?.field === field ? `error-${field}` : field === "message" ? "contact-message-help" : undefined };
  }

  function errorMessage(field: keyof ContactPayload) {
    return fieldError?.field === field ? <span id={`error-${field}`} className={styles.fieldError}>{fieldError.message}</span> : null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
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
    const baseValidation = validateContactPayload(payload);
    const validation = baseValidation.success
      ? validateContactPayload({ ...baseValidation.data, message: contextualContactMessage(baseValidation.data.message, contactType, program, version) })
      : baseValidation;
    if (!validation.success) {
      setStatus("error"); setFeedbackMessage(validation.message); setFieldError(validation);
      if (validation.field) {
        const input = form.elements.namedItem(validation.field);
        if (input instanceof HTMLElement) input.focus();
      }
      return;
    }
    setFieldError(null); setStatus("sending"); setFeedbackMessage(null); inFlight.current = true;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      if (response.ok) {
        form.reset(); setContactType(validInitialType); setProgramSlug(validInitialProgram); setVersion("");
        setStatus("success");
        setFeedbackMessage(result?.message ?? "Mensagem enviada com sucesso. Obrigado pelo contato.");
      } else {
        setStatus("error");
        setFeedbackMessage(result?.message ?? "Não foi possível enviar a mensagem neste momento.");
      }
    } catch {
      setStatus("error");
      setFeedbackMessage("Não foi possível enviar a mensagem. Verifique sua conexão e tente novamente mais tarde. Seu texto foi mantido para uma nova tentativa.");
    } finally { inFlight.current = false; }
  }

  return (
    <form className={styles.form} aria-busy={status === "sending"} onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="_subject" value="Nova mensagem enviada pelo Dama Universe" />
      <div className="sr-only" aria-hidden="true"><label htmlFor="contact-website">Não preencha este campo</label><input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <fieldset disabled={status === "sending"}>
        <legend className="sr-only">Dados da mensagem</legend>
        <div className={styles.formFields}>
          <label className={styles.formWide}><span id="contact-label-contactType">Tipo de contato</span><select name="contactType" aria-labelledby="contact-label-contactType" value={contactType} onChange={(event) => setContactType(event.target.value as ContactType | "")} {...errorProps("contactType")} required><option value="" disabled>Selecione uma opção</option>{CONTACT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}</select>{errorMessage("contactType")}</label>
          <label><span id="contact-label-name">Nome</span><input name="name" aria-labelledby="contact-label-name" type="text" autoComplete="name" placeholder="Seu nome" minLength={CONTACT_LIMITS.name.min} maxLength={CONTACT_LIMITS.name.max} {...errorProps("name")} required />{errorMessage("name")}</label>
          <label><span id="contact-label-email">E-mail</span><input name="email" aria-labelledby="contact-label-email" type="email" autoComplete="email" placeholder="seu@email.com" maxLength={CONTACT_LIMITS.email.max} {...errorProps("email")} required />{errorMessage("email")}</label>
          <label className={styles.formWide}><span id="contact-label-subject">Assunto</span><input name="subject" aria-labelledby="contact-label-subject" type="text" placeholder="Assunto da mensagem" minLength={CONTACT_LIMITS.subject.min} maxLength={CONTACT_LIMITS.subject.max} {...errorProps("subject")} required />{errorMessage("subject")}</label>
          {hasProgramContext ? <div className={`${styles.contextFields} ${styles.formWide}`}>
            <label><span id="contact-label-program">Programa relacionado (opcional)</span><select name="program" aria-labelledby="contact-label-program" value={programSlug} onChange={(event) => setProgramSlug(event.target.value)} aria-describedby="contact-context-help"><option value="">Sem programa relacionado</option>{programOptions.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
            {hasVersionContext ? <label><span id="contact-label-version">Versão informada (opcional)</span><input name="version" aria-labelledby="contact-label-version" type="text" value={version} onChange={(event) => setVersion(event.target.value)} maxLength={60} placeholder="A versão que você utiliza" aria-describedby="contact-context-help" /></label> : null}
            <p id="contact-context-help" className={styles.formWide}>Se informado, o contexto de programa e versão será incluído no início da mensagem enviada. A versão é informada por você, sem verificação automática do aplicativo instalado.</p>
          </div> : null}
          <label className={styles.formWide}><span id="contact-label-message">Mensagem</span><textarea name="message" aria-labelledby="contact-label-message" placeholder="Escreva sua mensagem de forma objetiva. Não inclua dados sensíveis." minLength={CONTACT_LIMITS.message.min} maxLength={CONTACT_LIMITS.message.max} {...errorProps("message")} required />{errorMessage("message")}</label>
          <p id="contact-message-help" className={styles.formWide}>{contactType ? help[contactType] : "Escolha o tipo de contato e descreva o assunto sem incluir dados sensíveis."}</p>
        </div>
      </fieldset>
      {status === "sending" ? <p role="status" className={styles.feedback}>Enviando mensagem. Aguarde a confirmação.</p> : null}
      {feedbackMessage ? <div className={styles.feedback} data-error={status === "error"} role="status" aria-live="polite">{feedbackMessage}</div> : null}
      <div className={styles.formActions}><button type="submit" className={styles.primaryButton} disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Enviar mensagem"}</button><p>Sua mensagem será enviada pelo formulário de contato do Dama Universe. Evite inserir dados sensíveis, documentos sigilosos, senhas ou informações relacionadas a procedimentos restritos.</p></div>
    </form>
  );
}
