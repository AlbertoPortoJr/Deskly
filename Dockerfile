# Etapa 1: build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: rodar a aplicação
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app ./

# instalar apenas dependências de produção
RUN npm install --omit=dev

EXPOSE 3001

# comando para rodar o Next.js em produção
CMD ["npm", "start"]