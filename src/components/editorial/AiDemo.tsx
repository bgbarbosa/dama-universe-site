"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";
import styles from "./editorial.module.css";

export const aiExamples = [
  {
    id: "escrita", label: "Clareza na escrita",
    input: "Oi, sobre o material que a gente comentou, seria bom ver as partes que precisam mudar e depois falar o que ficou faltando para seguir.",
    instruction: "Revise a clareza deste texto fictício sem inventar fatos nem alterar o sentido.",
    output: "Sobre o material que comentamos, revise os trechos que precisam de ajustes. Em seguida, indique o que ainda falta para darmos continuidade.",
    note: "Frases mais diretas e sequência explícita, mantendo o pedido original.",
  },
  {
    id: "organizacao", label: "Organização de tarefas",
    input: "Depois da revisão: compartilhar o roteiro. Antes de revisar: reunir as anotações. Revisar o roteiro depois de reunir as anotações.",
    instruction: "Organize estas tarefas fictícias em ordem de execução, respeitando as dependências e sem acrescentar tarefas ou prazos.",
    output: "1. Reunir as anotações.\n2. Revisar o roteiro.\n3. Compartilhar o roteiro.",
    note: "A sequência apenas explicita as dependências já presentes no texto de entrada.",
  },
] as const;

export function AiDemo() {
  const [selected, setSelected] = useState(0);
  const example = aiExamples[selected];
  return (
    <section id="exemplo" aria-labelledby="demo-title" className={styles.demo}>
      <p className={styles.eyebrow}>Demonstração didática</p>
      <h2 id="demo-title">Veja um exemplo</h2>
      <p className={styles.description}>Demonstração com dados inteiramente fictícios — não há processamento de conteúdo enviado pelo visitante.</p>
      <p className={styles.demoLabel}>EXEMPLO FICTÍCIO — RESULTADO ILUSTRATIVO, NÃO GERADO AO VIVO</p>
      <fieldset className={styles.filters}>
        <legend className="sr-only">Selecionar exemplo didático</legend>
        {aiExamples.map((item, index) => <button key={item.id} type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.label}</button>)}
      </fieldset>
      <div className={styles.instruction}>
        <h3>Instrução</h3><p data-testid="demo-instruction">{example.instruction}</p>
        <CopyButton key={example.id} text={example.instruction} label="Copiar instrução" successLabel="Instrução copiada." />
      </div>
      <div className={styles.comparison} aria-live="polite" aria-atomic="true">
        <div><h3>Antes</h3><p data-testid="demo-before">{example.input}</p></div>
        <div><h3>Depois · resultado preparado</h3><p className={styles.preLine} data-testid="demo-after">{example.output}</p><p className={styles.small}>{example.note}</p></div>
      </div>
    </section>
  );
}
