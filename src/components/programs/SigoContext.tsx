import styles from "./catalog.module.css";

export function SigoContext({ compact }: { compact: boolean }) {
  return (
    <div className={styles.sigoContext} data-compact={compact}>
      <div className={styles.sigoCopy}>
        <div>
          <h3>O que é o SIGO?</h3>
          <p>O SIGO — Sistema Integrado de Gestão Operacional — é utilizado na segurança pública de Mato Grosso do Sul para registrar ocorrências, organizar informações e apoiar procedimentos operacionais.
            {!compact ? " Seus recursos auxiliam o acompanhamento das atividades e a gestão de informações utilizadas pelas instituições de segurança." : null}
          </p>
          <a href="https://www.pc.ms.gov.br/informativo/servidor/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>Saiba mais sobre o SIGO <span aria-hidden="true">↗︎</span></a>
        </div>
        <div>
          <h3>Ferramentas Dama para o ambiente local</h3>
          <p>Nesta categoria, o Dama Universe reúne utilitários independentes voltados ao ambiente local do SIGO Desktop, com foco em limpeza de arquivos temporários, biometria e assinatura por token.
            {!compact ? " Consulte a finalidade, os requisitos e a compatibilidade de cada programa antes de utilizá-lo." : null}
          </p>
        </div>
      </div>
      <p className={styles.independence}><strong>Ferramentas independentes e não oficiais.</strong>{" "}Não substituem o suporte institucional nem se destinam a corrigir indisponibilidades dos servidores do SIGO.</p>
    </div>
  );
}
