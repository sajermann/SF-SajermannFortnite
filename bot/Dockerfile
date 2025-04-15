# Estágio de construção
FROM node:20.12.2 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

# Estágio de produção
FROM node:20-alpine

WORKDIR /app

# Dependências do sistema para Chromium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Copia toda a estrutura do build (incluindo templates e package.json)
COPY --from=builder /app/build/. .

# Configurações de ambiente
ENV NODE_ENV=production
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

CMD ["node", "index.js"]
