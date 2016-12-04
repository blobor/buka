FROM node:6.9

ENV PORT 3000

RUN mkdir -p /usr/src/skipass

WORKDIR /usr/src/skipass

COPY . /usr/src/skipass

# Install yarn
RUN npm install -g yarn

RUN yarn global add pm2

# Restore dependencies
RUN yarn install

RUN npm run build:server

EXPOSE ${PORT}

CMD ["pm2-docker", "processes.json"]
