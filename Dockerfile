FROM node:4.1.2

RUN mkdir /app

WORKDIR /tmp
COPY package.json package.json
COPY node_modules node_modules
RUN npm install

ADD . /app
WORKDIR /app

EXPOSE 3000
