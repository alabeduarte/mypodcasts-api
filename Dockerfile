FROM node:5.3.0

RUN mkdir /app

WORKDIR /tmp
ADD package.json /tmp/

WORKDIR /app
ADD . /app
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
