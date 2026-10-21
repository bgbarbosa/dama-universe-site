import { professionalEditorial } from "@/data/professionalEditorial";
import styles from "./professional-editorial.module.css";

type EditorialCardProps = {
  href: string;
  category: string;
  title: string;
  description: string;
  action: string;
  note?: string;
};

function EditorialCard({ href, category, title, description, action, note }: EditorialCardProps) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={action} className={styles.card}>
    <p className={styles.category}>{category} · Site profissional <span aria-hidden="true">↗︎</span></p>
    <h3>{title}</h3>
    <p>{description}</p>
    {note ? <p className={styles.note}>{note}</p> : null}
    <span className={styles.action}>{action} <span aria-hidden="true">↗︎</span></span>
  </a>;
}

export function ProfessionalLearningLinks() {
  return <section aria-labelledby="professional-learning-title" className={styles.section}>
    <h2 id="professional-learning-title">Aprenda a aplicar IA na sua rotina</h2>
    <div className={styles.grid}>
      <EditorialCard
        href={professionalEditorial.training}
        category="Capacitação sob consulta"
        title="Capacitações de Marco Barbosa"
        description="Conheça as modalidades de capacitação de Marco Barbosa em ChatGPT, engenharia de prompts e produtividade, com formatos e escopo definidos conforme o público e a necessidade."
        note="Formatos, disponibilidade e escopo dependem de alinhamento prévio."
        action="Conhecer capacitações"
      />
      <EditorialCard
        href={professionalEditorial.visualFormation}
        category="Formação complementar e conteúdo explicativo"
        title="Imagens, vídeos e IA: formação e exemplos de análise"
        description="Conheça a formação complementar de Marco Barbosa e exemplos educativos sobre análise de conteúdo visual. Aparência, procedência, métodos e contexto precisam ser considerados antes de formular conclusões."
        note="Esta referência não é um curso ministrado por Marco nem uma ferramenta de detecção. Não há identificação infalível de conteúdo sintético."
        action="Conhecer a formação e os exemplos"
      />
    </div>
  </section>;
}

export function ProfessionalPracticeLinks() {
  return <section aria-labelledby="professional-practice-title" className={styles.section}>
    <h2 id="professional-practice-title">Perícia na Prática — conteúdos de Marco Barbosa</h2>
    <EditorialCard
      href={professionalEditorial.practice}
      category="Coleção educativa"
      title="Perguntas que orientam a análise técnica"
      description="Conteúdos educativos sobre perguntas, possibilidades e limites da análise técnica de mensagens, documentos, imagens e dados. Os artigos completos permanecem no site profissional de Marco Barbosa."
      note="A coleção não representa casos atendidos, resultados comprovados ou oferta institucional de serviços."
      action="Explorar a coleção"
    />
    <ul className={styles.related} aria-label="Artigos de Marco Barbosa no site profissional">
      {professionalEditorial.articles.map(article => <li key={article.href}><a href={article.href} target="_blank" rel="noopener noreferrer">{article.title}<span aria-hidden="true">↗︎</span></a></li>)}
    </ul>
  </section>;
}
