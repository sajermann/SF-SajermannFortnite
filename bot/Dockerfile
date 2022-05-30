FROM node:16.5.0 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . ./
RUN npm install -g typescript
RUN npm install -g eslint

ENV TOKEN={{secrets.TOKEN}}
ENV URL_FORTNITEAPI={{secrets.URL_FORTNITEAPI}}
ENV TOKEN_FORTNITEAPI={{secrets.TOKEN_FORTNITEAPI}}
RUN npm run build

CMD ["node", "./build/src/index.js"]
