import { updates } from "@/data";
import { UpdateCard } from "@/components/updates";
import { SectionTitle } from "@/components/ui";

export function LatestUpdates() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionTitle
          eyebrow="Versões e evolução"
          title="Últimas atualizações"
          description="Acompanhe registros de publicação, planejamento e evolução dos projetos do Dama Universe."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {updates.map((update) => (
            <UpdateCard
              key={`${update.date}-${update.area}-${update.title}`}
              update={update}
            />
          ))}
        </div>
      </div>
    </section>
  );
}