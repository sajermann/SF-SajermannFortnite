FROM node:16.5.0 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Comando para instalar as dependências do chromium para linux no container
RUN apt-get update && apt-get install libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libasound2 -y

ARG TOKEN_FORTNITEAPI
ARG TOKEN
ARG URL_FORTNITEAPI

ENV TOKEN=${TOKEN}
ENV URL_FORTNITEAPI=${URL_FORTNITEAPI}
ENV TOKEN_FORTNITEAPI=${TOKEN_FORTNITEAPI}

RUN echo "Token: ${TOKEN}"

RUN npm run build
RUN npm run copyRequiredsLinux

# Remove todas as pastas exceto a pasta build
RUN find /app -mindepth 1 -maxdepth 1 -type d -not -name "build" -exec rm -rf {} \;

CMD ["node", "./build/src/index.js"]
