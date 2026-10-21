import Image from "next/image";
import Link from "next/link";
import styles from "./brand.module.css";

type BrandLogoProps = { placement?: "header" | "footer" };

export function BrandLogo({ placement = "header" }: BrandLogoProps) {
  return (
    <Link href="/sobre" aria-label="Dama Universe — conhecer o ecossistema" className={`${styles.link} ${styles[placement]}`}>
      <Image src="/images/logo/dama-universe.webp" alt="Dama Universe, símbolo D em azul e prata" width={1600} height={533} sizes={placement === "header" ? "210px" : "260px"} priority={placement === "header"} className={styles.image} />
    </Link>
  );
}
