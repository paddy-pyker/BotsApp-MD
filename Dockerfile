FROM nikolaik/python-nodejs

WORKDIR /BotsApp-MD

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN pip install -r zlibrary/requirements.txt

CMD [ "npm", "start"]