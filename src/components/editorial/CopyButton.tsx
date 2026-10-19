"use client";

import { useState } from "react";
import styles from "./editorial.module.css";

export function CopyButton({ text, label, successLabel = "Copiado." }: { text: string; label: string; successLabel?: string }) {
  const [feedback, setFeedback] = useState("");
  const [copying, setCopying] = useState(false);

  async function copy() {
    setCopying(true);
    setFeedback("");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard indisponível");
      await navigator.clipboard.writeText(text);
      setFeedback(successLabel);
    } catch {
      setFeedback("Não foi possível copiar. Selecione e copie o texto apresentado.");
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className={styles.copyControl}>
      <button type="button" className={styles.secondaryButton} onClick={copy} disabled={copying}>{copying ? "Copiando…" : label}</button>
      <p role="status" aria-live="polite">{feedback}</p>
    </div>
  );
}
