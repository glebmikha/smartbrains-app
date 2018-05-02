FROM node:8

RUN npm install -g npm
RUN npm install -g create-react-app # maybe it should be installed locally

ENTRYPOINT while true; do echo hello world; sleep 1; done
