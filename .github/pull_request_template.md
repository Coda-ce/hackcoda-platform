## Issue relacionada

<!-- Link ou número da issue (ex.: Closes #42). PRs devem estar alinhadas a uma issue, salvo combinação explícita com mantenedores. -->

## Resumo

<!-- Descreva em poucas frases o que mudou e por quê. -->

## Tipo de mudança

<!-- Marque com um x entre colchetes: [x] -->

- [ ] Correção de bug
- [ ] Nova funcionalidade
- [ ] Alteração que pode quebrar compatibilidade (breaking)
- [ ] Documentação apenas
- [ ] Manutenção / chore (tooling, deps, CI)

## Escopo e commits

- [ ] Esta PR trata **apenas** do escopo da issue referenciada (sem refactors ou alterações não relacionadas “de brinde”).
- [ ] Os commits seguem [Conventional Commits](https://www.conventionalcommits.org/) e estão **granulares** o suficiente para revisão (micro commits quando fizer sentido).

## Checklist técnico

- [ ] `npm run lint` passou localmente.
- [ ] Se alterei **Prisma / schema / migrações**, rodei e descrevi os comandos necessários (`migrate`, `generate`, etc.).
- [ ] A branch base do PR no repositório upstream é **`developer`**.

## Notas para revisor(es)

<!-- Opcional: contexto extra, screenshots, decisões de implementação. -->
