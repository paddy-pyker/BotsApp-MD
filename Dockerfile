FROM node:16

WORKDIR /BotsApp-MD

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8080

CMD [ "npm", "start"]