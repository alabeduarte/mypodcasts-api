FROM node:5.3.0

RUN mkdir /app

WORKDIR /tmp
COPY package.json package.json
COPY node_modules node_modules
RUN npm install

WORKDIR /app
ADD . /app

EXPOSE 3000

CMD ["npm", "start"]
