import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DamaBiometriaSigoFixPage from "@/app/programas/dama-biometria-sigo-fix/page";
import { ProgramCard } from "@/components/programs";
import { getProgramBySlug } from "@/data";

const OFFICIAL_DOWNLOAD_URL =
  "https://drive.usercontent.google.com/download?id=1ch2P9lNlfgE4SuehWrwbei7k4huY7mc6&export=download&confirm=t";

describe("download do Dama Biometria SIGO Fix 2.0.0", () => {
  const program = getProgramBySlug("dama-biometria-sigo-fix");

  if (!program) {
    throw new Error("Programa não encontrado nos dados do catálogo.");
  }

  it("mantém os dados oficiais do instalador centralizados", () => {
    expect(program).toMatchObject({
      version: "2.0.0",
      compatibility: "SIGO Desktop 1.0.48",
      downloadUrl: OFFICIAL_DOWNLOAD_URL,
      downloadLabel: "Baixar versão 2.0.0",
      installerName: "Dama_Biometria_SIGO_Fix_Setup_2.0.0.exe",
      downloadSize: "233,33 MiB",
      sha256:
        "7008AAD7F921A4E14A9C9BDA98AFEC2160B667B615B3134B186AC80EA8CDE715",
    });
  });

  it("usa o endereço oficial no botão do card da página principal", () => {
    render(<ProgramCard program={program} />);

    const link = screen.getByRole("link", { name: "Baixar versão 2.0.0" });

    expect(link).toHaveAttribute("href", OFFICIAL_DOWNLOAD_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).not.toHaveAttribute("download");
  });

  it("usa o mesmo endereço em todos os botões da página do programa", () => {
    render(<DamaBiometriaSigoFixPage />);

    const links = screen.getAllByRole("link", {
      name: "Baixar versão 2.0.0",
    });

    expect(links).toHaveLength(3);

    for (const link of links) {
      expect(link).toHaveAttribute("href", OFFICIAL_DOWNLOAD_URL);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).not.toHaveAttribute("download");
    }
  });
});
