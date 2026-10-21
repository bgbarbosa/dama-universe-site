import Link from "next/link";
import { PublicServiceCard } from "@/components/public-utility/PublicServiceCard";
import { publicServices, publicUtilityIntroduction } from "@/data/publicServices";
import styles from "@/components/public-utility/public-utility.module.css";

export function PublicUtilityPreview() {
  return (
    <section id="utilidade-publica" aria-labelledby="utilidade-publica-title" className={`container-site ${styles.preview}`}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Informação que aproxima</p>
          <h2 id="utilidade-publica-title">Utilidade Pública</h2>
          <p>{publicUtilityIntroduction}</p>
        </div>
        <Link href="/utilidade-publica" className={styles.textLink}>Acessar a seção <span aria-hidden="true">→</span></Link>
      </div>
      {publicServices.map(service => <PublicServiceCard key={service.slug} service={service} />)}
    </section>
  );
}
