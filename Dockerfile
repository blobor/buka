FROM node:6.9

ENV PORT 3000

RUN mkdir -p /usr/src/skipass

WORKDIR /usr/src/skipass

COPY . /usr/src/skipass

# Install PM2
RUN npm install -g pm2

# Restore dependencies
RUN npm install

RUN npm run build

EXPOSE ${PORT}

CMD ["pm2-docker", "processes.json"]
