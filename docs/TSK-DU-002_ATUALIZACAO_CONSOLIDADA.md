# TSK-DU-002 — Atualização consolidada do Dama Universe

Data: 19/09/2026. Entrega local para revisão; sem commit, push ou publicação.

## Baseline e escopo

- Repositório: `C:/Users/marco/Desktop/Codex/dama-universe-site`.
- Branch do candidato: `codex/TSK-DU-002-atualizacao-consolidada`.
- HEAD e `origin/main` consultado por `git ls-remote`: `b44ee81d66e055c124575dc8d1c428a167296961`.
- Checkout inicial em `main`; nenhum merge/rebase/cherry-pick ou conflito. Único arquivo preexistente não rastreado: `npm-audit.json`, preservado e excluído do candidato.
- Instruções gerais fornecidas pelo usuário aplicadas; nenhum AGENTS.md encontrado nos ancestrais consultados ou na árvore do repositório.
- Fontes somente leitura: `02_CONTEXTO_MESTRE.md`, `04_CONFIGURACOES_E_SEGURANCA.md` e trechos pertinentes de `DU_EDITORIAL_001_FONTE_MESTRA_v1_0.md`, na pasta sincronizada indicada na missão; documentação do próprio repositório. Instruções históricas não foram executadas como novas solicitações.
- A [Home pública](https://damauniverse.com.br/) consultada ainda apresentava os canais em preparação e a seleção antiga do Blog. Essa consulta serve como comparação; não indica publicação deste candidato.
- Nenhuma alteração de infraestrutura, dependências, segredos, DNS, Workspace, destinatário do formulário ou repositório profissional.

## Matriz de requisitos

| Requisito | Situação | Implementação ou limite |
|---|---|---|
| Inspeção e preservação | Implementado | Branch própria; trabalho preexistente mantido; sem staging |
| Identidade Dama/Marco | Implementado | Projeto autoral; apresentação individual; ausência de endosso institucional |
| Canais por assunto | Implementado | `contacts.ts`, rodapé, Contato, Sobre, GPTs, Apoie e programas |
| Fluxo Formspree | Já existente e preservado | API e endpoint inalterados; melhorias locais de erros, foco e estados |
| Cartões clicáveis | Implementado | Link semântico em toda a área principal; download como irmão, sem links aninhados |
| Criador primeiro | Implementado | Nome, foto, biografia, LinkedIn, contato, site profissional e Lattes |
| Foto otimizada | Implementado | WebP 640 × 800, 33.540 bytes; original preservado por SHA256 |
| Home compacta | Implementado | Utilidade, CTA Programas, três projetos representativos, GPTs, Blog e criador |
| FCC e tutoriais | Implementado | Vitrine substitui bloco longo repetido; download, detalhes e três vídeos preservados |
| Rolagem horizontal | Implementado | Toque, teclado, anterior/próximo, regiões rotuladas; sem rotação automática |
| Nove projetos e downloads | Preservado | `programs.ts` sem alterações; mesmos estados, URLs e metadados de pacotes |
| Caminhos Windows do Cleaner | Corrigido | Escapes em duas strings; texto JSX já correto mantido |
| Google Drive | Corrigido | Destino identificado; link FCC continua abrindo visualizador do Drive |
| Versão FCC Universal | Pendente editorial | Catálogo “Universal” e página “4.0 Universal” preservados por falta de fonte conclusiva |
| Clientes atendidos | Estrutura implementada; conteúdo pendente | Lista vazia, seção não renderizada; sem exemplos no conteúdo público |
| Explicações técnicas/GPTs | Implementado | Conceitos curtos, exemplos fictícios, aprofundamento e revisão humana; dois links mantidos |
| Blog | Implementado | Ordenação por publicação, leitura a 200 palavras/minuto, datas pt-BR e links relacionados |
| Datas históricas | Preservado | FCC recebeu `updatedAt` separado pela correção editorial; publicação permanece 25/06/2026 |
| Referências | Preservado | Dados, nomes, links e aviso existentes; somente alvo do atalho semântico na página |
| Apoie | Implementado | Sugestões, relatos e parceria sob consulta; possibilidades futuras recolhidas e sem pagamentos ativos |
| Acessibilidade | Implementado e testado no escopo | Main/atalho, foco, menu/Escape, títulos, movimento reduzido, contraste e responsividade |
| Privacidade | Preservado e esclarecido | Recusa/revogação mantidas; Formspree nomeado; nenhum rastreador novo |
| SEO | Preservado/atualizado | Domínio, rotas, canonical, OG e robots; sitemap ajustado às mudanças reais |
| GitHub/publicação | Não executado | Depende de autorização específica posterior e confirmação do vínculo Vercel |

## E-mails aplicados

| Canal | Áreas |
|---|---|
| contato@damauniverse.com.br | Rodapé e área principal de Contato |
| suporte@damauniverse.com.br | Contato por assunto e páginas de programas; “Solicitar suporte” chega à área com esse e-mail |
| comercial@damauniverse.com.br | Contato, Dama Gestor de RH e Apoie |
| cursos@damauniverse.com.br | Contato e GPTs, como consulta sobre capacitação, sem turmas anunciadas |
| marcobarbosa@damauniverse.com.br | Sobre e área secundária de Contato |
| pericia@damauniverse.com.br | Área secundária de Contato, vinculada à atuação individual e ao site profissional |

O alias técnico não integra a fonte pública de contatos nem os JS de produção verificados. WhatsApp e LinkedIn mantêm exatamente os destinos confirmados na missão. Aliases não são apresentados como departamentos ou equipes. Os links `mailto:` não redirecionam o formulário por assunto.

## Preservação

- `ContactForm → /api/contact → CONTACT_FORM_ENDPOINT → Formspree`: rota do servidor inalterada. Honeypot, limites, timeout e validação do servidor preservados. `validateContactPayload` recebeu somente a identificação opcional do campo inválido.
- Os testes de interface interceptaram respostas de falha/sucesso. Nenhuma mensagem real foi enviada; entrega efetiva não foi testada nesta tarefa.
- URLs, versões, status, tamanho, nome de instalador e hash do catálogo foram mantidos. O teste de download interceptou o destino para demonstrar a independência das ações, sem baixar ou executar instaladores. Não se afirma integridade dos binários.
- `package.json`, lockfile, `next.config.js`, `.env.example`, API, `programs.ts`, `references.ts`, `support.ts`, `seo.ts`, `robots.ts`, `consent.ts` e `YouTubeEmbed.tsx` conferidos sem diff.
- O provedor de consentimento mudou a cor do botão de aceitação e a posição do botão de reabertura, agora após o rodapé para não cobrir contatos no celular. Recusa, persistência e carregamento opcional preservados e testados.
- Hash da foto original antes/depois: `f86022123933ab55400fdd10643b8f7016ecaff05213f74f5f3e2d307addc2fc`. Sem alteração de rosto, identidade, proporção ou arquivo original.

## Testes e evidências

| Verificação | Resultado |
|---|---|
| `npm run lint` | Passou, também executado via `test:ci` |
| `npm run typecheck` | Passou, também executado via `test:ci` |
| `npm test` | 76 testes em 13 arquivos passaram |
| `npm run test:coverage` | 76 testes passaram; critérios originais mantidos |
| Cobertura configurada | 93,26% statements; 85,80% branches; 94,73% functions; 93,65% lines |
| `npm run build` | Passou; 40 páginas geradas |
| Navegador Chromium/Windows | 154/154 combinações: 22 rotas × 7 larguras |
| Interações no navegador | 26/26 verificações passaram |
| `git diff --check` | Passou |

A cobertura se refere ao conjunto de arquivos já configurado no projeto, não a uma cobertura universal do site. Os critérios não foram reduzidos.

Dimensões: 320×900, 360×900, 390×900, 430×900, 768×1000, 1024×1000 e 1440×1000; interações móveis também em 390×844. Rotas: Home, catálogo, nove programas, Sobre, Contato, GPTs, Blog, artigo FCC, Apoie, Referências e quatro políticas/termos. Em todas: HTTP 200, um main, um h1, imagens carregadas, canonical e OG presentes, nenhum link aninhado, nenhum transbordamento horizontal da página. Rolagem dos carrosséis permanece interna.

Foram exercitados: atalho e foco no main; menu por Enter/Escape; rolagem anterior/próximo; redução de movimento; nove cartões e ausência de clientes; download em aba independente com URL preservada; detalhes na mesma aba; destinos de contatos sem acioná-los; erro acessível do formulário; falha e sucesso simulados; consentimento antes/recusa/permissão/revogação; robots e sitemap.

Sem erros de JavaScript ou console na matriz normal. Erros de rede provocados pelas interceptações de falha/abortos opcionais pertencem aos testes de erro e estão separados no JSON. Não foram feitos Lighthouse, auditoria completa WCAG, teste em dispositivo físico, leitor de tela ou medição de desempenho.

Contraste calculado para as combinações examinadas: botão branco/azul antigo 3,36:1; branco/azul escuro aplicado 5,98:1; link azul claro/fundo escuro 8,59:1; texto secundário/superfície 10,01:1. Isso não equivale a auditoria integral de todos os pixels/estados.

Ocorrências intermediárias resolvidas: fechamento JSX nos carrosséis; atualização dos testes do retorno de validação e data de auditoria; restrição de escrita do cache TypeScript; tipagem do teste de consentimento; transbordamento RH/Biometria em larguras pequenas. Na revisão do diff, a chave React das novidades foi restaurada à composição data+título. O HTML visual permanece igual nessa última correção.

## Antes e depois

| Antes | Depois |
|---|---|
| Rodapé sem canais ativos | E-mail geral, WhatsApp e perfis individuais identificados |
| Ação “Ver detalhes” dentro de cada cartão | Área principal navegável, download separado |
| Criador após áreas do projeto | Criador primeiro, com foto e canais confirmados |
| Home selecionava primeiros itens cadastrados do Blog | Seleção cronológica real |
| Longo destaque FCC repetido | Vitrine de três frentes e tutoriais preservados |
| Rolagem apenas por gesto | Controles anterior/próximo e foco por teclado |
| Erro geral no formulário | Campo identificado, mensagem associada e foco |
| Caminhos de strings perdiam barras | Separadores Windows preservados |
| Futuras formas de apoio como conteúdo principal | Colaboração atual primeiro, futuro recolhido |

## Ativação futura de clientes

1. Obter autorização documentada para nome, texto, programa, período e eventual logotipo. Guardar comprovação em local privado autorizado, fora de `src`, `public` e dos artefatos públicos.
2. Inserir exclusivamente a representação pública autorizada em `src/data/clients.ts`: `name`, `program`, `description`, `period` opcional, `logo` opcional com dimensões/alt e `publication: "approved"`.
3. Não cadastrar nomes reais pendentes: mantenha-os no registro privado. O filtro de `pending` é uma proteção adicional, não um convite para copiar informações internas ao código.
4. `ClientsSection` é Server Component, retorna `null` com lista vazia/pendente/incompleta e não passa a condição nem comprovantes ao navegador.
5. Executar testes e revisar a apresentação; publicar somente após aprovação do novo conteúdo.

## Pendências delimitadas

- **FCC Universal:** falta fonte específica vigente para decidir entre “Universal” e “4.0 Universal”. Nenhum status foi promovido e nenhum download criado.
- **Clientes:** não foi localizada relação pública aprovada nas fontes autorizadas. Nenhum contrato, e-mail, processo privado ou outro repositório foi pesquisado para descobrir clientes.
- **Política:** retenção, bases legais e procedimentos operacionais não foram inventados. Formspree está confirmado nas fontes fornecidas; esses outros pontos dependem de validação do responsável e assessoria apropriada. Não se declara conformidade integral LGPD.
- **Vercel:** documentação local indica deploy automático após push, mas projeto/branch de produção não foram confirmados ao vivo. O conector não retornou equipes e a CLI informou ausência de token. Tratar qualquer push como potencial disparador de deployment; confirmar ambiente antes de publicar.
- **Entrega efetiva do formulário, integridade dos executáveis e testes em dispositivos físicos:** não executados nesta tarefa.

Perguntas realmente faltantes, sem bloquear a revisão local:

1. Qual fonte vigente confirma a denominação de versão do FCC Universal? Os dois registros foram preservados até essa decisão.
2. Quais nomes/textos/programas/períodos/logos possuem autorização pública documentada para Clientes atendidos? A estrutura está pronta e oculta.
3. Quais prazos de retenção e procedimentos operacionais do formulário foram validados? A política identifica o provedor sem inventar esses dados.
4. Qual projeto e branch da Vercel estão vinculados ao domínio oficial? O candidato permanece somente local, aguardando autorização específica de commit/push e publicação.

## Validação no Windows

```powershell
Set-Location 'C:\Users\marco\Desktop\Codex\dama-universe-site'
git branch --show-current
git status --short
npm test
npm run test:ci
git diff --check
npm run start -- --hostname 127.0.0.1 --port 3102
```

Se a prévia desta tarefa ainda estiver aberta em 3102, apenas visite `http://127.0.0.1:3102`; não inicie outra instância na mesma porta. Revise `/`, `/programas`, `/sobre`, `/contato`, `/gpts`, `/blog`, artigo FCC, `/apoie` e políticas; use Tab/Enter/Escape. No formulário, teste somente campos vazios sem mensagens reais. Um teste de entrega exige autorização específica. As capturas e os relatórios JSON fornecidos registram as simulações já executadas.

Comandos adicionais executados: inspeções `git rev-parse`, `status`, `branch`, `log`, `remote`, `ls-files --unmerged`; leitura dos marcadores de operações Git; `git switch -c codex/TSK-DU-002-atualizacao-consolidada`; `git ls-remote origin refs/heads/main`; `rg`; leitura seletiva de fontes; criação WebP via Sharp já disponível; `npm run dev`/`npm run start`; `agent-browser open/snapshot/screenshot`; automação Playwright instalada no Windows; `git diff --stat`, revisão do diff e comparações de preservação. Nenhum instalador executado.

## Candidato para commit

Busca final: “Canais oficiais em preparação” permanece somente como texto de regressão em teste; não aparece na interface. “Temporário” permanece apenas no tipo de status social, sem canal atual com esse estado. “Previsto” permanece nos tipos, no estado padrão/teste de vídeo e nas possibilidades futuras de apoio (GitHub Sponsors, Ko-fi, Buy Me a Coffee e YouTube), recolhidas e sem links ativos. Esses estados legítimos não foram apagados.

Mensagem proposta: `feat: consolida canais e experiência do Dama Universe`.

Não houve commit, staging, push, merge ou publicação. Solicitar autorização específica para commit/push e publicação do Dama Universe; a autorização de outro site não se aplica. Usar somente os caminhos explícitos abaixo; excluir `npm-audit.json`, caches, relatórios locais externos e fontes sincronizadas.

Lista exata: **59 arquivos**.

```text
docs/TSK-DU-002_ATUALIZACAO_CONSOLIDADA.md
public/images/creator/marco-barbosa.webp
src/app/__tests__/du002.test.tsx
src/app/__tests__/metadata-routes.test.ts
src/app/apoie/page.tsx
src/app/blog/[slug]/page.tsx
src/app/blog/page.tsx
src/app/changelog/dama-gerador-fcc/v3.0.0/page.tsx
src/app/contato/page.tsx
src/app/globals.css
src/app/gpts/page.tsx
src/app/layout.tsx
src/app/page.tsx
src/app/politica-de-comentarios/page.tsx
src/app/politica-de-cookies/page.tsx
src/app/politica-de-privacidade/page.tsx
src/app/programas/dama-biometria-sigo-fix/page.tsx
src/app/programas/dama-cleaner-sigo-desktop/page.tsx
src/app/programas/dama-gerador-fcc-universal/page.tsx
src/app/programas/dama-gerador-fcc/page.tsx
src/app/programas/dama-gestor-de-inqueritos/page.tsx
src/app/programas/dama-gestor-rh/page.tsx
src/app/programas/dama-inteligencia-investigativa/page.tsx
src/app/programas/dama-token-sigo-fix/page.tsx
src/app/programas/page.tsx
src/app/programas/sdo/page.tsx
src/app/referencias/page.tsx
src/app/sitemap.ts
src/app/sobre/page.tsx
src/app/termos-de-uso/page.tsx
src/components/blog/BlogCard.tsx
src/components/forms/ContactForm.tsx
src/components/forms/__tests__/ContactForm.test.tsx
src/components/home/DamaFccHighlight.tsx
src/components/home/FeaturedPrograms.tsx
src/components/home/HeroSection.tsx
src/components/home/RecentPosts.tsx
src/components/home/SiteUpdatesPreview.tsx
src/components/home/SupportPreview.tsx
src/components/layout/Footer.tsx
src/components/layout/Header.tsx
src/components/privacy/ConsentProvider.tsx
src/components/privacy/__tests__/consent-flow.test.tsx
src/components/programs/ClientsSection.tsx
src/components/programs/ProgramCard.tsx
src/components/programs/ProgramContact.tsx
src/components/ui/GlowButton.tsx
src/components/ui/HorizontalScroller.tsx
src/components/videos/DamaFccTutorials.tsx
src/data/clients.ts
src/data/contacts.ts
src/data/gpts.ts
src/data/postContents.ts
src/data/posts.ts
src/data/socialLinks.ts
src/lib/__tests__/contact.test.ts
src/lib/blog.ts
src/lib/contact.ts
vitest.setup.ts
```
