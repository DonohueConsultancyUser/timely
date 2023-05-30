FROM node:alpine

RUN mkdir /api

WORKDIR /api

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build


# Використовуємо базовий образ Node.js
FROM node:alpine

RUN mkdir /api

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]