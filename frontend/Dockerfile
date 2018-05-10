FROM node:8

ENV APP_HOME /home/node/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN npm install -g npm
RUN npm install -g create-react-app

COPY app/package.json package.json

RUN npm install --quiet

COPY . .
