# Estágio de construção
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

# Estágio de produção (nomeado)
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/build .
ENV NODE_ENV=production
CMD ["node", "index.js"]
