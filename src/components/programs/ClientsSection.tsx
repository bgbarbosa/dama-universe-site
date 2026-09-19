import Image from "next/image";
import { clients, getPublishedClients, type PublicClient } from "@/data/clients";
import { MetallicCard } from "@/components/ui";

// Server Component: a condição de publicação não é serializada para o navegador.
export function ClientsSection({ items = clients }: { items?: readonly PublicClient[] }) {
  const published = getPublishedClients(items);
  if (!published.length) return null;
  return <section className="mt-12" aria-labelledby="clientes-title">
    <h2 id="clientes-title" className="mb-6 text-2xl font-bold text-text">Clientes atendidos</h2>
    <div className="grid gap-5 md:grid-cols-2">{published.map((item) => <MetallicCard key={`${item.name}-${item.program}`}>
      {item.logo ? <Image {...item.logo} alt={item.logo.alt} className="mb-4 h-16 w-auto object-contain" /> : null}
      <h3 className="text-xl font-bold text-text">{item.name}</h3>
      <p className="mt-2 text-sm text-electricLight">{item.program}{item.period ? ` · ${item.period}` : ""}</p>
      <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
    </MetallicCard>)}</div>
  </section>;
}
