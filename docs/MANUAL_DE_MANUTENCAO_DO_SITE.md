# Manual de manutenção e atualização — Dama Universe

> Manual da implementação auditada em 12/07/2026. Ele descreve o que o código faz hoje. Itens dependentes de Vercel, provedores ou credenciais são marcados como **não confirmados** ou **pendentes de validação**.

## 1. Visão geral da manutenção

```text
dama-universe-site/
├─ public/images/              arquivos servidos a partir de /images/...
├─ src/app/                    páginas, layout, API, sitemap e robots
│  ├─ api/contact/route.ts     envio do contato pelo servidor
│  ├─ blog/[slug]/page.tsx     única página dinâmica de conteúdo
│  └─ programas/*/page.tsx     oito páginas manuais de programas
├─ src/components/             layout, cards, formulários, privacidade e UI
├─ src/data/                   listas oficiais em TypeScript
├─ src/lib/                    regras de SEO, contato, consentimento e analytics
├─ src/content/                conteúdo legado; não é a fonte do blog atual
├─ docs/                       documentação operacional
├─ next.config.js              CSP e headers
├─ tailwind.config.ts          tema e breakpoints
├─ vitest.config.ts            testes e cobertura
├─ package.json                comandos e dependências
└─ .env.example                nomes das variáveis, sem segredos
```

Não altere `package-lock.json`, `next-env.d.ts`, `tsconfig.tsbuildinfo`, `.next`, `coverage` ou `node_modules` manualmente. O lockfile muda por comandos npm. `.next`, cobertura e `tsconfig.tsbuildinfo` são gerados. Preserve `src/data/index.ts` ao adicionar nova fonte exportada.

## 2. Preparação do ambiente (Windows PowerShell)

1. Abra o projeto no editor.
2. Abra PowerShell e confirme a pasta:

```powershell
Set-Location 'C:\Users\marco\Desktop\Codex\dama-universe-site'
Get-Location
```

3. Confira branch e alterações antes de instalar:

```powershell
git branch --show-current
git status --short --branch
```

4. Instale exatamente o lockfile:

```powershell
npm ci
```

5. Crie o arquivo local de ambiente, se ainda não existir:

```powershell
Copy-Item -LiteralPath '.env.example' -Destination '.env.local'
```

Edite `.env.local` e nunca o versione. O formulário real exige `CONTACT_FORM_ENDPOINT`. Giscus é opcional. Os IDs públicos de GA e Clarity têm fallback no código, mas devem ser conferidos pelo proprietário.

6. Inicie e acesse a URL exibida pelo Next (normalmente `http://localhost:3000`):

```powershell
npm run dev
```

7. Pare com `Ctrl+C`. A versão Node não está fixada no projeto; a auditoria usou Node 24.14.1 e npm 11.11.0. A versão de produção deve ser confirmada na Vercel.

## 3. Procedimento padrão antes de qualquer alteração

1. Execute `git status --short --branch` e não apague trabalho existente.
2. Crie uma branch ou backup. Exemplo: `git switch -c codex/descricao-curta`.
3. Use `rg` para localizar fonte, consumidores e testes: `rg -n 'texto ou slug' src`.
4. Rode o site e registre como a área funciona antes da mudança.
5. Altere um conjunto coerente por vez.
6. Visualize localmente e teste links, teclado e tamanhos relevantes.
7. Execute `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`.
8. Para a validação completa, prefira `npm run test:ci` e depois `npm audit`.
9. Revise `git diff --check`, `git diff --stat` e `git diff`.
10. Faça commit intencional: `git add <arquivos>` e `git commit -m 'Descrição objetiva'`.

## 4. Como adicionar um novo programa completo

### Objetivo e impacto

Um programa só está completo quando o cadastro, página individual, metadata, download (se disponível), novidade, sitemap e recursos próprios concordam. Não existe gerador automático de página: criar um item em `programs.ts` adiciona o card e sitemap, mas não cria `page.tsx`.

### Ordem obrigatória

1. **Cadastre em `src/data/programs.ts`.** Use um slug minúsculo, sem acentos, separado por hífens e único. `detailsUrl` deve ser exatamente `/programas/{slug}`. Datas usam `AAAA-MM-DD`. Só use `Disponível` quando houver página e, se anunciado, download válido.

Exemplo demonstrativo, não oficial:

```ts
{
  name: "Programa Demonstrativo",
  slug: "programa-demonstrativo",
  category: "Demonstração técnica",
  shortDescription: "Exemplo demonstrativo para validar o fluxo de cadastro.",
  fullDescription: "Descrição pública completa do exemplo demonstrativo.",
  version: "0.1.0",
  status: "Em desenvolvimento",
  updatedAt: "2026-07-12",
  detailsUrl: "/programas/programa-demonstrativo",
  iconUrl: "/images/programs/programa-demonstrativo.png",
  featured: false,
}
```

Campos e valores válidos estão no tipo `Program`. Não invente plataforma, requisitos ou instruções dentro desse objeto: hoje eles ficam na página individual.

2. **Adicione a imagem**, se houver, em `public/images/programs/programa-demonstrativo.png`. Use nome igual ao slug, fundo adequado e texto alternativo na página. O card usa `iconUrl` com `next/image`.
3. **Crie `src/app/programas/programa-demonstrativo/page.tsx`.** Reutilize `PageHeader`, `MetallicCard`, `SectionTitle` e `GlowButton`. Escreva descrição completa, funcionalidades, requisitos, instruções, status e avisos. Exemplo mínimo compatível:

```tsx
import { MetallicCard, PageHeader } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Programa Demonstrativo — Dama Universe",
  description: "Página demonstrativa usada apenas como exemplo do manual.",
  path: "/programas/programa-demonstrativo",
});

export default function ProgramaDemonstrativoPage() {
  return (
    <main>
      <PageHeader
        title="Programa Demonstrativo"
        subtitle="Exemplo demonstrativo"
        description="Descrição pública consistente com o cadastro central."
      />
      <section className="container-site pb-20">
        <MetallicCard><p className="body-text">Conteúdo da página.</p></MetallicCard>
      </section>
    </main>
  );
}
```

4. **Configure download somente quando publicado.** Adicione `downloadUrl` HTTPS no objeto. Para reutilizá-lo na página:

```ts
import { getProgramDownloadUrl } from "@/data";
const downloadUrl = getProgramDownloadUrl("programa-demonstrativo");
```

E use `<GlowButton href={downloadUrl} external>Download</GlowButton>`. Sem arquivo real, omita `downloadUrl`; a função lança erro se chamada sem URL.
5. **Adicione recursos próprios à página.** Requisitos, funcionalidades, documentação, instruções e imagens não têm modelo central. Declare arrays locais, como nas páginas existentes. `manualUrl`, `changelogUrl` e `repositoryUrl` existem no tipo, mas o card não os renderiza; crie botões explícitos na página quando necessário.
6. **Vídeo:** hoje não existe catálogo central. Para tutorial FCC, edite o array local de `DamaFccTutorials.tsx`. Para outro programa, crie um componente específico que use `YouTubeEmbed`; não use iframe direto. Consulte a seção 10.
7. **Destaque:** `featured: true` inclui o item em `featuredPrograms`, mas `FeaturedPrograms` não está montado na Home. Para aparecer na Home atual, é necessária decisão editorial e alteração explícita de `src/app/page.tsx` ou de uma seção existente. Não presuma destaque automático.
8. **Últimas atualizações:** insira uma entrada no início de `src/data/updates.ts`. Esse passo publica a novidade na Home; não existe página dedicada.

```ts
{
  title: "Programa Demonstrativo 0.1.0 registrado",
  area: "Programas",
  type: "Programa",
  date: "2026-07-12",
  summary: "Entrada demonstrativa para exemplificar o fluxo de publicação.",
  url: "/programas/programa-demonstrativo",
}
```

9. **Sitemap:** não acrescente a rota manualmente; `sitemap.ts` deriva `programs`. Confirme `updatedAt`, execute os testes e abra `/sitemap.xml`. Se a página não for indexável, ela não deve entrar em `programs` sem uma decisão arquitetural.
10. **Open Graph:** metadata da página usa a imagem global. Para imagem individual seria necessário ampliar `createPageMetadata`; isso não existe hoje. Não invente um campo.
11. **Menu/busca:** programas não entram no menu por padrão e não há busca.
12. **Teste:** catálogo, página, links, download, Home/novidade, sitemap, canonical e layout em 320–1440 px. Execute `npm run test:ci`.

Erros comuns: slug diferente da pasta; data fora de ISO; status “Disponível” sem download; URL repetida em página; item novo colocado no fim de `updates`; imagem inexistente. Para desfazer antes do commit, restaure somente os arquivos do programa com `git restore -- <caminhos>`.

## 5. Como atualizar um programa existente

- nome, resumo, versão, status, data, ícone e download: `src/data/programs.ts`;
- descrição extensa, recursos, requisitos, instruções, imagens e botões: `src/app/programas/{slug}/page.tsx`;
- metadata: bloco `createPageMetadata` da página;
- tutoriais FCC: `DamaFccTutorials.tsx`;
- mudança pública relevante: nova entrada no início de `updates.ts`;
- changelog FCC: página correspondente e `sitemap.ts`, se criar nova rota.

Alterar versão ou download exige testar o artefato e conferir que card, página e novidade mostram a mesma versão. Trocar apenas texto não exige mudar o sitemap estrutural, mas atualize `updatedAt`. Trocar slug exige renomear pasta, `slug`, `detailsUrl`, links, atualização, sitemap derivado e definir estratégia de redirecionamento; é uma mudança de alto risco. O Open Graph global só muda se `seo.ts` ou a imagem global mudar.

## 6. Como publicar uma nova atualização

Edite `src/data/updates.ts`. O tipo real possui somente `title`, `area`, `type`, `date`, `summary` e `url?`. `type` deve ser Programa, Download, GPT, Blog, Referência, Vídeo, Site ou Planejamento.

A ordenação é **manual pela posição no array**; nenhuma função ordena por data. A Home usa `updates.slice(0, 8)`. Insira a mais recente no início e mantenha datas em ordem decrescente. Compare as primeiras oito datas antes de publicar. Não há página de atualizações, vínculo automático com programa, sitemap específico nem renderização da atualização na página do programa. Se quiser registrá-la ali, altere também a página ou changelog correspondente.

## 7. Como adicionar ou alterar download

1. Publique e valide o arquivo no provedor externo.
2. Atualize `downloadUrl` e `version` em `src/data/programs.ts`.
3. Se a página usa `getProgramDownloadUrl`, ela acompanhará automaticamente; procure URLs antigas com `rg -n 'drive.google|drive.usercontent' src`.
4. Atualize `updatedAt` e crie entrada `type: "Download"` ou `"Programa"` em `updates.ts` quando for uma liberação pública.
5. Teste card, página, nova aba/redirecionamento, nome e integridade do arquivo.

Não existem plataforma, tamanho, formato ou checksum no modelo. Registre-os na página apenas se forem confirmados; uma evolução estruturada exige criar e testar um novo tipo. Para link indisponível, remova `downloadUrl`, não use `#`, e ajuste status/textos. `/downloads` continuará redirecionando para o FCC até decisão explícita.

## 8. Como publicar post no blog

O blog usa TypeScript, não Markdown. Faça duas entradas com o mesmo slug:

1. `src/data/posts.ts` para listagem, Home e sitemap;
2. `src/data/postContents.ts` para página e metadata.

Exemplo demonstrativo:

```ts
// posts.ts
{
  title: "Post demonstrativo",
  slug: "post-demonstrativo",
  category: "Documentação",
  summary: "Resumo demonstrativo para o manual.",
  date: "2026-07-12",
  readingTime: "4 min",
  tags: ["exemplo", "documentação"],
}

// postContents.ts
{
  title: "Post demonstrativo",
  slug: "post-demonstrativo",
  category: "Documentação",
  summary: "Resumo demonstrativo para o manual.",
  date: "2026-07-12",
  readingTime: "4 min",
  tags: ["exemplo", "documentação"],
  content: [
    { heading: "Introdução", paragraphs: ["Primeiro parágrafo."] },
  ],
}
```

Insira no início de ambos se deve aparecer entre os três da Home. A ordem é manual, não por data. O sitemap inclui automaticamente todos de `posts`. Slug duplicado falha no teste de integridade.

O renderer atual aceita cabeçalhos de seção e parágrafos. Listas, código, imagens, links inline, autor, destaque e imagem própria **não são suportados pelo modelo/renderização atual**. Para esses recursos, primeiro amplie tipos, página e testes; não coloque HTML em strings esperando renderização. Links internos podem ser adicionados como JSX fora do modelo ou após evolução planejada. Giscus aparece somente se configurado e consentido.

## 9. Como adicionar uma referência

Edite `src/data/references.ts`. Exemplo:

```ts
{
  name: "Referência demonstrativa",
  type: "Site",
  area: "Documentação técnica",
  description: "Descrição objetiva da fonte demonstrativa.",
  reason: "Motivo verificável para a inclusão.",
  links: [{ label: "Site oficial", url: "https://example.com/" }],
  tags: ["Documentação"],
  authorizedImage: false,
  featured: false,
}
```

O tipo não contém autor, instituição ou ano separados; incorpore informação confirmada em `name`/descrição ou evolua o modelo. A página agrupa pela ordem fixa Pessoa, Artigo, Ferramenta, Instituição, Curso e Site; dentro do grupo vale a posição no array. Links HTTPS abrem em nova aba por `GlowButton` com `noopener noreferrer`. Imagem só aparece quando `imageUrl` existe e `authorizedImage` é `true`. Valide URL, permissão de imagem, card e mobile.

### 9.1 Como adicionar ou alterar um GPT

Edite `src/data/gpts.ts`. Preencha `name`, `slug`, `author`, `category`, `status`, `shortDescription`, `purpose`, `indicatedFor[]`, `precautions[]`, `url` e, opcionalmente, `featured`. Os status permitidos são Público, Em teste, Restrito e Em planejamento. A página `/gpts` mostra todos na ordem do array; a Home mostra os dois primeiros com `featured: true`. Use apenas URL oficial confirmada do ChatGPT, teste em sessão sem autenticação e mantenha os avisos de não envio de dados sensíveis. Não há página individual, sitemap ou metadata por GPT. Uma publicação relevante também deve receber entrada em `updates.ts`. Para desfazer, restaure a entrada e a atualização no mesmo conjunto.

## 10. Como adicionar ou alterar vídeos e tutoriais

Os três vídeos reais estão no array `tutorials` de `src/components/videos/DamaFccTutorials.tsx`. Cadastre `title`, `description`, `watchUrl` e `videoId` e mantenha a ordem desejada. Não há miniatura local, categoria ou campo de programa.

Use sempre `<YouTubeEmbed videoId="..." title="..." />`. Ele cria o iframe somente após `externalMedia=true`, usa `https://www.youtube-nocookie.com/embed/`, lazy loading e proporção controlada pelo contêiner. `VideoCard` é genérico e considera publicado apenas status `Publicado`, URL HTTP(S) e ID válidos, mas hoje só é usado em testes.

Teste em armazenamento limpo: antes do consentimento, nenhum iframe ou pedido a YouTube deve existir; aceite apenas analytics e confirme que continua bloqueado; permita conteúdo externo e confirme o iframe; revogue e recarregue. Teste rolagem horizontal em celular e o link direto, que só conecta após clique.

## 11. Como alterar a página inicial

`src/app/page.tsx` monta, nesta ordem:

| Seção | Componente | Fonte |
| --- | --- | --- |
| Destaque principal | `HeroSection.tsx` | texto local |
| Novidades | `SiteUpdatesPreview.tsx` | primeiros 8 de `updates.ts` |
| FCC em foco + vídeos | `DamaFccHighlight.tsx` | texto local, URL de `programs.ts`, tutoriais locais |
| GPTs | `GptsPreview.tsx` | dois primeiros `featured` de `gpts.ts` |
| Blog | `RecentPosts.tsx` | primeiros 3 de `posts.ts` |
| Apoio | `SupportPreview.tsx` | texto local |
| CTA final | `FinalCallToAction.tsx` | texto local |

`FeaturedPrograms.tsx` e `ReferencesPreview.tsx` existem, mas não estão na Home. Para inseri-los, importe e adicione explicitamente no JSX; isso altera escopo visual e exige teste completo. Não há bloco de downloads separado. Ao mudar texto ou botão, procure duplicatas em páginas relacionadas e revise metadata global se a proposta principal mudar.

## 12. Como alterar páginas institucionais e legais

| Página | Arquivo | Observação |
| --- | --- | --- |
| Sobre | `src/app/sobre/page.tsx` | textos, áreas, site profissional e Lattes locais |
| Apoie | `src/app/apoie/page.tsx` + `src/data/support.ts` | canais atuais são futuros/avaliação |
| Contato | `src/app/contato/page.tsx` + formulário/lib/API | tipos visuais na página repetem `CONTACT_TYPES` |
| Termos | `src/app/termos-de-uso/page.tsx` | texto TSX; revisão jurídica |
| Privacidade | `src/app/politica-de-privacidade/page.tsx` | deve refletir integrações e formulário |
| Cookies | `src/app/politica-de-cookies/page.tsx` | deve refletir categorias e prazo |
| Comentários | `src/app/politica-de-comentarios/page.tsx` | deve refletir Giscus/moderação |

Cada página contém seu `createPageMetadata`. Atualize texto, descrição e data de revisão quando aplicável. Mudança de serviço externo exige revisar Privacidade, Cookies, Termos, banner e CSP. Toda alteração legal exige revisão jurídica; o código não confirma aprovação profissional.

## 13. Como criar uma nova página

1. Escolha rota sem conflito e crie `src/app/nova-rota/page.tsx`.
2. Exporte metadata com `createPageMetadata` e use componentes existentes.
3. Adicione ao menu somente se for destino principal, em `navigation.ts`.
4. Se indexável mas não estiver no menu/rodapé, inclua explicitamente em `sitemap.ts` e adicione teste.
5. Crie links internos e teste 404, canonical e responsividade.

Use o exemplo mínimo da seção 4. Não crie `layout.tsx` local sem necessidade. Para rota dinâmica, implemente parâmetros, `generateStaticParams`, `generateMetadata`, 404 e testes como o blog. Não existe busca para atualizar.

## 14. Como alterar menu e rodapé

Edite `src/data/navigation.ts`. `primaryNavigation` alimenta desktop e móvel. `footerNavigation` deriva o principal, renomeia GPTs no rodapé e acrescenta `legalNavigation`. Ordem do array é ordem visual e do sitemap estático.

Links sociais ficam em `socialLinks.ts` e só aparecem com `status: "Ativo"` e URL real. Nunca use `#`; mantenha `null` para canal indisponível. Links externos recebem nova aba e `noopener noreferrer`. Teste rota ativa, botão/CTA, abertura, Escape, clique fora, retorno do foco e largura móvel.

## 15. Como adicionar ou trocar imagens

Coloque recursos públicos em `public/images/<área>` e referencie a partir de `/images/...`. Prefira `next/image` para imagens locais dimensionadas; `ReferenceCard` ainda usa `<img>` intencionalmente para URL opcional. Sempre forneça `alt` descritivo, salvo decoração pura.

| Uso real | Local | Dimensão/orientação |
| --- | --- | --- |
| Open Graph global | `public/images/og/dama-universe-og.png` | **1200 × 630**, exigido por metadata |
| Ícone de programa no card | `public/images/programs/*.png` | quadrado; renderizado em 56 × 56 |
| Imagem ampla de programa | mesma pasta | preserve proporção e teste o `object-contain` real |
| Ícone Windows para distribuição | `*.ico` | artefato de programa; não usado pelo site atual |
| Blog, logo e referências | pastas existentes | vazias no estado atual; não há tamanho oficial confirmado |

Otimize PNGs grandes antes de publicar sem degradar legibilidade. Use nomes em kebab-case. Ao trocar OG, mantenha 1200 × 630, revise o `ogImage` se o nome mudar, faça build e teste compartilhamento. Favicon próprio não foi encontrado; adicionar exige seguir o mecanismo de metadata do Next e validar. Cache de redes pode exigir depuração/revalidação externa.

## 16. Como alterar metadados e SEO

- globais: `src/lib/seo.ts` e `src/app/layout.tsx`;
- por página: `createPageMetadata` no `page.tsx`;
- dinâmicos: `generateMetadata` do blog;
- imagem social: `public/images/og/dama-universe-og.png`.

`path` deve coincidir com a rota e gera canonical absoluto usando `siteConfig.url`. Use `type: "article"` para conteúdo editorial. A imagem global atende OG e Twitter. Mudança de domínio exige `siteConfig.url`, sitemap, robots e validação dos serviços externos. Não marque página duplicada/indexável sem canonical adequado.

## 17. Como atualizar sitemap e robots

`src/app/sitemap.ts` gera automaticamente links do rodapé, programas e posts, mais o changelog v3.0.0 manual. Datas estáticas ficam em `routeDates`; programas usam `updatedAt`; posts usam `date`. `/downloads` é excluído por ser redirecionamento.

Ao criar página no menu, a inclusão vem de `footerNavigation`, mas acrescente sua data em `routeDates`. Página indexável fora do menu ou novo changelog exige `createEntry` explícito. Não use data futura. `robots.ts` libera tudo e aponta `${siteConfig.url}/sitemap.xml`. Teste com `npm test`, build e, no servidor, `/sitemap.xml` e `/robots.txt`.

## 18. Como alterar integrações de análise

- IDs e validação: `src/lib/analytics.ts`;
- carregamento e consentimento: `ConsentProvider.tsx`;
- variáveis: `.env.example` e ambientes Vercel;
- CSP: `next.config.js`;
- transparência: políticas de Privacidade/Cookies e texto do banner.

Vercel Analytics, GA e Clarity devem permanecer ativos conforme decisão do proprietário, mas apenas depois de `analytics=true`. Não duplique scripts no layout ou páginas. Não coloque segredo em variável `NEXT_PUBLIC_*`. Ao adicionar domínio/serviço, libere somente as diretivas CSP necessárias, revise políticas e teste Network antes/depois do consentimento, mudança de rota e revogação. Dashboards reais exigem validação pós-deploy.

## 19. Como alterar o banner de cookies

`ConsentProvider.tsx` contém painel, botões, categorias e integrações; `consent.ts` contém chave, versão, prazo e validação. “Aceitar opcionais” habilita ambas as categorias; “Recusar” desabilita; “Personalizar” abre checkboxes; o botão “Privacidade” reabre a escolha.

Ao mudar categoria ou formato salvo, aumente `CONSENT_VERSION`, atualize tipo, criação, parser, políticas e testes. Não reduza transparência nem marque opcionais por padrão. Teste armazenamento ausente, inválido, expirado, aceitar, recusar, combinação parcial, reload e revogação. Alterações textuais/categorias exigem validação jurídica.

## 20. Como alterar o formulário de contato

Fluxo: `ContactForm.tsx` → `validateContactPayload()` em `contact.ts` → JSON `POST /api/contact` → nova validação → honeypot/limites → `CONTACT_FORM_ENDPOINT`.

Campos reais: `name` 2–100, `email` até 254 e formato simples, `subject` 5–150, `contactType` no enum, `message` 10–4000 e `website` honeypot. A API permite 5 pedidos/15 min por identificador de cliente e bloqueia payload repetido por 60 s. Timeout upstream: 8 s. Logs registram condição/status, não conteúdo.

Para adicionar campo, atualize tipo, normalização, validação, formulário, API/FormData, provedor, política e testes. Configure endpoint somente no servidor. Teste 200, 400, 429, 502, 503 e 504. O rate limit é em memória e não é proteção distribuída.

## 21. Como alterar headers de segurança

Edite `next.config.js`. A CSP controla `script-src`, `style-src`, `img-src`, `connect-src`, `frame-src`, `form-action`, `frame-ancestors`, `base-uri` e `object-src`. Outros headers evitam sniffing, framing externo, vazamento excessivo de referência e APIs sensíveis; HSTS força HTTPS em produção.

Ao integrar domínio novo, identifique exatamente se ele executa script, recebe conexão, serve imagem ou frame e acrescente apenas nessa diretiva. Evite `*`. Teste primeiro localmente, depois com `npm run build`/`npm start` e `Invoke-WebRequest`, e confira o console do navegador. Antes de manter HSTS preload, confirme HTTPS em todos os subdomínios.

## 22. Como alterar estilos e responsividade

O projeto usa Tailwind 3 e CSS global. Tokens de cor, sombra, fundo, raio e largura estão em `tailwind.config.ts`; utilitários compartilhados em `src/app/globals.css`. Breakpoints padrão: `sm` 640, `md` 768, `lg` 1024 e `xl` 1280. O menu troca no `lg`.

Evite valores isolados se já existe token. Preserve foco visível, alvos de 44 px, wrapping de textos longos, `aspect-video` e grids progressivos. Teste obrigatoriamente 320, 360, 390, 430, 768, 1024 e 1440 px, verificando overflow horizontal, corte de títulos, cards, menu, formulário, imagens, vídeos e banner.

## 23. Como adicionar dependência

1. Confirme que código nativo/Next não resolve.
2. Consulte compatibilidade e licença.
3. Runtime: `npm install pacote`; ferramenta de desenvolvimento: `npm install --save-dev pacote`.
4. Revise `package.json` e `package-lock.json`.
5. Execute `npm ls pacote`, `npm audit` e `npm run test:ci`.
6. Importe apenas API pública e documente variável/CSP se houver integração.

Não adicione dependência transitiva diretamente por acaso. Não use `--force` para mascarar conflito. Tipos, lint e testes pertencem a `devDependencies`; bibliotecas carregadas pelo site/API pertencem a `dependencies`.

## 24. Como remover dependência

Use `rg -n 'nome-do-pacote' src *.js *.ts *.mjs package.json` e verifique imports dinâmicos/configuração. Execute `npm uninstall pacote`, revise manifesto/lockfile, reinstale com `npm ci`, rode `npm audit` e `npm run test:ci`. Compare build/bundle quando relevante. Se falhar, restaure `package.json` e `package-lock.json` juntos ou reverta o commit; não edite o lockfile manualmente.

## 25. Como executar e interpretar os testes

```powershell
npm run lint
npm run typecheck
npm test
npm run test:coverage
npm run build
npm run test:ci
npm audit
npm run dev
npm start
```

Lint deve terminar sem erros; typecheck sem diagnósticos; testes sem falhas; cobertura acima de 80% linhas/funções/statements e 75% branches nos arquivos configurados; build deve gerar rotas. `npm start` só funciona após build. Se falhar, corrija a primeira causa real, execute o teste específico (`npm test -- caminho/do/teste`) e depois a suíte completa. Teste de interface automatizado E2E não existe; faça QA manual no navegador.

## 26. Checklist antes de publicar

- [ ] textos, ortografia, datas e versões conferidos;
- [ ] programas, novidades e posts em ordem manual correta;
- [ ] downloads reais, íntegros e coerentes com a versão;
- [ ] links internos/externos sem `#`, imagens e `alt` válidos;
- [ ] canonical, título, descrição, OG e Twitter corretos;
- [ ] sitemap/robots corretos e sem duplicatas;
- [ ] formulário validado com endpoint de homologação/produção;
- [ ] aceitar, recusar, personalizar e revogar consentimento testados;
- [ ] analytics ausentes antes e presentes depois do opt-in;
- [ ] YouTube/Giscus bloqueados antes de mídia externa;
- [ ] 320, 360, 390, 430, 768, 1024 e 1440 px sem overflow;
- [ ] teclado, foco, labels e mensagens verificados;
- [ ] `npm run test:ci` e `npm audit` aprovados;
- [ ] `git diff --check`, diff e status revisados;
- [ ] variáveis/headers do preview confirmados; nenhum segredo commitado.

## 27. Como publicar na Vercel

O remote GitHub é confirmado e README de patches indica publicação automática. Projeto, branch de produção e permissões no painel são **não confirmados**.

1. Rode checklist e faça commit.
2. Envie a branch: `git push -u origin nome-da-branch`.
3. Confirme no painel Vercel se a branch gerou Preview; não presuma.
4. Configure nos ambientes necessários `CONTACT_FORM_ENDPOINT`, IDs de analytics e, se usado, Giscus. Nunca cole segredos no Git.
5. Aprove por PR/merge conforme o fluxo do repositório. A branch que dispara produção deve ser confirmada no painel.
6. Acompanhe logs de build/runtime.
7. Após deploy, valide Home, todas as rotas, formulário, downloads, consentimento, analytics, headers, OG, sitemap e robots no domínio real.

Deploy manual por CLI não está configurado/documentado no projeto e não deve ser tratado como fluxo oficial. Domínio, aliases, equipe e rollback do painel precisam ser validados pelo proprietário.

## 28. Como desfazer alteração

- inspecionar: `git diff` ou `git diff -- caminho`;
- arquivo não commitado: `git restore -- caminho` (somente após confirmar que não há trabalho a preservar);
- tirar arquivo do stage: `git restore --staged caminho`;
- reverter commit publicado: `git revert <hash>` e push;
- voltar de branch: `git switch nome-da-branch` após salvar/commitar mudanças;
- recuperar conteúdo: use `git log -- caminho` e `git show <hash>:<caminho>`;
- deploy: reverta o commit e publique; rollback no painel Vercel é pendente de confirmação.

Não use `git reset --hard`, limpeza recursiva ou reescrita de histórico sem backup e autorização explícita.

## 29. Solução de problemas comuns

| Problema | Causa provável | Verificar | Diagnóstico/correção |
| --- | --- | --- | --- |
| Página não aparece/404 | pasta ou `page.tsx` incorreto | `src/app/<rota>` | confira nome, export default e build |
| Programa não aparece | item ausente/erro de tipo | `programs.ts` | confira array, slug e teste de integridade |
| Novidade não aparece | item após os 8 primeiros | `updates.ts`, preview | mova para posição cronológica correta |
| Ordem incorreta | arrays não são ordenados | `updates.ts`, `posts.ts` | reordene manualmente |
| Imagem quebrada | caminho/case incorreto | `public/images`, dado/página | abra URL pública e corrija nome |
| Download quebrado | URL ou permissão do Drive | `programs.ts` | teste em sessão sem login e substitua/remova URL |
| Import falha | export/path alias incorreto | `src/data/index.ts`, `index.ts` | corrija export e rode typecheck |
| Lint/TypeScript/teste falha | regressão real | saída e arquivo citado | corrija causa; não desative regra/teste |
| Build falha | erro de compilação/env | saída do Next | corrija primeiro erro e repita suíte |
| Variável ausente | `.env.local`/Vercel | `.env.example`, painel | configure no ambiente correto e redeploy |
| Analytics não carrega | sem opt-in, ID inválido ou CSP | provider, analytics lib, CSP | aceite categoria, veja Network/console e valide ID |
| Banner não aparece | preferência válida salva | `localStorage`, consent lib | reabra “Privacidade” ou remova a chave para teste |
| Sitemap sem rota | não está em fontes/entrada manual | `sitemap.ts` | inclua pela fonte correta e atualize teste |
| OG não atualiza | cache ou metadata/caminho | `seo.ts`, PNG | confira HTML/URL e invalide cache do serviço |
| Menu móvel não abre | erro Client Component/JS | `Header.tsx` | console, teste Header e clique/teclado |
| Layout quebra | largura fixa/texto longo | componente/Tailwind | teste 320 px e corrija wrap/grid/padding |
| Formulário não envia | endpoint ausente/recusa/limite | API, env, logs | valide status 400/429/502/503/504 e provedor |
| CSP bloqueia serviço | origem na diretiva errada | `next.config.js` | identifique recurso e libere só diretiva/origem necessária |

## 30. Checklists rápidos

- **Novo programa:** cadastro → imagem → página → download → novidade → metadata → sitemap/testes → mobile.
- **Nova versão:** versão/status/data → artefato/link → página/changelog → novidade → testes.
- **Nova atualização:** inserir no início → tipo/data/link → conferir primeiros 8.
- **Novo download:** publicar → URL central → versão → página → novidade → teste anônimo.
- **Novo post:** `posts.ts` + `postContents.ts` → mesma metadata/slug → ordem → sitemap/testes.
- **Nova referência:** dado → URL → autorização de imagem → agrupamento/card/mobile.
- **Novo vídeo:** array/componente → `YouTubeEmbed` → consentimento → rolagem/link.
- **Nova página:** pasta/page → metadata → menu/sitemap → links → testes/build.
- **Política:** texto/data/metadata → integrações/banner relacionados → jurídico.
- **Integração:** variável → componente → consentimento → CSP → políticas → testes.
- **Publicação:** diff → `test:ci` → audit → commit/push → preview → produção → pós-deploy.

## 31. Matriz “o que alterar”

| Quero fazer | Principal | Outros envolvidos | Sitemap? | Metadata? | Atualização? |
| --- | --- | --- | --- | --- | --- |
| novo programa | `programs.ts` | nova página, imagem, download | automático | sim, página | sim |
| atualizar programa | `programs.ts` + página | download/changelog/imagem | data | se texto público | se relevante |
| novo download | `programs.ts` | página e provedor | não estrutural | não | sim |
| nova novidade | `updates.ts` | conteúdo de destino | não | não | é a própria entrada |
| novo post | `posts.ts` + `postContents.ts` | comentários | automático | dinâmico | opcional |
| referência | `references.ts` | imagem opcional | não | não | opcional |
| vídeo | `DamaFccTutorials.tsx` | consentimento/CSP se novo provedor | não | não | recomendado |
| GPT | `gpts.ts` | Home | não se sem página própria | não | recomendado |
| menu/rodapé | `navigation.ts` | Header/Footer | automático para link | página precisa | não |
| página institucional | `page.tsx` | nav/sitemap | conforme indexação | sim | opcional |
| política | página legal | banner/integrações | já indexada | revisar | opcional |
| analytics | provider/lib | env, CSP, políticas | não | não | opcional |
| OG global | PNG + `seo.ts` | cache social | não | sim | não |
| contato | form/lib/API | env, política, testes | não | página se necessário | não |

## 32. Arquivos críticos

| Risco | Arquivo | Finalidade | Teste mínimo |
| --- | --- | --- | --- |
| alto | `next.config.js` | CSP e headers globais | build, servidor e headers/console |
| alto | `src/components/privacy/ConsentProvider.tsx` | consentimento e três analytics | testes + QA Network/revogação |
| alto | `src/app/api/contact/route.ts` | dados e serviço externo | testes API + homologação |
| alto | `src/lib/contact.ts` | contrato/validação | testes lib/form/API |
| alto | `src/lib/seo.ts`, sitemap/robots | domínio e indexação | metadata tests + URLs |
| médio | `programs.ts` | catálogo/downloads/sitemap | integridade, páginas, links |
| médio | `posts.ts`/`postContents.ts` | blog duplicado | integridade, lista e slug |
| médio | `navigation.ts` | menu/rodapé/sitemap | Header e metadata-routes |
| médio | `layout.tsx` | composição global | todas as rotas e build |
| baixo | textos de página/componente | conteúdo local | visual, lint e links |

## 33. Convenções do projeto

- componentes e arquivos React em PascalCase; rotas/slugs em kebab-case;
- imports internos com alias `@/`;
- datas públicas estruturadas em `AAAA-MM-DD`;
- versões como strings (`3.0`, `1.0.0`, `Universal`, `Conceitual`);
- arrays de posts/novidades ordenados manualmente do mais recente ao mais antigo;
- links externos HTTPS, sem `#`, usando `external`/`noopener noreferrer`;
- imagens em `public/images/<domínio>` e caminhos públicos absolutos;
- páginas com `createPageMetadata`, `PageHeader` e componentes compartilhados;
- conteúdo sensível, tokens e endpoint privado fora do código;
- commits pequenos, objetivos e com cadastro/consumidores/testes no mesmo conjunto.

## 34. Glossário

| Termo | Significado neste projeto |
| --- | --- |
| Rota | URL criada pela estrutura de `src/app` |
| Slug | identificador legível usado na URL |
| Componente | função React reutilizável que renderiza interface |
| Layout | composição global que envolve páginas |
| Metadata | título, descrição, canonical e dados sociais |
| Open Graph | dados de prévia usados por redes/mensageiros |
| Sitemap | lista XML das rotas indexáveis |
| Robots | regras para rastreadores e endereço do sitemap |
| Build | compilação/geração de produção pelo Next |
| Deploy | publicação do build em hospedagem |
| Variável de ambiente | configuração fora do código; pode ser pública ou secreta |
| Dependência | pacote npm usado pelo projeto |
| Lockfile | `package-lock.json`, resolução exata das dependências |
| Lint | análise estática de padrões e erros |
| TypeScript | tipos e verificação estática do código |
| Teste unitário | valida uma função isolada, como consentimento |
| Teste de componente | renderiza e interage com React em jsdom |
| Teste de interface | QA em navegador; não há E2E versionado atualmente |
| CSP | Content Security Policy, lista de origens permitidas por tipo |
| Consentimento | escolha local que controla analytics e conteúdo externo |

## 35. Validação e limites deste manual

Os procedimentos foram derivados de arquivos, tipos, consumidores e scripts atuais. Não há fonte oficial de downloads separada, página de novidades, busca, CMS, suporte completo a Markdown, deploy CLI oficial ou E2E versionado. Essas ausências são deliberadamente documentadas em vez de simuladas.

Antes de seguir um procedimento de produção, confirme no painel Vercel a branch, Node, variáveis, domínio e rollback; confirme o provedor do formulário; valide políticas juridicamente; e faça QA em dispositivo físico/leitor de tela quando a mudança afetar experiência ou acessibilidade.

Validação deste manual em 12/07/2026: todos os 44 caminhos literais já existentes citados foram conferidos; os três caminhos adicionais são explicitamente demonstrativos e só passam a existir durante os respectivos procedimentos. `npm run test:ci` aprovou lint, TypeScript, 9 arquivos/41 testes, cobertura e build de 36 páginas. `npm audit` terminou com zero vulnerabilidades conhecidas.
