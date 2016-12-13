FROM node:6.9

ENV PORT 3000

RUN mkdir -p /usr/src/skipass

WORKDIR /usr/src/skipass

ADD package.json yarn.lock /usr/src/skipass/

# Install yarn and pm2
RUN npm install -g yarn \
  && yarn global add pm2 \
  # Restore dependencies
  && yarn

COPY . /usr/src/skipass/

RUN npm run build:server

EXPOSE ${PORT}

CMD ["pm2-docker", "--format", "ecosystem.config.js"]
