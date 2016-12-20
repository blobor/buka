FROM node:6.9.1-alpine

ENV PORT 3000

ARG NODE_ENV=production

WORKDIR /usr/src/skipass.site

ADD package.json yarn.lock /usr/src/skipass.site/

# Install yarn and pm2
RUN npm install -g yarn \
  && yarn global add pm2 \
  # Restore dependencies
  && yarn

COPY . /usr/src/skipass.site/

RUN npm run build

VOLUME /usr/src/skipass.site/public

EXPOSE ${PORT}

CMD ["pm2-docker", "--format", "ecosystem.config.js"]
