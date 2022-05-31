FROM node:16.5.0 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . ./
RUN npm install -g typescript
RUN npm install -g eslint

ENV TOKEN={{TOKEN}}
ENV URL_FORTNITEAPI={{URL_FORTNITEAPI}}
ENV TOKEN_FORTNITEAPI={{TOKEN_FORTNITEAPI}}
ARG BRUNO
RUN npm run build

CMD ["node", "./build/src/index.js"]
