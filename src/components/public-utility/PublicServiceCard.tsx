import Image from "next/image";
import Link from "next/link";
import type { PublicService } from "@/data/publicServices";
import styles from "./public-utility.module.css";

export function PublicServiceImage({ service, caption = false }: { service: PublicService; caption?: boolean }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame}>
        <Image src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} sizes="(min-width: 1024px) 480px, (min-width: 768px) 42vw, 100vw" className={styles.image} />
      </div>
      {caption ? <figcaption className={styles.caption}>{service.image.caption}</figcaption> : null}
    </figure>
  );
}

export function PublicServiceCard({ service }: { service: PublicService }) {
  return (
    <article>
      <Link href={service.detailsUrl} aria-label={`Conhecer o ${service.name}`} className={styles.card}>
        <PublicServiceImage service={service} />
        <div className={styles.cardBody}>
          <p className={styles.eyebrow}>Saúde e bem-estar · {service.responsible}</p>
          <h3>{service.name}</h3>
          <p className={styles.fullName}>{service.fullName}</p>
          <p>{service.summary}</p>
          <span className={styles.primaryLink}>Conhecer o {service.name} <span aria-hidden="true">→</span></span>
          <p className={styles.small}>Divulgação independente. Atendimento pela {service.responsible}.</p>
        </div>
      </Link>
    </article>
  );
}
