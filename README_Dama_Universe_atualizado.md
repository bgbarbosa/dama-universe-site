# Dama Universe

Site/blog/vitrine para divulgação dos projetos **Dama**, reunindo programas, ferramentas digitais, GPTs personalizados, vídeos, blog técnico, referências de estudo, páginas institucionais e futuras formas de apoio.

O Dama Universe é um projeto autoral em evolução, criado para organizar e apresentar ferramentas ligadas a tecnologia, inteligência artificial, dados, automação documental e apoio operacional.

> As ferramentas disponibilizadas possuem finalidade de apoio, organização e automação, exigindo conferência e responsabilidade do usuário. O site não representa órgão público, instituição oficial ou sistema governamental.

---

## Status atual do projeto

Versão em preparação para publicação.

Etapas já concluídas:

- Etapa 13 — Congelamento da versão atual e preparação para deploy.
- Etapa 14 — Revisão técnica local.
- Etapa 15 — Revisão de segurança antes da publicação.

Etapa atual:

- Etapa 16 — Revisão final, documentação e checklist de publicação.

Próxima etapa:

- Etapa 17 — Primeira divulgação pública.

---

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- ESLint
- Estrutura com `src/`
- Deploy planejado na Vercel
- Versionamento pelo GitHub

---

## Estrutura principal

```text
src/
  app/
    apoie/
    blog/
    contato/
    gpts/
    programas/
    referencias/
    sobre/
    termos-de-uso/
    politica-de-privacidade/
    politica-de-comentarios/
    layout.tsx
    page.tsx
  components/
    blog/
    comments/
    forms/
    home/
    layout/
    notices/
    programs/
    references/
    ui/
    videos/
  data/
    gpts.ts
    postContents.ts
    posts.ts
    programs.ts
    references.ts
    updates.ts
  lib/
    seo.ts
public/
  images/
```

---

## Rotas principais

Testar antes da publicação:

```text
/
/programas
/programas/dama-gerador-fcc
/programas/dama-gerador-fcc-universal
/programas/sdo
/programas/dama-gestor-de-inqueritos
/programas/dama-inteligencia-investigativa
/gpts
/blog
/referencias
/apoie
/sobre
/contato
/termos-de-uso
/politica-de-privacidade
/politica-de-comentarios
/sitemap.xml
/robots.txt
```

Observação:

- A página `/downloads` não é mais item principal do menu.
- O download do Dama Gerador FCC 3.0 fica diretamente na página do programa.
- Caso a rota `/downloads` exista, ela deve apenas redirecionar ou orientar para `/programas/dama-gerador-fcc`.

---

## Programas apresentados

### Dama Gerador FCC 3.0

Status: disponível.

Ferramenta desktop para apoio à geração, organização e padronização de Formulários de Cadeia de Custódia, com extração a partir de B.O. em PDF, preenchimento manual, conferência visual e geração de documento.

### Dama Gerador FCC Universal

Status: fase de testes finais.

Evolução do Dama Gerador FCC com foco em modelos personalizados, órgãos, cabeçalhos, biblioteca de modelos e geração universal de documentos.

### SDO

Status: ajustes finais.

Sistema voltado ao apoio operacional, organização de plantão, registros, relatórios, acompanhamento de pendências e controle de fluxos internos.

### Dama Gestor de Inquéritos

Status: em desenvolvimento.

Sistema planejado para gestão de inquéritos, prazos, documentos, objetos em cartório, relatórios e dados de acompanhamento.

### Dama Inteligência Investigativa

Status: arquitetura reservada.

Projeto estratégico em planejamento reservado, voltado a inteligência investigativa, organização de dados, análise e integração futura de módulos especializados.

---

## GPTs personalizados

A página `/gpts` apresenta, neste momento, apenas os assistentes oficiais definidos para a versão inicial do site:

- Boletim de Ocorrência 2.0
- Especialista em Escrita e Revisão

---

## Rodar localmente

Instalar dependências:

```bash
npm install
```

Rodar em modo desenvolvimento:

```bash
npm run dev
```

Acessar:

```text
http://localhost:3000
```

Caso a porta 3000 esteja ocupada, o Next.js poderá abrir em:

```text
http://localhost:3001
```

---

## Build

Antes de publicar, rodar:

```bash
npm run build
```

O projeto só deve ser enviado para publicação se o build concluir sem erro crítico.

---

## Lint

Rodar, se o script estiver disponível:

```bash
npm run lint
```

O lint deve ser usado como apoio para identificar erros de código, importações quebradas e problemas de padronização.

---

## Variáveis de ambiente

Não criar arquivo `.env` com dados reais dentro do repositório.

Variáveis públicas possíveis:

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT
NEXT_PUBLIC_GISCUS_REPO
NEXT_PUBLIC_GISCUS_REPO_ID
NEXT_PUBLIC_GISCUS_CATEGORY
NEXT_PUBLIC_GISCUS_CATEGORY_ID
```

### Formulário de contato

Quando o formulário for ativado, configurar:

```text
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/SEU_CODIGO
```

No ambiente local, usar `.env.local`.

Na Vercel, cadastrar a variável em:

```text
Project Settings > Environment Variables
```

O arquivo `.env.local` não deve ser enviado ao GitHub.

### Comentários

Os comentários do blog estão desativados nesta fase.

O componente de comentários pode permanecer no projeto, mas não deve quebrar páginas caso as variáveis do Giscus não estejam configuradas.

---

## Links temporários

Alguns canais ainda não estão ativos.

No rodapé, os canais devem aparecer como:

```text
Canais oficiais em preparação
```

Canais previstos:

```text
GitHub
Instagram
YouTube
LinkedIn
```

Texto de apoio:

```text
Os canais oficiais do Dama Universe serão ativados gradualmente conforme o projeto evoluir.
```

Links temporários com `#` devem ser mantidos apenas onde fizer sentido e devem estar fáceis de substituir futuramente.

---

## Segurança

Antes de publicar, confirmar que o projeto não contém:

- dados reais de ocorrência;
- nomes de vítimas;
- nomes de investigados;
- nomes de terceiros relacionados a ocorrências reais;
- CPF, RG, telefone ou endereço de terceiros;
- documentos institucionais restritos;
- prints sensíveis;
- senhas;
- tokens;
- chaves de API;
- arquivos `.env`;
- bancos de dados;
- logs;
- código-fonte privado dos programas;
- documentos internos;
- links privados de arquivos restritos.

Busca simples recomendada no PowerShell:

```powershell
Get-ChildItem -Recurse -File | Select-String -Pattern "senha","token","api_key","secret",".env","cpf","rg"
```

Qualquer ocorrência deve ser analisada manualmente antes do commit.

---

## .gitignore recomendado

Confirmar se o `.gitignore` contém:

```text
node_modules
.next
.env
.env.local
.env.production
dist
build
logs
*.log
.DS_Store
```

---

# Etapa 16 — Revisão final antes da publicação

## Objetivo

Fazer a última checagem técnica, visual, textual, documental e de segurança antes de publicar o Dama Universe.

Esta etapa não deve criar novas funcionalidades. O objetivo é validar o que já foi feito e corrigir apenas erros críticos.

---

## Checklist da Etapa 16

### 1. Funcionamento técnico

- [ ] `npm run dev` funciona.
- [ ] `npm run build` conclui sem erro crítico.
- [ ] `npm run lint` não apresenta erro crítico, se estiver configurado.
- [ ] Nenhuma página principal quebra.
- [ ] Nenhum componente importante está com importação quebrada.
- [ ] Não há erro de console que impeça navegação.

### 2. Navegação

- [ ] Header aparece corretamente.
- [ ] Footer aparece corretamente.
- [ ] Menu mobile funciona.
- [ ] Links internos funcionam.
- [ ] Botão “Conhecer criador” aparece na Home, Programas e GPTs.
- [ ] Nas páginas internas dos programas, o botão volta para “Ver Programas”.
- [ ] Footer mostra “Canais oficiais em preparação”.

### 3. Páginas principais

- [ ] Home revisada.
- [ ] Programas revisada.
- [ ] Dama Gerador FCC revisada.
- [ ] Dama Gerador FCC Universal revisada.
- [ ] SDO revisada.
- [ ] Dama Gestor de Inquéritos revisada.
- [ ] Dama Inteligência Investigativa revisada.
- [ ] GPTs revisada.
- [ ] Blog revisado.
- [ ] Referências revisada.
- [ ] Apoie revisada.
- [ ] Sobre revisada.
- [ ] Contato revisada.
- [ ] Termos de Uso revisada.
- [ ] Política de Privacidade revisada.
- [ ] Política de Comentários revisada.

### 4. Visual

- [ ] Fundo preto/grafite consistente.
- [ ] Elementos prata/cromado consistentes.
- [ ] Azul elétrico aplicado nos destaques.
- [ ] Cards com bordas e sombras coerentes.
- [ ] Botões legíveis.
- [ ] Títulos legíveis.
- [ ] Textos sem excesso visual.
- [ ] Página de referências com homenagem em destaque no início.
- [ ] Cards de referências com destaque azul.
- [ ] Card do Dama Gerador FCC em destaque na Home.
- [ ] Vídeos do Dama Gerador FCC organizados em rolagem horizontal.

### 5. Conteúdo

- [ ] Textos sem erros evidentes.
- [ ] O site não promete substituição de conferência humana.
- [ ] O site não se apresenta como sistema oficial de órgão público.
- [ ] Projetos em desenvolvimento estão claramente identificados.
- [ ] Projetos em testes finais estão claramente identificados.
- [ ] Dama Inteligência Investigativa está com informações reservadas.
- [ ] Blog não mostra comentários nesta fase.
- [ ] Referências estão organizadas como homenagem e fonte de estudo.

### 6. Download

- [ ] Link do Dama Gerador FCC 3.0 abre corretamente.
- [ ] Arquivo do Google Drive está correto.
- [ ] Compartilhamento está público para quem possui o link.
- [ ] ZIP não contém dados sensíveis.
- [ ] ZIP não contém arquivos `.env`.
- [ ] ZIP não contém logs.
- [ ] ZIP não contém banco de dados indevido.
- [ ] ZIP não contém código-fonte privado indevido.

### 7. Formulário de contato

- [ ] Campos aparecem corretamente.
- [ ] Aviso de não envio de dados sensíveis aparece.
- [ ] Validação básica funciona.
- [ ] Endpoint está configurado, se o envio real já estiver ativo.
- [ ] Caso o envio real ainda não esteja ativo, o site não deve passar falsa impressão de funcionamento definitivo.

### 8. SEO

- [ ] Metadata das páginas principais configurada.
- [ ] `sitemap.xml` acessível.
- [ ] `robots.txt` acessível.
- [ ] URLs amigáveis.
- [ ] Open Graph existente ou preparado.
- [ ] `NEXT_PUBLIC_SITE_URL` preparado para uso futuro.

### 9. Responsividade

- [ ] Home funciona no celular.
- [ ] Programas funciona no celular.
- [ ] Página do Dama Gerador FCC funciona no celular.
- [ ] Blog funciona no celular.
- [ ] Referências funciona no celular.
- [ ] Contato funciona no celular.
- [ ] Header mobile funciona.
- [ ] Cards não estouram a largura.
- [ ] Vídeos em rolagem horizontal funcionam.

### 10. Segurança final

- [ ] Nenhum dado real de ocorrência.
- [ ] Nenhum nome de vítima.
- [ ] Nenhum nome de investigado.
- [ ] Nenhum CPF, RG ou documento pessoal.
- [ ] Nenhum telefone pessoal de terceiro.
- [ ] Nenhum endereço pessoal de terceiro.
- [ ] Nenhuma senha.
- [ ] Nenhum token.
- [ ] Nenhuma chave de API.
- [ ] Nenhum arquivo `.env`.
- [ ] Nenhum documento institucional restrito.
- [ ] Nenhum print sensível.
- [ ] Nenhum log sensível.
- [ ] Nenhum código-fonte privado dos programas.

---

## Resultado esperado da Etapa 16

Ao final da etapa, o projeto deve estar:

- aprovado para publicação;
- sem erro crítico de build;
- sem dados sensíveis;
- com navegação revisada;
- com conteúdo coerente;
- com download testado;
- com formulário preparado ou ativo;
- com visual aprovado;
- pronto para GitHub e Vercel.

---

## GitHub

Comandos básicos para primeiro envio:

```bash
git init
git add .
git commit -m "Publica versão inicial do Dama Universe"
git branch -M main
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
```

Antes de `git add .`, rodar:

```bash
git status
```

Confirmar que nenhum arquivo sensível será enviado.

---

## Vercel

Configuração planejada:

```text
Framework: Next.js
Build Command: npm run build
Output Directory: automático
Install Command: npm install
```

Depois do deploy, testar o domínio provisório da Vercel antes de configurar o domínio final.

---

## Domínio pretendido

```text
damauniverse.com.br
```

Configuração recomendada:

```text
damauniverse.com.br como domínio principal
www.damauniverse.com.br redirecionando para damauniverse.com.br
```

---

## Pós-publicação

Testar online:

- [ ] Home.
- [ ] Programas.
- [ ] Página do Dama Gerador FCC.
- [ ] Download.
- [ ] GPTs.
- [ ] Blog.
- [ ] Referências.
- [ ] Apoie.
- [ ] Sobre.
- [ ] Contato.
- [ ] Termos.
- [ ] Privacidade.
- [ ] Política de Comentários.
- [ ] Links externos.
- [ ] Responsividade.

---

## Licença e uso

Projeto autoral de Marco Aurélio Pereira Barbosa.

O conteúdo, identidade visual, organização textual e materiais do Dama Universe não devem ser copiados, reutilizados ou redistribuídos sem autorização.

---

## Observação final

A primeira publicação deve priorizar estabilidade, segurança e clareza.

Melhorias visuais, novos canais, novos posts, comentários, integrações e expansões devem ser tratadas após o site estar publicado e testado.
