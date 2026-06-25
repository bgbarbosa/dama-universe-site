export type DownloadStatus =
  | "Disponível"
  | "Preparado"
  | "Em breve"
  | "Indisponível"
  | "Versão anterior";

export type DownloadItem = {
  program: string;
  slug: string;
  version: string;
  releaseDate: string;
  format: string;
  system: string;
  fileSize?: string;
  status: DownloadStatus;
  downloadUrl: string;
  manualUrl?: string;
  changelogUrl?: string;
  notes?: string;
};

export const downloads: DownloadItem[] = [
  {
    program: "Dama Gerador FCC 3.0",
    slug: "dama-gerador-fcc-v3-0-0",
    version: "3.0",
    releaseDate: "2026-06-23",
    format: "ZIP",
    system: "Windows",
    status: "Disponível",
    downloadUrl:
      "https://drive.google.com/file/d/1P4DmjPet9GsmoOWROxmKKb6Zt-F6fIC_/view?usp=drive_link",
    changelogUrl: "/changelog/dama-gerador-fcc/v3.0.0",
    notes:
      "Download público do pacote ZIP hospedado no Google Drive. O acesso principal ocorre pela página do programa.",
  },
];
