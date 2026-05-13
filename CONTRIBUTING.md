# Guia de contribuição

O **hackcoda** é um projeto comunitário da **Coda.ce**. Toda contribuição é valorizada, independentemente do seu nível de experiência. Este documento descreve o fluxo que usamos para manter o repositório organizado, revisável e previsível — no padrão de projetos open source maduros.

## Índice

- [Antes de abrir um Pull Request](#antes-de-abrir-um-pull-request)
- [Fluxo de trabalho (fork, branch, PR)](#fluxo-de-trabalho-fork-branch-pr)
- [Escopo: uma issue, uma PR](#escopo-uma-issue-uma-pr)
- [Commits (Conventional Commits e micro commits)](#commits-conventional-commits-e-micro-commits)
- [Padrões de branch](#padrões-de-branch)
- [Checklist do Pull Request](#checklist-do-pull-request)
- [Arquitetura modular](#arquitetura-modular)
- [Comunicação](#comunicação)
- [Documentos relacionados](#documentos-relacionados)

---

## Antes de abrir um Pull Request

1. **Procure issues existentes** em [Issues](https://github.com/Coda-ce/hackcoda-platform/issues) para evitar trabalho duplicado.
2. **Comente na issue** que pretende trabalhar nela, para alinhar expectativas com mantenedores e outros contribuidores.
3. Se a ideia for nova e não houver issue, **abra uma issue primeiro** (bug, melhoria ou discussão), salvo correções triviais já consensuais (por exemplo, typo em documentação).
4. Leia o [Código de conduta](CODE_OF_CONDUCT.md) e as orientações de [Segurança](SECURITY.md) quando aplicável.

---

## Fluxo de trabalho (fork, branch, PR)

1. Faça **fork** do repositório e clone o seu fork (ou adicione `upstream` apontando para `Coda-ce/hackcoda-platform`).
2. Atualize a branch de integração e crie a sua branch a partir dela:

   ```bash
   git checkout developer
   git pull origin developer
   git checkout -b tipo/descricao-curta
   ```

3. Desenvolva mantendo o **escopo alinhado à issue** (ver seção seguinte).
4. Execute **lint** e verificações locais relevantes (`npm run lint`; se alterar schema ou migrações, rode os fluxos Prisma indicados na issue ou no PR template).
5. Faça **push** para o seu fork e abra um **Pull Request** com **base `developer`** — **não** direcione PRs novos para `main`, salvo orientação explícita dos mantenedores.
6. Preencha o template de PR (issue relacionada, descrição, checklist).

**Após o merge:** remova a branch local e a remota do fork para manter o histórico limpo, por exemplo:

```bash
git checkout developer
git pull origin developer
git branch -d tipo/descricao-curta
git push origin --delete tipo/descricao-curta
```

---

## Escopo: uma issue, uma PR

Regra central para manter revisão e histórico claros:

- **Uma Pull Request deve corresponder a uma única issue** (ou a um conjunto muito pequeno de issues **explicitamente combinadas** com os mantenedores na própria thread).
- **Commits dentro dessa PR devem tratar apenas do que a issue descreve** — correção, feature ou documentação ligada ao ticket. Evite incluir na mesma PR refactors amplos, formatação em massa em arquivos não tocados pela solução, ou “aproveitei e arrumei outra coisa”.
- Se durante o trabalho surgir outro bug ou melhoria, **abra outra issue** e outra PR.

Na descrição da PR, use palavras-chave do GitHub para vincular e fechar a issue quando fizer sentido, por exemplo: `Closes #12` ou `Fixes #12` (veja [documentação oficial](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)).

---

## Commits (Conventional Commits e micro commits)

Seguimos [Conventional Commits](https://www.conventionalcommits.org/) em **inglês** no assunto (facilita ferramentas e changelog):

| Prefixo | Uso |
| --- | --- |
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Somente documentação |
| `style:` | Formatação / estilo sem mudança de comportamento |
| `refactor:` | Refatoração sem mudar comportamento externo |
| `perf:` | Melhoria de desempenho |
| `test:` | Testes (adicionar ou ajustar) |
| `chore:` | Manutenção (deps, tooling, configs) |
| `ci:` | Integração contínua / pipelines |
| `revert:` | Reverter um commit anterior |

**Micro commits:** prefira **vários commits pequenos e coerentes** a um único commit gigante — cada commit deve representar uma alteração lógica que um revisor consiga entender isoladamente e que possa ser revertida com segurança se necessário.

Exemplos:

```text
fix(auth): validate session on protected routes
docs(readme): update local setup prerequisites
chore(deps): bump zod to patch version
```

---

## Padrões de branch

Use prefixos em minúsculas, separados por hífen, com nome descritivo curto:

| Prefixo | Quando usar |
| --- | --- |
| `feature/` | Nova funcionalidade |
| `fix/` | Correção de bug |
| `docs/` | Apenas documentação |
| `chore/` | Manutenção, tooling, sem impacto direto em feature de produto |

Exemplos: `feature/team-invite-email`, `fix/login-redirect-loop`, `docs/contributing-issue-scope`.

Todas as branches de contribuição partem de **`developer`**.

---

## Checklist do Pull Request

Antes de marcar a PR como pronta para revisão, confira:

- [ ] A PR está **vinculada a uma issue** (número referenciado no corpo; `Closes`/`Fixes` quando aplicável).
- [ ] O **escopo** está limitado ao que a issue pede (sem mudanças colaterais desnecessárias).
- [ ] Os **commits** seguem Conventional Commits e estão **granulares** o suficiente para revisão.
- [ ] `npm run lint` passa localmente.
- [ ] Se houver mudanças em **Prisma/schema/migrações**, os passos de banco foram executados e descritos na PR.
- [ ] A branch base do PR no repositório upstream é **`developer`**.

---

## Arquitetura modular

Novas funcionalidades devem respeitar a divisão em `src/modules`. Cada módulo concentra suas **actions**, **components**, **repositories** e **services** quando aplicável. Evite acoplamento desnecessário entre módulos; prefira interfaces claras e código compartilhado em `shared/` quando for reutilização genuína.

---

## Comunicação

- Dúvidas sobre **tarefas e desenho**: use as **Issues** do GitHub.
- Comunidade Coda.ce: canais oficiais (Discord, WhatsApp), conforme divulgado pela organização.

Obrigado por contribuir com o hackcoda.

---

## Documentos relacionados

- [Código de conduta](CODE_OF_CONDUCT.md)
- [Política de segurança](SECURITY.md)
- [README](README.md) — visão geral do projeto e como rodar localmente
