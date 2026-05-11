# Guia de Contribuição

O hackcoda é um projeto comunitário da Coda.ce e sua ajuda é fundamental. Aceitamos contribuições de todos os níveis de experiência.

## Como Contribuir

### Processo de Pull Request

1. Faça o fork do repositório.
2. Crie uma branch para sua funcionalidade ou correção: `git checkout -b feature/nome-da-feature`.
3. Certifique-se de seguir os padrões de código do projeto (Linting e TypeScript).
4. Faça o commit de suas alterações: `git commit -m "feat: descrição da alteração"`.
5. Envie para o seu fork: `git push origin feature/nome-da-feature`.
6. Abra um Pull Request detalhando o que foi feito.

**Importante:** Assim que o seu Pull Request for aprovado e mesclado (merged), por favor, exclua a sua branch local e remota para manter o repositório organizado.

### Padrões de Commit

Seguimos o padrão de Conventional Commits:
- `feat:` para novas funcionalidades.
- `fix:` para correção de bugs.
- `docs:` para alterações na documentação.
- `style:` para alterações de formatação/estilo que não afetam o código.
- `refactor:` para refatoração de código existente.

## Arquitetura Modular

Ao desenvolver novas funcionalidades, respeite a divisão por módulos em `src/modules`. Cada módulo deve conter suas próprias actions, components, repositories e services. Evite criar acoplamento desnecessário entre módulos diferentes.

## Comunicação

Se tiver dúvidas sobre uma tarefa, utilize as Issues do GitHub ou os canais oficiais da comunidade Coda.ce no Discord/WhatsApp.

Obrigado por contribuir!
