# PRD — Dama Universe

> Documento da implementação real auditada em 12 de julho de 2026. Versão documental: 1.0. Quando um dado operacional não está no repositório, ele é marcado como **não confirmado** ou **pendente de validação**.

## 1. Identificação do produto

| Item | Situação confirmada |
| --- | --- |
| Produto | Dama Universe |
| Propósito declarado | Site, blog e vitrine de programas, GPTs, referências, downloads e registros técnicos |
| Responsável identificado | Marco Aurélio Pereira Barbosa, apresentado em `src/app/sobre/page.tsx` como criador |
| Domínio canônico | `https://damauniverse.com.br`, em `src/lib/seo.ts` |
| Repositório | `https://github.com/bgbarbosa/dama-universe-site.git` (remote `origin`) |
| Versionamento | Git; branch auditada `recuperacao-consentimento-analytics`; pacote na versão `0.1.0` |
| Framework | Next.js 15.5.20, React 19, TypeScript 5.7, App Router |
| Interface | Tailwind CSS 3.4, PostCSS e Autoprefixer |
| Testes | Vitest 4, Testing Library, jsdom e cobertura V8 |
| Hospedagem | Vercel é indicada por `@vercel/analytics` e pelos README de patches; vínculo do projeto, equipe e configurações do painel: **não confirmados** |
| Data deste documento | 12/07/2026 |

Não existe `README.md` geral, `vercel.json`, `.nvmrc`, `engines` em `package.json` nem workflow de CI versionado. A versão do Node usada na auditoria é 24.14.1, mas a versão configurada na Vercel é **não confirmada**.

## 2. Visão do produto

O Dama Universe organiza em um domínio público o ecossistema autoral Dama. O visitante pode descobrir programas, conhecer seus estados e versões, acessar downloads publicados, consultar tutoriais, usar GPTs externos, ler artigos, acompanhar novidades, consultar referências e entrar em contato. A proposta de valor é reunir divulgação, documentação e histórico público em uma interface única, preservando a responsabilidade humana e evitando a exposição de material sensível.

O público inclui usuários dos programas Windows, profissionais interessados em automação, inteligência artificial, dados e computação forense, leitores técnicos, possíveis apoiadores e o próprio mantenedor. A identidade visual é escura, com tons cromados, azul elétrico e dourado, cards metálicos e chamadas de ação destacadas.

## 3. Objetivos

### 3.1 Principais

- apresentar os programas e o estágio real de cada projeto;
- facilitar o acesso a detalhes, downloads e tutoriais disponíveis;
- publicar conteúdos e referências técnicas do ecossistema Dama;
- manter um registro público de novidades e evolução.

### 3.2 Secundários e de conteúdo

- divulgar GPTs personalizados e canais de contato;
- reconhecer fontes de estudo e produção técnica;
- preparar futuros canais de apoio, parceria e comentários;
- manter descrições, versões, datas, links e avisos de responsabilidade coerentes.

### 3.3 Técnicos

- produzir páginas estáticas e metadados indexáveis com Next.js;
- centralizar listas reutilizadas em `src/data` quando a arquitetura atual permitir;
- validar código com lint, TypeScript, testes e build;
- manter navegação responsiva e componentes compartilhados.

### 3.4 Segurança e privacidade

- validar o contato no cliente e no servidor, limitar abuso e não expor o endpoint privado;
- carregar Vercel Analytics, Google Analytics e Microsoft Clarity somente após consentimento;
- impedir iframes do YouTube e Giscus antes do consentimento de conteúdo externo;
- aplicar CSP e outros headers defensivos;
- informar ao visitante os serviços usados e permitir revisão da escolha.

### 3.5 Acessibilidade e SEO

- oferecer navegação por teclado, foco visível, menu móvel identificável e controles com nomes acessíveis;
- fornecer títulos, descrições, canonical, Open Graph, Twitter Card, sitemap e robots;
- manter conteúdo utilizável entre 320 e 1440 px.

## 4. Levantamento técnico e escopo atual

### 4.1 Estrutura principal

```text
public/
  images/og/                    imagem social 1200 × 630
  images/programs/              ícones e capturas dos programas
src/
  app/                          rotas, layout, API, sitemap e robots
  components/                   componentes por domínio e componentes de UI
  content/                      legado Markdown; apenas um changelog antigo permanece
  data/                         fontes TypeScript de conteúdo estruturado
  lib/                          SEO, consentimento, analytics, contato e utilitários
  styles/                       nota de estilos
next.config.js                  headers e origens de desenvolvimento
tailwind.config.ts              tema visual e caminhos de conteúdo
vitest.config.ts                testes e limites de cobertura
package.json                    scripts e dependências
.env.example                    contrato das variáveis de ambiente
```

O ponto de composição global é `src/app/layout.tsx`: define metadados globais, idioma, tema, `ConsentProvider`, `Header` e `Footer`. A página inicial é `src/app/page.tsx`. Não há `error.tsx`, `global-error.tsx`, `loading.tsx` ou `not-found.tsx`; erros e 404 usam o tratamento padrão do Next.js, exceto o `notFound()` da rota dinâmica do blog.

### 4.2 Rotas públicas

| Rota | Implementação | Estado |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | implementada |
| `/programas` | `src/app/programas/page.tsx` | catálogo implementado |
| `/programas/dama-gerador-fcc` | página estática própria | implementada, download e tutoriais |
| `/programas/dama-cleaner-sigo-desktop` | página estática própria | implementada, download |
| `/programas/dama-biometria-sigo-fix` | página estática própria | implementada, download |
| `/programas/dama-token-sigo-fix` | página estática própria | implementada, download |
| `/programas/dama-gerador-fcc-universal` | página estática própria | implementada, sem download |
| `/programas/sdo` | página estática própria | implementada, sem download |
| `/programas/dama-gestor-de-inqueritos` | página estática própria | implementada, sem download |
| `/programas/dama-inteligencia-investigativa` | página estática própria | implementada, sem download |
| `/downloads` | `permanentRedirect()` para `/programas/dama-gerador-fcc` | redirecionamento 308, não indexado |
| `/blog` | lista de `posts` | implementada |
| `/blog/[slug]` | conteúdo de `postContents`; 8 slugs pré-gerados | implementada |
| `/gpts` | lista de `customGpts` | implementada |
| `/referencias` | agrupamento por tipo | implementada |
| `/apoie` | opções futuras de apoio | implementada como informativa |
| `/sobre` | produto e responsável | implementada |
| `/contato` | formulário interno | implementada; envio depende de configuração externa |
| `/changelog/dama-gerador-fcc/v3.0.0` | página estática | implementada |
| `/termos-de-uso` | texto em TSX | implementada |
| `/politica-de-privacidade` | texto em TSX | implementada |
| `/politica-de-cookies` | texto em TSX | implementada |
| `/politica-de-comentarios` | texto em TSX | implementada |
| `/sitemap.xml` | `src/app/sitemap.ts` | gerada, 29 URLs indexáveis |
| `/robots.txt` | `src/app/robots.ts` | gerada |

Não foram encontradas busca, autenticação, conta de usuário, painel administrativo, banco de dados, CMS, página dedicada de atualizações nem página genérica dinâmica de programa.

### 4.3 Rota de API

`POST /api/contact`, em `src/app/api/contact/route.ts`, recebe JSON, normaliza e valida campos, absorve o honeypot, aplica limite em memória, bloqueia repetição, transforma os dados em `FormData` e encaminha ao `CONTACT_FORM_ENDPOINT`. Usa runtime Node.js e timeout de oito segundos.

### 4.4 Componentes

- `components/layout`: cabeçalho fixo, navegação desktop/móvel e rodapé;
- `components/home`: seções da Home. `FeaturedPrograms` e `ReferencesPreview` existem e são exportados, mas não são renderizados pela Home atual;
- `components/programs`, `blog`, `gpts`, `references`, `support`, `updates`: cards de domínio;
- `components/privacy`: consentimento e embed protegido do YouTube;
- `components/forms`: formulário de contato;
- `components/comments`: Giscus opcional;
- `components/videos`: tutoriais reais do FCC e um `VideoCard` genérico atualmente usado apenas em testes;
- `components/notices`: avisos informativos, de segurança e responsabilidade;
- `components/ui`: cards, títulos, botões e cabeçalhos reutilizáveis.

### 4.5 Matriz de situação do escopo

| Capacidade | Situação |
| --- | --- |
| Home, catálogo, páginas de programa, blog, GPTs, referências, sobre e legais | implementado |
| Download | quatro URLs externas em programas; `/downloads` apenas redireciona |
| Últimas atualizações | bloco de oito itens na Home; página própria não encontrada |
| Vídeos | três tutoriais FCC; iframe condicionado a consentimento |
| Comentários | componente ligado aos posts, mas invisível sem quatro variáveis Giscus |
| Analytics | Vercel, GA e Clarity implementados após consentimento |
| Contato | fluxo implementado; provedor/endpoint de produção pendente de validação |
| Menu móvel | implementado com fechamento por seleção, Escape e clique externo |
| SEO técnico | implementado; imagem social global compartilhada por todas as páginas |
| Testes automatizados | 9 arquivos cobrindo regras, API e componentes críticos |
| Testes E2E versionados | não encontrados |
| Deploy automatizado | indicado, mas configuração do projeto Vercel não está no repositório |

## 5. Fontes de dados oficiais

| Conteúdo | Arquivo principal e estrutura | Consumidores | Observações |
| --- | --- | --- | --- |
| Programas, versões e downloads | `src/data/programs.ts`, `Program[]` | catálogo, cards, Home FCC, páginas disponíveis, sitemap | fonte central de resumo; detalhes extensos continuam duplicados nas páginas estáticas |
| Atualizações | `src/data/updates.ts`, `UpdateItem[]` | `SiteUpdatesPreview` | ordem manual; a Home usa os primeiros 8 |
| Posts/listagem | `src/data/posts.ts`, `PostItem[]` | blog, Home e sitemap | ordem manual; Home usa os primeiros 3 |
| Corpo dos posts | `src/data/postContents.ts`, `PostContent[]` | `/blog/[slug]` | repete todos os campos de `PostItem`; teste exige slugs sincronizados, mas textos podem divergir |
| Referências | `src/data/references.ts`, `ReferenceItem[]` | página de referências | agrupadas por ordem fixa de categorias e, dentro delas, pela ordem do array |
| GPTs | `src/data/gpts.ts`, `CustomGpt[]` | página e Home | links externos ChatGPT |
| Apoio | `src/data/support.ts`, `SupportOption[]` | página de apoio | nenhum canal ativo no estado auditado |
| Redes sociais | `src/data/socialLinks.ts`, `SocialLink[]` | rodapé | todos sem URL e não ativos; não são renderizados |
| Menu e rodapé | `src/data/navigation.ts` | Header, Footer e sitemap | rodapé deriva menu principal + legais |
| Dados de contato | `src/lib/contact.ts` | formulário, API e testes | enum e limites centralizados; página repete visualmente os rótulos dos tipos |
| Metadados | `src/lib/seo.ts` + `metadata` de cada página | layout, páginas, sitemap e robots | OG global; títulos/descrições por rota |
| Políticas | os quatro `src/app/.../page.tsx` | rotas legais | textos embutidos em TSX, sem CMS |
| Vídeos/tutoriais | `src/components/videos/DamaFccTutorials.tsx` | Home e página FCC | array local; não há fonte central ativa de vídeos |
| Imagens | `public/images` + caminhos em dados/páginas | cards, páginas e metadata | diretórios de blog/referências/logo estão vazios, salvo `.gitkeep` |
| Changelog | página TSX v3.0.0 | rota e sitemap | Markdown v1.0.0 é legado divergente e cita rota inexistente |

### 5.1 Duplicações e divergências confirmadas

1. `posts.ts` e `postContents.ts` repetem metadados. A listagem/sitemap usa o primeiro; a página individual usa o segundo. Ambos ainda são utilizados e devem ser atualizados juntos.
2. `programs.ts` centraliza resumo, versão, status e URL, mas cada pasta em `src/app/programas` mantém texto, recursos e metadata próprios. Ambos são necessários.
3. `src/content/changelog/dama-gerador-fcc/v1.0.0.md` declara uma rota v1.0.0 inexistente. Não é consumido em runtime e deve ser tratado como legado, não como fonte oficial.
4. `FeaturedPrograms` e `ReferencesPreview` são componentes válidos, porém não montados em `src/app/page.tsx`.
5. `VideoCard` é genérico, mas o único catálogo real de vídeos está no array local de `DamaFccTutorials`.

Para impedir divergência, toda revisão de programa deve confrontar `programs.ts`, sua página, `updates.ts`, download, metadata e sitemap. Todo post deve alterar `posts.ts` e `postContents.ts` no mesmo commit. Os testes de integridade devem continuar obrigatórios.

## 6. Fluxos de conteúdo

```text
programs.ts
├─→ ProgramCard → /programas
├─→ featuredPrograms → FeaturedPrograms (existente, fora da Home atual)
├─→ getProgramDownloadUrl → Home FCC e páginas de programas disponíveis
└─→ sitemap.ts → URLs /programas/{slug}

página estática src/app/programas/{slug}/page.tsx
└─→ detalhes completos + metadata + imagens/tutoriais próprios
```

```text
updates.ts → SiteUpdatesPreview → Home (slice 0..7)
posts.ts → BlogCard → /blog + Home (slice 0..2) + sitemap
postContents.ts → generateStaticParams/generateMetadata → /blog/[slug]
references.ts → agrupamento por categoria → ReferenceCard → /referencias
gpts.ts → GptCard → /gpts + GptsPreview (dois primeiros destacados)
navigation.ts → Header + Footer → sitemap estático
socialLinks.ts → filtro status=Ativo e URL válida → Footer
DamaFccTutorials.tsx → YouTubeEmbed → Home e página FCC
seo.ts → layout/páginas + sitemap/robots → metadata HTML e arquivos técnicos
```

Downloads não possuem entidade própria: `Program.downloadUrl` alimenta cards e `getProgramDownloadUrl()`. A rota `/downloads` não lista downloads.

## 7. Fora do escopo atual

- busca, filtros globais e paginação;
- CMS ou edição pelo navegador;
- banco de dados, autenticação e área administrativa;
- página própria de últimas atualizações;
- catálogo central de downloads com tamanho, plataforma, formato ou checksum;
- conteúdo Markdown/MDX para posts em produção;
- imagem, autor ou SEO individual por post;
- feed RSS, newsletter e notificações;
- comentários sem configuração Giscus;
- canais sociais e financeiros ativos;
- testes E2E e pipeline CI versionados;
- rate limit distribuído entre instâncias serverless.

O apoio financeiro e alguns canais estão declarados como futuros em `support.ts` e `socialLinks.ts`. Não devem ser apresentados como disponíveis.

## 8. Perfis e jornadas

### 8.1 Perfis

- interessado em conhecer projetos e estados de desenvolvimento;
- usuário de Windows procurando ferramenta ou correção específica;
- usuário que procura o download publicado;
- leitor do blog e de registros técnicos;
- profissional que consulta referências;
- visitante que quer conhecer o criador;
- parceiro, patrocinador ou apoiador potencial;
- mantenedor que atualiza código e conteúdo.

### 8.2 Jornadas principais

1. **Conhecer programa:** Home ou menu → `/programas` → card → página individual.
2. **Baixar:** card ou página de programa disponível → URL externa Google Drive; `/downloads` leva especificamente ao FCC.
3. **Ver novidade:** Home → faixa “Novidades recentes” → link relacionado. Não existe arquivo detalhado para cada novidade.
4. **Ver tutorial:** Home/página FCC → placeholder protegido → permitir conteúdo externo → iframe `youtube-nocookie.com`; alternativamente abrir link direto.
5. **Ler post:** Home ou `/blog` → `/blog/[slug]` → se configurado e permitido, Giscus.
6. **Consultar referência:** menu → `/referencias` → âncora de categoria → link externo em nova aba.
7. **Contato:** `/contato` → preencher → validação local → `POST /api/contact` → serviço privado.
8. **Privacidade:** banner → aceitar, recusar ou personalizar → armazenamento local por 180 dias → botão “Privacidade” para reabrir.
9. **Celular:** botão “Abrir menu” → lista de oito destinos → seleção fecha o painel.

## 9. Requisitos funcionais

| ID | Requisito e situação | Arquivos | Critério de aceitação |
| --- | --- | --- | --- |
| RF-001 | Exibir navegação principal e destacar rota ativa — implementado | `navigation.ts`, `Header.tsx` | todos os 8 links abrem a rota correta |
| RF-002 | Disponibilizar menu móvel acessível — implementado | `Header.tsx` | abre por botão, informa `aria-expanded`, fecha por Escape, fora e seleção |
| RF-003 | Exibir links legais e institucionais no rodapé — implementado | `navigation.ts`, `Footer.tsx` | nenhum placeholder `#`; links externos seguros |
| RF-004 | Listar todos os programas cadastrados — implementado | `programs.ts`, `/programas/page.tsx` | um card por item, sem slug duplicado |
| RF-005 | Oferecer página própria por programa — implementado manualmente | `src/app/programas/*/page.tsx` | `detailsUrl` resolve sem 404 e metadata corresponde |
| RF-006 | Destacar programas configurados — parcial na arquitetura | `featuredPrograms`, `FeaturedPrograms.tsx`, `page.tsx` | componente filtra corretamente, mas não está montado na Home |
| RF-007 | Exibir download somente quando publicado — implementado | `ProgramCard.tsx`, `programs.ts` | sem `downloadUrl`, botão não aparece |
| RF-008 | Reutilizar a URL oficial do download nas páginas suportadas — implementado | `getProgramDownloadUrl`, páginas disponíveis | card e página usam a mesma URL |
| RF-009 | Redirecionar `/downloads` — implementado | `downloads/page.tsx` | resposta permanente 308 para FCC |
| RF-010 | Exibir as 8 primeiras novidades na Home — implementado | `updates.ts`, `SiteUpdatesPreview.tsx` | ordem visual igual à ordem do array |
| RF-011 | Listar posts — implementado | `posts.ts`, `BlogCard`, `/blog` | um card por post |
| RF-012 | Gerar página e metadata por slug de post — implementado | `postContents.ts`, `/blog/[slug]` | slugs conhecidos geram página; desconhecido retorna 404 |
| RF-013 | Exibir os 3 primeiros posts na Home — implementado | `RecentPosts.tsx` | ordem igual ao array `posts` |
| RF-014 | Exibir referências agrupadas — implementado | `references.ts`, `/referencias` | somente categorias não vazias e links funcionais |
| RF-015 | Exibir GPTs oficiais — implementado | `gpts.ts`, `/gpts`, `GptsPreview` | links abrem ChatGPT externamente |
| RF-016 | Informar opções de apoio sem ativar canal inexistente — implementado | `support.ts`, `/apoie` | itens sem URL não criam falso link |
| RF-017 | Encaminhar contato validado pelo servidor — implementado/depende de ambiente | `ContactForm`, `contact.ts`, API | payload válido chega ao endpoint; falhas retornam mensagem segura |
| RF-018 | Deter spam básico — implementado | API de contato | honeypot, 5 pedidos/15 min/IP e duplicado/60 s |
| RF-019 | Exibir políticas públicas — implementado | 4 páginas legais | rotas indexáveis e ligadas no rodapé |
| RF-020 | Solicitar consentimento antes de analytics — implementado | `ConsentProvider`, `analytics.ts` | nenhum dos 3 coletores aparece antes da aceitação |
| RF-021 | Permitir consentimento por categoria — implementado | `ConsentProvider`, `consent.ts` | analytics e mídia externa podem ser escolhidos separadamente |
| RF-022 | Persistir e expirar a escolha — implementado | `consent.ts` | chave local válida por 180 dias, versão 1 |
| RF-023 | Reabrir e revogar preferências — implementado | `ConsentProvider` | botão disponível; revogação interrompe e recarrega coletores |
| RF-024 | Bloquear YouTube antes da permissão — implementado | `YouTubeEmbed` | sem iframe antes de `externalMedia=true` |
| RF-025 | Usar modo de privacidade aprimorada do YouTube — implementado | `YouTubeEmbed` | iframe em `youtube-nocookie.com` |
| RF-026 | Condicionar Giscus à configuração e consentimento — implementado | `GiscusComments` | sem config retorna `null`; com config só injeta após permissão |
| RF-027 | Gerar metadata canonical e social — implementado | `seo.ts`, metadata das páginas | URLs absolutas, OG 1200×630 e Twitter large image |
| RF-028 | Gerar sitemap sem duplicação — implementado | `sitemap.ts` | 29 URLs, inclui listas oficiais e exclui `/downloads` |
| RF-029 | Permitir indexação — implementado | `robots.ts`, layout | `allow: /`, sitemap canônico, index/follow |
| RF-030 | Exibir mensagens de formulário — implementado | `ContactForm`, API | sucesso/erro em região `aria-live` sem revelar detalhes internos |

## 10. Requisitos não funcionais

| ID | Requisito | Estado e evidência |
| --- | --- | --- |
| RNF-001 | Desempenho | páginas predominantemente Server Components; imagens de cards com `next/image`; YouTube lazy; sem meta quantitativa formal |
| RNF-002 | Segurança | CSP, HSTS em produção, nosniff, SAMEORIGIN, Referrer e Permissions Policy em `next.config.js` |
| RNF-003 | Privacidade | opt-in para analytics/mídia, persistência local e políticas; revisão jurídica pendente |
| RNF-004 | Responsividade | classes Tailwind e menu móvel; validação recente entre 320–1440 px, sem suíte E2E versionada |
| RNF-005 | Acessibilidade | foco visível, ARIA, teclado e labels; teste com leitor de tela real pendente |
| RNF-006 | Compatibilidade | alvo TypeScript ES2017 e navegadores suportados pelo Next; matriz formal não definida |
| RNF-007 | Manutenibilidade | dados tipados e componentes; ainda há duplicações em posts e páginas de programa |
| RNF-008 | Confiabilidade | strict TypeScript, validação dupla do contato, testes e build; provedor externo permanece dependência |
| RNF-009 | SEO | canonical, metadata, sitemap e robots; sem dados estruturados/schema.org |
| RNF-010 | Observabilidade | três analytics; logs de erro do contato sem payload; dashboard/alertas não confirmados |
| RNF-011 | Qualidade | ESLint, Vitest, cobertura mínima e build em `test:ci` |
| RNF-012 | Disponibilidade | determinada pela Vercel e provedores externos; SLO/SLA não definido |
| RNF-013 | Escalabilidade | conteúdo em arrays atende catálogo atual; edição e rate limit não escalam horizontalmente sem evolução |

## 11. Arquitetura atual

```text
Visitante
   ↓ HTTPS
Next.js 15 App Router na hospedagem
   ├─ RootLayout (metadata + Header + Footer + ConsentProvider)
   ├─ páginas Server Component
   │    ├─ componentes compartilhados
   │    └─ fontes TypeScript em src/data + textos TSX
   ├─ componentes Client Component
   │    ├─ menu móvel
   │    ├─ consentimento/analytics/iframes
   │    └─ formulário
   └─ POST /api/contact (runtime Node.js)
        └─ serviço privado configurado por CONTACT_FORM_ENDPOINT

Após consentimento:
   ├─ Vercel Analytics
   ├─ Google Analytics
   ├─ Microsoft Clarity
   ├─ YouTube no-cookie
   └─ Giscus/GitHub Discussions, se configurado
```

O App Router usa rotas de arquivos. A maioria das páginas é Server Component por padrão. `Header`, `ConsentProvider`, `YouTubeEmbed`, `GiscusComments` e `ContactForm` são Client Components. O blog é a única rota dinâmica, com parâmetros estáticos. Programas são oito páginas manuais, não uma rota `[slug]`.

O build é `next build`; o servidor de produção local é `next start`. O deploy Vercel após push é indicado em documentação de patch, mas a automação efetiva e a branch de produção são **pendentes de validação no painel**.

## 12. Modelo de conteúdo

### 12.1 Programa (`Program`)

| Campo | Tipo | Obrigatório | Exemplo real | Uso |
| --- | --- | --- | --- | --- |
| `name` | string | sim | `Dama Token SIGO Fix` | cards e título público |
| `slug` | string | sim | `dama-token-sigo-fix` | identidade e coerência da rota |
| `category` | string | sim | `Correção de ambiente SIGO` | selo |
| `shortDescription` | string | sim | resumo público | cards |
| `fullDescription` | string | não | descrição extensa | cadastro; não substitui a página |
| `version` | string | sim | `1.0.0` | card |
| `status` | `ProgramStatus` | sim | `Disponível` | card e prioridade do sitemap |
| `updatedAt` | string ISO date | não | `2026-07-10` | `lastModified` no sitemap |
| `detailsUrl` | string | sim | `/programas/dama-token-sigo-fix` | link e sitemap |
| `downloadUrl` | string | não | URL HTTPS do Drive | botão de download |
| `manualUrl`, `changelogUrl`, `repositoryUrl` | string | não | changelog FCC | dados opcionais; nem todos são renderizados pelos cards |
| `iconUrl` | string | não | `/images/programs/...png` | `next/image` no card |
| `featured` | boolean | sim | `true` | `featuredPrograms` |

### 12.2 Download

Não existe tipo `Download`. O modelo real é `Program.downloadUrl?: string`, associado a `version`, `status` e `detailsUrl`. Plataforma, tamanho, formato e checksum não existem na fonte central.

### 12.3 Atualização (`UpdateItem`)

Campos obrigatórios: `title: string`, `area: string`, `type: UpdateType`, `date: string`, `summary: string`; `url?: string`. Não existem `id`, `program`, `version`, `description`, `category`, `featured` ou `image` no tipo atual.

### 12.4 Post (`PostItem` e `PostContent`)

`PostItem` contém `title`, `slug`, `category`, `summary`, `date`, `readingTime?` e `tags?`. `PostContent` repete esses campos e acrescenta `content: PostSection[]`. Cada seção contém `heading: string` e `paragraphs: string[]`. Autor, imagem, destaque, listas e blocos de código não fazem parte do modelo.

### 12.5 Referência (`ReferenceItem`)

Campos obrigatórios: `name`, `type`, `area`, `description`, `reason`, `links[]`; opcionais: `tags`, `imageUrl`, `authorizedImage`, `featured`. Cada link tem `label` e `url`. O tipo admite Pessoa, Instituição, Ferramenta, Artigo, Curso ou Site. Não existem campos separados para autor, instituição e ano.

### 12.6 Vídeo

O catálogo efetivo é um array local com `title`, `description`, `watchUrl` e `videoId` em `DamaFccTutorials.tsx`. `VideoCard` aceita um modelo flexível opcional (`title`, `description`, `youtubeId`/`videoId`, `youtubeUrl`/`url`, `status`, `programName`), mas não possui fonte de dados ativa.

### 12.7 Link social (`SocialLink`)

Campos: `name: string`, `url: string | null`, `icon?: string`, `status: SocialStatus`. O rodapé só mostra registros com status `Ativo` e URL não vazia.

## 13. Integrações

| Integração | Finalidade e implementação | Ambiente/variável | Consentimento e teste |
| --- | --- | --- | --- |
| Vercel | hospedagem indicada; Analytics via `@vercel/analytics/next` | sem variável local; projeto Vercel não confirmado | componente só monta com analytics aceito; confirmar eventos no dashboard após deploy |
| Google Analytics | page views por mudança de pathname | `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`; fallback público validado por `G-...` | carrega `gtag.js` após opt-in, ad storage negado; conferir Network/Realtime |
| Microsoft Clarity | métricas de interação | `NEXT_PUBLIC_MICROSOFT_CLARITY_ID`; fallback público alfanumérico | injeta tag após opt-in com ConsentV2; conferir Network/dashboard |
| YouTube | três tutoriais FCC | IDs no componente, sem variável | iframe `youtube-nocookie.com` só com `externalMedia`; testar ausência/presença do iframe |
| Giscus | comentários nos posts | quatro `NEXT_PUBLIC_GISCUS_*` | retorna `null` sem configuração e só injeta após mídia externa; configuração de produção não confirmada |
| Serviço de formulário | recebe mensagens encaminhadas pela API | `CONTACT_FORM_ENDPOINT`, somente servidor | não depende do banner; teste real exige endpoint de homologação/produção |
| Google Drive/ChatGPT/sites externos | download, GPTs e links | URLs públicas em dados/páginas | conexão iniciada pelo clique; revisar links manualmente |

Os identificadores de analytics são públicos por natureza; o endpoint de formulário deve permanecer privado e nunca usar prefixo `NEXT_PUBLIC_`.

## 14. Privacidade e segurança

As páginas de Privacidade, Cookies, Comentários e Termos estão no rodapé e sitemap. A preferência usa `localStorage` sob a chave `dama-universe:privacy-consent`, versão 1, com flags `analytics` e `externalMedia`, `updatedAt` e `expiresAt` por 180 dias. Não há cookie essencial criado pelo próprio código para essa escolha.

O formulário trata nome, e-mail, assunto, categoria e mensagem. A API remove caracteres de controle, normaliza o e-mail, valida limites, não registra o payload e encaminha `FormData` ao provedor. O honeypot retorna sucesso silencioso. O rate limit de 5 pedidos em 15 minutos e o bloqueio de duplicidade por 60 segundos são mantidos em memória por instância; portanto, não são globais nem duráveis em serverless.

Headers em todas as rotas:

- `Content-Security-Policy` com origens específicas para GA, Clarity, Vercel, YouTube e Giscus;
- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: SAMEORIGIN`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy` bloqueando câmera, microfone, geolocalização, pagamento e USB;
- `Strict-Transport-Security` por 2 anos, subdomínios e preload somente em produção.

A CSP ainda permite `'unsafe-inline'` em scripts/estilos e `'unsafe-eval'` apenas em desenvolvimento. HSTS com `includeSubDomains; preload` exige confirmar HTTPS em todos os subdomínios. Bases legais, retenção do provedor de formulário e redação das políticas exigem validação jurídica.

## 15. SEO e compartilhamento

`siteConfig` define domínio, locale `pt_BR`, título/descrição padrão e `/images/og/dama-universe-og.png` (1200 × 630). O layout define `metadataBase`, autoria, criador, publicador, `index/follow` e tema escuro. `createPageMetadata()` produz canonical absoluto, Open Graph e Twitter `summary_large_image`.

Todas as páginas principais auditadas têm metadata própria. Posts geram metadata `article`; não há imagem social individual, `publishedTime`, JSON-LD ou schema.org. O sitemap deriva 12 links do rodapé, 8 programas, 8 posts e 1 changelog. `/downloads` e `/api/contact` ficam fora. `robots.txt` libera `/` para todos e aponta o sitemap.

## 16. Responsividade e acessibilidade

Tailwind usa breakpoints padrão (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Contêineres limitam largura e usam padding móvel; grids passam de uma para duas/três/quatro colunas conforme o espaço. Tutoriais e novidades usam rolagem horizontal. Imagens de programas usam `next/image`; vídeos preservam `aspect-video`.

No desktop, a navegação aparece a partir de `lg`; abaixo disso, o botão móvel controla o painel. O foco vai ao primeiro link ao abrir e volta ao botão após Escape. Controles possuem tamanho mínimo de 44 px, foco visível, `aria-expanded`, `aria-controls`, labels e feedback do formulário com `aria-live`.

Limitações: não há skip link, focus trap completo no menu, auditoria automatizada axe, teste versionado com leitor de tela ou matriz de navegadores. Contraste e navegação foram construídos com tokens de alto contraste, mas validação com NVDA/VoiceOver permanece manual.

## 17. Testes e qualidade

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run lint` | ESLint Next/Core Web Vitals/TypeScript |
| `npm run typecheck` | `tsc --noEmit` em modo estrito |
| `npm test` | 9 arquivos Vitest |
| `npm run test:coverage` | testes + cobertura V8 |
| `npm run build` | build de produção Next |
| `npm run test:ci` | lint + tipos + cobertura + build |
| `npm audit` | auditoria do grafo npm |
| `npm start` | servidor local do build |

Os testes cobrem consentimento, SEO, validação de contato, API, formulário, menu móvel, VideoCard, integridade das fontes, sitemap e robots. Os limites são 80% para linhas/funções/statements e 75% para branches, apenas nos arquivos indicados em `vitest.config.ts`. Não há Playwright/Cypress ou suíte de navegador no repositório.

Na validação documental de 12/07/2026, `test:ci` aprovou lint, tipos, 9 arquivos/41 testes, cobertura (89,67% statements, 82,01% branches, 91,66% functions e 90,60% lines) e build de 36 páginas geradas. `npm audit` informou zero vulnerabilidades conhecidas.

## 18. Build e deploy

Pré-requisitos confirmados: Node.js e npm compatíveis com Next 15 e o lockfile; a versão exata não está fixada. Instalação reproduzível: `npm ci`. Ambiente local: copiar `.env.example` para `.env.local`, substituir valores de exemplo e executar `npm run dev`.

O build usa `npm run build`; a pré-validação completa usa `npm run test:ci`. O repositório possui remote GitHub. Há indicação de publicação automática na Vercel após push, mas branch de produção, projeto, organização, Node, regiões, variáveis e regras de preview são **não confirmados**. O procedimento deve ser validado no painel antes do primeiro deploy guiado por este documento.

Variáveis:

- `CONTACT_FORM_ENDPOINT` — privada e necessária ao envio real;
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` e `NEXT_PUBLIC_MICROSOFT_CLARITY_ID` — identificadores públicos com fallback no código;
- quatro `NEXT_PUBLIC_GISCUS_*` — opcionais;
- `ALLOWED_DEV_ORIGINS` — somente desenvolvimento.

Rollback de código deve usar `git revert` e novo push. Rollback instantâneo pelo painel da Vercel é **pendente de confirmação de acesso e processo operacional**.

## 19. Riscos e limitações

### Crítico

- endpoint real, provedor, retenção e entrega do formulário não estão confirmados no repositório;
- políticas e bases legais não substituem revisão jurídica;
- HSTS preload pode afetar subdomínios sem HTTPS se ativado no domínio real.

### Importante

- metadados de posts são duplicados entre dois arrays;
- páginas de programas duplicam informações do cadastro central;
- ordem de posts e atualizações é manual, apesar de datas existirem;
- rate limit em memória não cobre todas as instâncias serverless;
- CSP depende de `'unsafe-inline'`;
- não há CI ou E2E versionados;
- o Markdown v1.0.0 é obsoleto e cita rota inexistente;
- configuração Vercel e Node de produção não está versionada.

### Melhoria futura

- fonte única para programas e páginas dinâmicas;
- modelo central para downloads e vídeos;
- ordenação explícita por data;
- schema.org, RSS e imagens sociais por conteúdo;
- testes de acessibilidade/E2E e monitoramento de links;
- rate limiting distribuído.

## 20. Roadmap recomendado

### Curto prazo

- confirmar e documentar provedor de formulário, retenção, variáveis e fluxo Vercel;
- revisar políticas com profissional jurídico;
- remover ou corrigir o changelog Markdown legado;
- fixar uma versão Node suportada e documentar a branch de produção;
- testar links/downloads e dashboards após o próximo deploy.

### Médio prazo

- unificar metadados e conteúdo de posts;
- criar fonte única para detalhes, downloads e vídeos dos programas;
- ordenar novidades/posts por data no código;
- adicionar E2E para consentimento, navegação, formulário e rotas críticas;
- revisar CSP para reduzir diretivas inseguras.

### Longo prazo

- avaliar CMS ou geração baseada em conteúdo para crescimento do catálogo;
- implementar rate limiting compartilhado e observabilidade operacional;
- adicionar busca, RSS e dados estruturados apenas após definição de produto;
- ativar apoio, redes sociais e comentários somente quando os canais existirem.

## 21. Critérios gerais de aceitação para publicação

- `npm ci` conclui sem alterar inesperadamente o lockfile;
- lint, TypeScript, 100% dos testes existentes, cobertura e build passam;
- cada `detailsUrl`, post, link interno, imagem e download publicado responde corretamente;
- versões e datas coincidem entre cadastro, página, atualização e artefato de download;
- sitemap contém todas e somente as rotas indexáveis e robots aponta para ele;
- canonical, título, descrição, OG e Twitter usam o domínio de produção;
- Home e todas as rotas críticas funcionam em 320, 360, 390, 430, 768, 1024 e 1440 px;
- menu funciona por mouse, toque e teclado;
- nenhum analytics, iframe YouTube ou Giscus carrega antes do consentimento correspondente;
- aceitar, recusar, personalizar, reabrir e revogar funcionam após reload;
- formulário trata sucesso, validação, indisponibilidade, limite e erro sem expor dados;
- headers de produção chegam pelo domínio real;
- variáveis de produção estão configuradas sem segredo em código;
- preview é aprovado e validações pós-deploy são registradas;
- revisão jurídica das políticas e confirmação de HTTPS dos subdomínios são concluídas.

## 22. Itens não confirmados

- ID, equipe, região, branch de produção, versão Node e variáveis atuais do projeto Vercel;
- provedor e URL efetiva de `CONTACT_FORM_ENDPOINT`, retenção e destinatário;
- configuração ativa de Giscus/GitHub Discussions;
- propriedade e acesso aos dashboards GA, Clarity e Vercel Analytics;
- política prática de backups, responsáveis por aprovação e frequência de publicação;
- compatibilidade em dispositivos físicos e leitores de tela;
- revisão jurídica vigente.

Este PRD representa o código e o worktree auditados na data registrada; não presume que alterações locais ainda não commitadas já estejam em produção.
