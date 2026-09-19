import { contacts, mailto } from "@/data/contacts";
export function ProgramContact({ commercial = false }: { commercial?: boolean }) {
  const email = commercial ? contacts.commercial : contacts.support;
  return <aside className="container-site pb-12 text-sm text-muted" aria-label="Contato sobre o programa">
    <p>{commercial ? "Propostas e projetos sob consulta:" : "Suporte aos programas:"} <a className="contact-link" href={mailto(email)}>{email}</a></p>
    <p>Informe o programa e a versão. Não envie dados sensíveis ou documentos de casos.</p>
  </aside>;
}
