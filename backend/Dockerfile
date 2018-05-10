FROM node:8

ENV APP_HOME /home/node/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN npm install -g npm

COPY app/package.json package.json

RUN npm install --quiet

COPY . .

ENTRYPOINT while true; do echo hello world; sleep 1; done
