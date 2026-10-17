# TSK-DU-003 — Lançamento local do Dama Termos 1.0.0

Data de preparação: 16/10/2026. Candidato implementado e validado localmente para revisão. Sem commit, push, PR, deploy ou publicação.

## Baseline confirmado

- Repositório: `C:/Users/marco/Desktop/Codex/dama-universe-site`.
- Remote: `https://github.com/bgbarbosa/dama-universe-site.git`.
- Branch inicial: `main`.
- HEAD inicial e final: `edd4c887d6c7ee9fef793ab92a19adfaf189d90f`.
- Branch de implementação: `codex/TSK-DU-003-lancamento-dama-termos`.
- Estado inicial: nenhum arquivo rastreado alterado; somente `npm-audit.json` não rastreado.
- Nenhum AGENTS.md aplicável localizado nos ancestrais consultados ou no projeto.
- Fontes: briefing fornecido nesta conversa e duas capturas anexadas. Outros chats, projetos e arquivos de aplicativos não foram usados como fonte do conteúdo.

## Implementação

| Área | Resultado |
|---|---|
| Página | `/programas/dama-termos`, com título e subtítulo solicitados |
| Catálogo | Décimo programa, versão 1.0.0 e status Disponível, conforme lançamento informado pelo proprietário |
| Home | Dama Termos acrescentado aos destaques, preservando RH, FCC e Biometria |
| Novidades | Registro inicial do array, datado de 16/10/2026 e ligado à nova página |
| Downloads | Instalador principal e ZIP centralizados; ações separadas dos detalhes |
| Modelo | Termo de Adesão ao Programa MS Acolhe e Protege, até cinco plantões |
| Manual | Oito etapas em detalhes expansíveis nativos e acessíveis |
| Quadro técnico | Dez informações, incluindo autoria, versão, plataforma e tamanho com atribuição ao desenvolvedor |
| Imagem | Captura derivada com dados ocultados, exibida proporcionalmente e ampliável |
| SEO | Helper existente, canonical, descrição, Open Graph e Twitter; sem alteração do helper global |
| Sitemap | Nova rota derivada do catálogo; datas da Home e do catálogo atualizadas |
| Suporte | `ProgramContact`, usando os contatos centralizados existentes |

O modelo `Program` recebeu somente `alternativeDownload` e `previewImage` opcionais. `ProgramCard` passou a renderizar esses campos quando presentes, preservando o comportamento dos outros programas. A captura não foi usada como ícone pequeno.

Não foi criado artigo de Blog nem nova seção global. A Home já usa `FeaturedPrograms`; não foi necessário alterar sua composição em `src/app/page.tsx`.

## Conteúdo e limites

As funcionalidades do aplicativo, o nome do instalador, o tamanho aproximado de 19,14 MiB e as duas páginas do PDF são informações fornecidas pelo proprietário. As verificações desta tarefa são do site e não comprovam funcionamento, compatibilidade, integridade ou assinatura do aplicativo Windows.

Foram incluídos os avisos de ferramenta independente, assinatura visual sem equivalência automática a assinatura digital certificada, ausência de envio automático de e-mail e uso de serviços externos conforme as exigências do destinatário.

Os endereços `plantao180@pc.ms.gov.br` e `depac@pc.ms.gov.br` aparecem somente como destinatários informados do termo, explicitamente separados do suporte da Dama Universe.

## Imagem e privacidade

O proprietário determinou a ocultação dos valores preenchidos na segunda captura. Foi utilizada a ferramenta nativa de edição de imagem, em modo de edição do anexo, para ocultar nome, matrícula, cargo, lotação, data/local do plantão, município, UF e data do termo. Não foram adicionados dados fictícios ou um novo logotipo. O resultado foi inspecionado visualmente e convertido para WebP com Sharp já instalado.

- Asset: `public/images/programs/dama-termos-interface.webp`.
- Dimensões: 1443 × 1090; tamanho: 78.784 bytes.
- O anexo original não está no diretório público.
- A legenda esclarece que a captura fornecida mostra uma versão de desenvolvimento no rodapé; o lançamento informado é 1.0.0.
- Os dois anexos originais permaneceram com seus hashes SHA-256 iniciais:
  - captura 103843: `8cf1ce10641592e23d66077278c1758774fcc5b3114b1931538c71593cc74444`;
  - captura 103928: `9df32bf86e6872241c684a4a2af0b07a57254ce8a0cc3a41099c7e95898cabf7`.

Prompt de edição: ocultar somente os valores preenchidos com barras opacas dentro dos campos; preservar proporção, enquadramento, rótulos, botões, interface e rodapé da captura real, sem redesenho ou novos textos. A edição foi feita pela ferramenta nativa `image_gen`, sem CLI/API externa.

## Links de download

| Destino | Evidência consultada sem autenticação |
|---|---|
| `https://drive.google.com/file/d/1Rk16smRE6dbuyTzG8LXluEHAQjIfvgty/view?usp=sharing` | Página identifica `DamaTermos_Setup_1.0.0.exe`. A tentativa de leitura parcial do conteúdo chegou ao aviso `Google Drive - Virus scan warning`, não ao binário. A transferência do EXE não foi confirmada nem o aviso ultrapassado. |
| `https://drive.google.com/file/d/1IRa8Sfg-_XtNiZQuAfYpHPld3M-_q9nY/view?usp=sharing` | Página identifica `DamaTermos_Setup_1.0.0.zip`. Leitura de 32 bytes respondeu 206, com Content-Disposition do nome correto e assinatura ZIP `504b0304`. |

O ZIP não foi extraído nesta tarefa; seu conteúdo como instalador vem do briefing. Nenhum instalador foi executado. Não foram calculados ou anunciados hashes dos downloads nem assinatura de código. Os identificadores e destinos fornecidos foram mantidos literalmente.

## Verificações realizadas

| Comando/verificação | Resultado final |
|---|---|
| `npm run test:ci` | Aprovado, exit code 0 |
| Lint e TypeScript | Aprovados pela suíte |
| Vitest com cobertura | 84 testes em 14 arquivos aprovados |
| Cobertura configurada | Statements 93,26%; branches 85,80%; functions 94,73%; lines 93,65% |
| Build | Aprovado; 41 páginas geradas, incluindo a nova rota estática |
| Navegador Chromium local | 12/12 combinações aprovadas: Home, catálogo e nova página em 320, 390, 768 e 1440 px |
| Fluxos e verificações no navegador | 48/48 aprovados; incluem os 12 controles de layout |
| Sitemap local | 31 URLs únicas, todas com HTTP 200 |
| Console/JavaScript | Nenhum erro registrado na sessão de validação final |
| Formulário | Nenhuma mensagem ou POST de contato enviado |
| `git diff --check` | Aprovado |
| Preservação | Nove programas anteriores, novidades antigas, cinco downloads anteriores, contatos, formulário, configurações e dependências preservados |

As interações cobrem catálogo e Home para a página, menu móvel, Escape/foco, controles do manual por Enter, foco visível, proporção da imagem e os dois downloads em abas independentes. O teste de abertura dos downloads interceptou somente os dois destinos externos; não transferiu instaladores. A consulta pública dos links é a evidência separada descrita acima.

Os limites de cobertura não foram reduzidos. A suíte mantém seu conjunto prévio de arquivos cobertos; isso não equivale a cobertura integral de todos os componentes.

Ocorrências intermediárias resolvidas: TypeScript identificou uma variável possivelmente indefinida, corrigida com desestruturação após validação; o Vitest exigiu acesso ao diretório temporário do Windows; o navegador Python procurou uma revisão ausente, sendo reutilizado o Chromium já instalado; a preparação inicial de capturas esperava imagens lazy fora da tela, corrigida no script externo de verificação. Nenhuma dependência foi instalada ou atualizada para resolver esses pontos.

## Preservação de escopo

- As entradas dos nove programas anteriores e as novidades anteriores foram comparadas estruturalmente com o HEAD e permaneceram idênticas.
- `package.json`, `package-lock.json`, `next.config.js`, `.env.example`, contatos, Blog, GPTs, referências, apoio, clientes, helper SEO e fluxo de contato não foram alterados.
- `npm-audit.json` continua não rastreado, com SHA-256 `085b1a9770fcd00894884043af91c13b9a2b0f111bc687f5a88f6c80873aafe3`.
- FCC Universal, clientes ocultos e demais pendências antigas não foram modificados.
- Nenhuma mudança em DNS, Vercel, ambiente ou outros projetos.

## Lista exata dos arquivos do candidato

Alterados:

1. `src/data/programs.ts`
2. `src/data/updates.ts`
3. `src/components/home/FeaturedPrograms.tsx`
4. `src/components/programs/ProgramCard.tsx`
5. `src/app/sitemap.ts`
6. `src/app/__tests__/metadata-routes.test.ts`

Criados:

7. `src/app/programas/dama-termos/page.tsx`
8. `src/app/programas/dama-termos/__tests__/release.test.tsx`
9. `public/images/programs/dama-termos-interface.webp`
10. `docs/TSK-DU-003_LANCAMENTO_DAMA_TERMOS.md`

Scripts, capturas e relatórios da sessão estão fora do repositório, no workspace desta tarefa. Não fazem parte do candidato.

## Revisão local no Windows

Com o build já gerado:

```powershell
Set-Location 'C:\Users\marco\Desktop\Codex\dama-universe-site'
git branch --show-current
git status --short
npm run start -- --hostname 127.0.0.1 --port 3103
```

Se a prévia da tarefa ainda estiver ativa na porta 3103, abra os endereços sem iniciar outra instância:

- http://127.0.0.1:3103/programas/dama-termos
- http://127.0.0.1:3103/programas
- http://127.0.0.1:3103/

Revise os dois downloads, a imagem ampliável, o quadro técnico, as oito etapas do manual, os avisos e os destinos institucionais. Use Tab/Enter/Escape e a visualização móvel. O formulário de contato não é necessário para essa revisão.

## Pendências e conclusão local

- A transferência do EXE está limitada pelo aviso de verificação do Google Drive. O destino e o nome estão corretos na página consultada; não se afirma que o binário foi recebido.
- A captura fornecida tem rodapé de desenvolvimento, explicitado na página; uma captura final poderá substituí-la futuramente mediante fornecimento e revisão.
- O aplicativo Windows, os conteúdos dos instaladores e dispositivos físicos não foram testados.
- A revisão editorial/visual pelo proprietário e a autorização de publicação permanecem etapas posteriores.

Implementação e verificações locais concluídas com as limitações acima. Sem staging, commit, push, PR, deploy ou publicação.
