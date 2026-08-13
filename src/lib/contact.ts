export const CONTACT_TYPES = [
  "Dúvida",
  "Sugestão",
  "Erro em programa",
  "Parceria",
  "Patrocínio",
  "Contato profissional",
  "Outro",
] as const;

export type ContactType = (typeof CONTACT_TYPES)[number];

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  contactType: ContactType;
  message: string;
  website?: string;
};

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 5, max: 150 },
  message: { min: 10, max: 4000 },
} as const;

export type ContactValidationResult =
  | { success: true; data: ContactPayload }
  | { success: false; message: string };

function normalizeText(value: unknown) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
    : "";
}

function hasLengthBetween(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max;
}

export function validateContactPayload(value: unknown): ContactValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { success: false, message: "Dados do formulário inválidos." };
  }

  const input = value as Record<string, unknown>;
  const name = normalizeText(input.name);
  const email = normalizeText(input.email).toLowerCase();
  const subject = normalizeText(input.subject);
  const contactType = normalizeText(input.contactType);
  const message = normalizeText(input.message);
  const website = normalizeText(input.website);

  if (!hasLengthBetween(name, CONTACT_LIMITS.name.min, CONTACT_LIMITS.name.max)) {
    return { success: false, message: "Informe um nome válido." };
  }

  if (
    email.length > CONTACT_LIMITS.email.max ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { success: false, message: "Informe um e-mail válido." };
  }

  if (
    !hasLengthBetween(
      subject,
      CONTACT_LIMITS.subject.min,
      CONTACT_LIMITS.subject.max
    )
  ) {
    return { success: false, message: "Informe um assunto válido." };
  }

  if (!CONTACT_TYPES.includes(contactType as ContactType)) {
    return { success: false, message: "Selecione um tipo de contato válido." };
  }

  if (
    !hasLengthBetween(
      message,
      CONTACT_LIMITS.message.min,
      CONTACT_LIMITS.message.max
    )
  ) {
    return {
      success: false,
      message: `A mensagem deve ter entre ${CONTACT_LIMITS.message.min} e ${CONTACT_LIMITS.message.max} caracteres.`,
    };
  }

  return {
    success: true,
    data: {
      name,
      email,
      subject,
      contactType: contactType as ContactType,
      message,
      website,
    },
  };
}
