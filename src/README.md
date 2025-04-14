# 💰 Controle de Despesas API

API REST para controle de finanças pessoais. Permite registrar receitas, despesas, categorias e gerar relatórios mensais.

## 🛠 Tecnologias

- Node.js + NestJS
- PostgreSQL (AWS RDS)
- AWS S3 (relatórios)
- AWS Cognito (autenticação)
- AWS Lambda + API Gateway
- Prisma ORM
- Swagger (documentação)

## 📦 Funcionalidades

- Cadastro e login de usuários
- CRUD de transações (receitas e despesas)
- Categorias personalizáveis
- Relatórios mensais e totais
- Exportação de relatório em PDF
- Armazenamento em nuvem (AWS S3)

## 🚀 Como rodar localmente

```bash
# Instalar dependências
npm install

# Rodar o projeto
npm run start:dev
