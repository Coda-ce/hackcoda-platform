<div align="center">

# hackcoda

Plataforma open source para **gestão de hackathons**: times, submissões de projetos e divulgação de resultados — desenvolvida pela comunidade **Coda.ce**.

[![Licença MIT](https://img.shields.io/github/license/Coda-ce/hackcoda-platform?label=Licen%C3%A7a)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-banco-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Stars](https://img.shields.io/github/stars/Coda-ce/hackcoda-platform?style=social)](https://github.com/Coda-ce/hackcoda-platform)

[Contribuir](.github/CONTRIBUTING.md) · [Código de conduta](.github/CODE_OF_CONDUCT.md) · [Segurança](.github/SECURITY.md) · [Issues](https://github.com/Coda-ce/hackcoda-platform/issues)

</div>

---

## Sobre o projeto

O **hackcoda** centraliza o ciclo de um hackathon em um único repositório **Next.js fullstack** (interface, API e deploy unificados), com arquitetura **modular** para facilitar contribuições em qualquer nível.

| | |
| --- | --- |
| **Status** | MVP em evolução |
| **Tipo** | Aplicação web open source |
| **Licença** | [MIT](LICENSE) |

### Objetivos

- Plataforma completa para hackathons da comunidade Coda.ce.
- Base de código acessível a quem está começando e a quem já domina Next.js.
- Integração futura com ferramentas da comunidade (bilheteria, site institucional).
- Projeto vitrine da Coda.ce no ecossistema open source.

## Funcionalidades (visão por módulos)

- **Autenticação** — registro, sessão e papéis (NextAuth).
- **Hackathons** — CRUD, status do evento, página pública e countdown.
- **Times** — criação, membros, convites e inscrição no evento.
- **Projetos** — submissão, mídia e vitrine pública.
- **Ranking** — vencedores e publicação de resultados.
- **Admin** — operação do ciclo de vida do hackathon.

## Arquitetura

O código é organizado como **monólito modular** em `src/modules`, com limites claros entre domínios.

```text
src/
├── app/              # Rotas e páginas (App Router)
├── core/             # Configurações globais (Auth, DB, integrações)
├── modules/          # Domínios de negócio
│   ├── auth/
│   ├── hackathons/
│   ├── teams/
│   ├── projects/
│   └── ranking/
├── shared/           # UI, validadores e utilitários compartilhados
│   ├── components/
│   ├── exceptions/
│   └── validators/
└── prisma/           # Schema e migrações
```

### Regras de negócio (MVP)

- Um usuário participa de **um time por hackathon**.
- Apenas o **líder** do time submete o projeto.
- Submissão permitida apenas com status do evento **`IN_PROGRESS`**.
- **Um projeto por time** por hackathon.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS |
| Dados | Prisma + PostgreSQL |
| Auth | NextAuth.js |
| UI / motion | Radix UI, Lucide, Framer Motion |

## Como executar localmente

### Pré-requisitos

- **Node.js** 18 ou superior
- **PostgreSQL** acessível localmente ou via URL de conexão — ou [Docker](https://www.docker.com/) para subir o banco com `docker-compose`

### Subindo o banco com Docker (recomendado)

Se preferir não instalar o PostgreSQL manualmente, o projeto inclui um `docker-compose.yml` que sobe o banco e executa as migrações automaticamente.

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Coda-ce/hackcoda-platform.git
   cd hackcoda-platform
   ```

2. **Variáveis de ambiente**  
   Copie `.env.example` para `.env`. A `DATABASE_URL` padrão já está configurada para o banco do Docker:

   ```env
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/hackcoda?schema=public"
   ```

3. **Banco e migrações**

   ```bash
   docker compose up -d
   ```

   O serviço `migrate` roda `prisma migrate deploy` automaticamente assim que o banco estiver pronto e encerra em seguida.

4. **Dependências e servidor**

   ```bash
   npm install
   npm run dev
   ```

Para parar os containers: `docker compose down`  
Para remover os dados do banco junto: `docker compose down -v`

### Instalação manual (sem Docker)

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Coda-ce/hackcoda-platform.git
   cd hackcoda-platform
   ```

2. **Instale dependências**

   ```bash
   npm install
   ```

3. **Variáveis de ambiente**  
   Copie `.env.example` para `.env` e preencha as variáveis com os dados do seu banco.

4. **Banco de dados**

   ```bash
   npx prisma migrate dev
   ```

5. **Servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

Comandos úteis: `npm run lint`, `npm run build`, scripts `db:*` definidos no [`package.json`](package.json).

## Contribuição

Contribuições são bem-vindas. Leia o [**guia de contribuição**](.github/CONTRIBUTING.md) — lá estão fluxo de branches (`developer`), **Conventional Commits**, escopo de PR vinculado a **issues** e checklist de revisão.

- [**CONTRIBUTING.md**](.github/CONTRIBUTING.md) — processo técnico e de comunidade  
- [**CODE_OF_CONDUCT.md**](.github/CODE_OF_CONDUCT.md) — conduta esperada  
- [**SECURITY.md**](.github/SECURITY.md) — reporte responsável de vulnerabilidades  

## Licença

Distribuído sob a licença **MIT**. Consulte [LICENSE](LICENSE).

---

<div align="center">

**Coda.ce** · [hackcoda-platform no GitHub](https://github.com/Coda-ce/hackcoda-platform)

</div>
