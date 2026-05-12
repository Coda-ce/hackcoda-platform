# hackcoda

O hackcoda é um projeto open-source desenvolvido pela comunidade Coda.ce com o objetivo de centralizar a gestão de hackathons: inscrição de times, submissão de projetos e divulgação de resultados.

O projeto utiliza Next.js como solução fullstack — frontend, backend e API em um único repositório, com um único deploy.

## Visão Geral

- Status: Em planejamento (MVP)
- Tipo: Open-Source (Web)
- Stack: Next.js 14 Fullstack (monolito modular)
- Licença: MIT

## Objetivos Estratégicos

- Criar uma plataforma web completa para gestão de hackathons da comunidade Coda.ce.
- Ser open-source e aceitar contribuições de membros com qualquer nível de experiência.
- Integrar-se com as ferramentas já existentes da comunidade (bilheteria, site).
- Servir como projeto vitrine da Coda.ce no GitHub.
- Manter uma arquitetura modular que qualquer desenvolvedor Next.js consiga entender e contribuir.

## Arquitetura Funcional (Módulos)

O sistema é estruturado em módulos independentes dentro do diretório src/modules:

- Módulo de Autenticação (NextAuth): Registro, Login, Sessão e Controle de acesso por role.
- Módulo de Hackathons: CRUD de hackathon, alteração de status, página pública e countdown.
- Módulo de Times: Criar time, gerenciar membros, convites e inscrição.
- Módulo de Projetos: Submissão, upload de screenshot e vitrine pública.
- Módulo de Ranking: Definição de vencedores e resultados.
- Módulo Administrativo: Gestão do ciclo de vida do evento.

## Estrutura de Pastas

O projeto segue uma estrutura de monolito modular para facilitar a manutenção e escalabilidade:

```text
src/
├── app/              # Rotas e Páginas (Next.js App Router)
├── core/             # Configurações globais e integrações (Auth, DB)
├── modules/          # Módulos de negócio independentes
│   ├── auth/         # Lógica de autenticação e usuários
│   ├── hackathons/   # Gestão de eventos e ciclos de vida
│   ├── teams/        # Gestão de times e membros
│   ├── projects/     # Submissões e vitrine de projetos
│   └── ranking/      # Resultados e classificações
├── shared/           # Recursos compartilhados entre módulos
│   ├── components/   # Componentes de UI genéricos
│   ├── exceptions/   # Classes de erro customizadas
│   └── validators/   # Schemas de validação globais
└── prisma/           # Schema do banco de dados e migrações
```

## MVP - Produto Mínimo Viável

### Fluxos do Sistema

- Usuário: Cadastro -> Cria ou entra em um time -> Se inscreve no hackathon -> Desenvolve -> Submete -> Aguarda resultado.
- Admin: Cria hackathon -> Acompanha inscrições -> Encerra submissões -> Define vencedores -> Publica resultado (Ranking).

### Regras de Negócio principais

- Um usuário só pode estar em um time por hackathon.
- Apenas o líder do time pode submeter o projeto.
- Submissão só é permitida enquanto o hackathon está com status 'IN_PROGRESS'.
- Cada time pode submeter apenas um projeto por hackathon.

## Stack Tecnológica

- Framework: Next.js 14 (App Router)
- Linguagem: TypeScript
- Estilização: Tailwind CSS
- ORM: Prisma (PostgreSQL)
- Autenticação: NextAuth.js
- Animações: Framer Motion
- UI Components: Radix UI / Lucide React

## Como Começar

### Pré-requisitos

- Node.js (v18+)
- Banco de dados PostgreSQL

### Subindo o banco com Docker (recomendado para desenvolvimento local)

Se preferir não instalar o PostgreSQL manualmente, o projeto inclui um `docker-compose.yml` que sobe o banco e executa as migrações automaticamente.

**Pré-requisito:** [Docker](https://www.docker.com/) instalado.

1. Clone o repositório:
   ```bash
   git clone https://github.com/codace/hackcoda-platform.git
   ```

2. Configure o ambiente:
   Copie o arquivo `.env.example` para `.env`. A `DATABASE_URL` padrão já está configurada para o banco do Docker:
   ```
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/hackcoda?schema=public"
   ```

3. Suba o banco e execute as migrações:
   ```bash
   docker-compose up -d
   ```
   O serviço `migrate` roda `prisma migrate deploy` automaticamente assim que o banco estiver pronto e encerra em seguida.

4. Instale as dependências e inicie o projeto:
   ```bash
   npm install
   npm run dev
   ```

Para parar os containers: `docker-compose down`
Para remover os dados do banco junto: `docker-compose down -v`

### Instalação manual (sem Docker)

1. Clone o repositório:
   ```bash
   git clone https://github.com/codace/hackcoda-platform.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o ambiente:
   Copie o arquivo `.env.example` para `.env` e preencha as variáveis com os dados do seu banco.

4. Prepare o banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o projeto:
   ```bash
   npm run dev
   ```

## Contribuição

Consulte o arquivo [CONTRIBUTING.md](.github/CONTRIBUTING.md) para entender como você pode ajudar no desenvolvimento do hackcoda.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
