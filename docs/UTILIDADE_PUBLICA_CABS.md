# Utilidade Pública — CABS

Implementação local para revisão, iniciada em 21/10/2026 sobre `main`, HEAD
`c5fc77d7dd78a85175cad47b96b4754edaec0123`, remoto
`https://github.com/bgbarbosa/dama-universe-site.git`.
Estado inicial: somente `npm-audit.json` não rastreado. Sem autorização para
commit, push ou publicação nesta tarefa.

## Conteúdo e limites

- `/utilidade-publica` e `/utilidade-publica/cabs`, card compartilhado com a Home,
  navegação principal/móvel/rodapé, metadados e sitemap.
- Fonte de dados tipada em `src/data/publicServices.ts`, separada de programas.
- Fonte principal: [página do CABS na Sejusp/MS](https://www.sejusp.ms.gov.br/programas-e-projetos/centro-de-atencao-biopsicossocial/).
  Consulta direta em **21/10/2026, 12h37 (UTC−04)**, HTTP 200; conteúdo examinado,
  telefone, e-mail, endereço, público e Carreta compatíveis com o briefing.
  HTML consultado SHA-256: `41c6477d860d969cd5a7795daedca549b37151869d66f6b755658683788f11ac`.
  Registro local em `build/du-utilidade-publica-cabs/fonte.json` (ignorado pelo Git).
- WhatsApp: identificado também no banner original fornecido pelo usuário;
  a página governamental identifica o número como telefone.
- Divulgação independente, sem representação institucional ou agendamento.
  Não se afirmam horários específicos, atendimento imediato, elegibilidade de
  familiares, gratuidade universal ou entrega garantida de equipamentos.
- Destinos `tel:`, `mailto:` e WhatsApp sem texto pré-preenchido nem envio automático.
  Sem formulário de saúde ou mapa incorporado. Links externos com proteção de nova aba.

## Imagem e preservação

Fornecidas pelo usuário durante a execução:

- Composição editorial: `C:\Users\marco\.codex\.chatgpt-projects\g-p-6aac1f37a62c81919d902cc1be5e2574\outputs\cabs\cabs-imagem-editorial-v1.png`.
  1536 × 1024, 1.319.386 bytes.
  SHA-256 `597d96e392e04115d126cc6ae3e764d2c9b5dbd05f06e0ef1f909739b3ee1f31`.
- Fotografia original: `C:\Users\marco\AppData\Local\Temp\codex-clipboard-83530b4b-20fb-4f5e-afd8-e98b781b2012.jpg`.
  1200 × 1600, 195.382 bytes.
  SHA-256 `737970c768c9f7b9bd0cea2a7ac05a4b27a013c09d62186ce47849aa1c55adef`.
- Cópia web: `public/images/public-utility/cabs-editorial.webp`.
  1536 × 1024, 46.350 bytes, qualidade WebP 86, Sharp já existente.
  SHA-256 `4150e81a1c30c4bd1e9a155a85f857b765ad9236a587801dcf36d55b2dd63340`.

Ambos os originais foram inspecionados visualmente. A composição conserva a
identificação nominal e a organização de cores do símbolo, mas há diferenças
de tipografia, traços e composição decorrentes da recriação editorial por IA.
Não constitui reprodução integral nem arquivo oficial de marca; não se afirma
aprovação institucional ou licença institucional obtida. A legenda informa o
tratamento. Não foram reutilizadas fotografias de terceiros ou miniaturas de busca.
Originais preservados, sem recorte nem retoque adicional: apenas conversão da
composição recebida para WebP. Exibição proporcional em CSS, sem cortar palavras
ou símbolo, com conteúdo essencial também em HTML.

## Revisão local

Após a validação, consultar o relatório e as capturas em
`build/du-utilidade-publica-cabs/` (evidências locais ignoradas pelo Git).
Não executar instaladores nem enviar mensagens de teste.

```powershell
Set-Location 'C:\Users\marco\Desktop\Codex\dama-universe-site'
npm run test:ci
npm run start -- --hostname 127.0.0.1 --port 3106
```

Rotas para revisão: `http://127.0.0.1:3106/`,
`http://127.0.0.1:3106/utilidade-publica` e
`http://127.0.0.1:3106/utilidade-publica/cabs`.

## Resultado da validação local em 21/10/2026

- `npm run test:ci`: aprovado no candidato final, código de saída 0.
  ESLint e TypeScript sem erros; Vitest **18 arquivos / 150 testes aprovados**;
  build Next.js **43 páginas geradas**. As duas novas páginas são estáticas.
- Cobertura dos módulos já selecionados pela configuração do projeto:
  linhas 95,43%, instruções 94,85%, funções 93,33%, ramos 91,42%.
  Não representa cobertura de todos os componentes do site.
- `git diff --check`: aprovado, sem saída, código 0.
- Chromium local: **190 checagens registradas**, além das expectativas do
  Playwright; larguras 360, 390, 768, 1024, 1280, 1440 e 1920 px.
  Navegação Home → CABS e menu → listagem → CABS, teclado, foco, Escape,
  menu móvel, destinos de contato, imagem carregada/proporcional, ausência de
  transbordamento e efeito de elevação com movimento reduzido verificados.
- Sitemap com **33 rotas únicas**; as duas novas presentes. As 30 rotas
  anteriores além da Home mantêm o mesmo hash do texto principal normalizado
  da evidência local do baseline HOME-005. Catálogo preservado com 10 programas
  e filtro de 6 disponíveis, sem CABS no catálogo.
- Nenhum erro JavaScript ou de console na execução final; nenhuma tentativa de
  POST, chamada a contatos externos ou transferência de instalador.
- Ajuste necessário encontrado e corrigido: reduzir o espaço entre itens do
  menu de 4 para 2 px mantém os nove destinos e o botão “Ver Programas” em uma
  linha; áreas de toque e nomes preservados. Cabeçalho final medido em 81 px.
- Ensaios iniciais do script exigiram adequações de automação: não usar
  `wait_for_function` incompatível com a CSP, aguardar o evento de carregamento
  após uma falha de `decode()` em um ensaio, e aceitar a
  normalização já existente do canonical raiz sem barra final. A política de
  segurança e o helper de SEO permaneceram intactos. O último trecho de rotas
  foi retomado a partir dos testes de viewport já aprovados; não houve alteração
  de produto entre essas duas etapas. Evidência consolidada: `browser.json`.
- Celular e toque emulados em Chromium; sem ensaio em aparelho físico ou com
  leitor de tela externo. Não se comprovam funcionamento clínico, disponibilidade
  ou atendimento dos canais apenas por seus destinos.

Capturas finais, em `build/du-utilidade-publica-cabs/`:

| Página | Desktop 1440 px | Celular 390 px |
| --- | --- | --- |
| Home completa | `home-1440.png` | `home-390.png` |
| Seção na Home (recorte sem cabeçalho) | `home-secao-1440.png` | `home-secao-390.png` |
| Listagem | `listagem-1440.png` | `listagem-390.png` |
| CABS | `cabs-1440.png` | `cabs-390.png` |

## Arquivos da implementação

Alterados (7):

- `src/app/page.tsx`: inclusão da seção na composição atual da Home.
- `src/app/sitemap.ts`: duas rotas novas e data real da Home alterada.
- `src/data/navigation.ts`: item compartilhado entre menus e rodapé.
- `src/components/layout/Header.tsx`: espaçamento localizado para acomodar o item.
- `src/app/__tests__/metadata-routes.test.ts`: cobertura das rotas e data da auditoria.
- `src/components/home/__tests__/home.test.tsx`: nove destinos de navegação.
- `src/components/layout/__tests__/Header.test.tsx`: navegação e destaque da nova rota.

Criados (9):

- `src/data/publicServices.ts`: dados tipados, fonte, contatos e data conferida.
- `src/components/public-utility/PublicServiceCard.tsx`: card e imagem compartilhados.
- `src/components/public-utility/public-utility.module.css`: identidade, profundidade e responsividade.
- `src/components/home/PublicUtilityPreview.tsx`: seção compacta da Home.
- `src/app/utilidade-publica/page.tsx`: apresentação e listagem.
- `src/app/utilidade-publica/cabs/page.tsx`: página informativa do CABS.
- `src/app/utilidade-publica/__tests__/public-utility.test.tsx`: testes da nova seção.
- `public/images/public-utility/cabs-editorial.webp`: composição otimizada.
- `docs/UTILIDADE_PUBLICA_CABS.md`: este registro técnico e de proveniência.

Arquivos de execução, capturas e evidências em `build/` são locais e ignorados.
O inventário por hash confirma somente os sete arquivos preexistentes alterados
acima. Os demais arquivos rastreados, os dois originais e `npm-audit.json`
permanecem com os mesmos bytes. Dependências e lockfile intactos.

Estado final: `main`, HEAD `c5fc77d7dd78a85175cad47b96b4754edaec0123`,
mesmo remoto; 7 arquivos modificados e 9 novos da tarefa, sem staging.
`npm-audit.json` continua não rastreado e fora da tarefa. Sem commit, push ou
publicação. Implementação local pronta para revisão; nenhuma pendência técnica
impeditiva identificada nos testes realizados. A composição continua editorial,
sem declaração de aprovação institucional ou fidelidade gráfica integral.
