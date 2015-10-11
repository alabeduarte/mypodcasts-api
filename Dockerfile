FROM node:4.1.2

RUN mkdir /app

WORKDIR /app
ADD . /app
RUN cd app; npm install

EXPOSE 3000

CMD npm start
