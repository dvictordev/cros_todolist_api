# Crosoften TodoList API

## Descrição

Este projeto é uma API de lista de tarefas construída com **Node.js**, **Express**, **Prisma** e **MySQL**. Ele suporta autenticação JWT, criptografia de senhas com **bcryptjs** e testes com **Vitest**. O projeto segue uma estrutura organizada com uso de TypeScript, visando a criação de uma API robusta e escalável.

## Estrutura de Arquivos

- `src/`: Contém todo o código-fonte da aplicação.
- `prisma/`: Contém os arquivos de configuração e migrações do Prisma ORM.
- `data/`: Diretório usado para armazenar dados persistentes, como bancos de dados locais.
- `.env`: Arquivo de configuração de variáveis de ambiente.
- `.env.example`: Exemplo de configuração das variáveis de ambiente.
- `docker-compose.yml`: Configuração do Docker para facilitar o ambiente de desenvolvimento.
- `tsconfig.json`: Configurações do TypeScript.
- `vitest.config.ts`: Configuração de testes com o Vitest.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no backend.
- **Express**: Framework para criação da API.
- **Prisma ORM**: Gerenciador de banco de dados relacional.
- **Docker**: Ferramenta de containerização usada para criar e gerenciar o ambiente de banco de dados MySQL.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript.
- **bcryptjs**: Para criptografar senhas.
- **JWT (jsonwebtoken)**: Para autenticação baseada em tokens.
- **Vitest**: Para testes automatizados.
- **Supertest**: Para testar requisições HTTP.

## Requisitos

- **Node.js** versão 20 ou superior.
- **Docker** (para subir um container com o banco de dados MySQL).

## Instalação e Execução

Siga os passos abaixo para rodar o projeto corretamente:

1. **Instale as dependências**:

   ```bash
   npm install
   ```

2. **Suba o container Docker com o banco de dados**:

   ```bash
   docker-compose up -d
   ```

3. **Configure as variáveis de ambiente**:

   - Crie um arquivo `.env` baseado no `.env.example`.
   - Exemplo de configuração no arquivo `.env`:
     ```dotenv
     DATABASE_URL="mysql://user:password@cros_db:3306/teste_cros_db"
     JWT_SECRET="your-secret-key"
     PORT=3000
     ```

   > **Aviso:** O usuário para conexão no banco deve ser o **usuário root**, pois o prisma precisa criar um shadow database e não é possivel com um usuario comum, apenas com o usuario root.

4. **Rode as migrações do Prisma**:

   ```bash
   npx prisma migrate dev
   ```

5. **Execute os testes** (opcional):

   - Testes unitários:

     ```bash
     npm run test
     ```

   - Testes em tempo real:

     ```bash
     npm run test:watch
     ```

   - Testes End-to-End:
     ```bash
     npm run test:e2e
     ```

6. **Inicie o servidor**:
   ```bash
   npm run dev
   ```

A aplicação estará disponível em `http://localhost:3000`.

### Exemplo de `.env.example`

```dotenv
DATABASE_URL="URL TO DATABASE"
JWT_SECRET="here goes your JWT_SECRET"
PORT="PORT TO RUN THE LOCAL SERVER"

```

> **Observaçao:** Os teste de integração estão gerando um erro, acredito que causado pelo prisma, como foi feito com um banco MySQL eu não soube resolver mas com um banco PostgreSQL eu utilizar environment de testes, porém diretamente pelo insomnia esta funcionando corretamente
