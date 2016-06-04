FROM node:6.2.0

RUN mkdir /app

WORKDIR /tmp
COPY package.json package.json
COPY node_modules node_modules
RUN npm install
RUN cp -r node_modules /app/node_modules

WORKDIR /app
ADD . /app

EXPOSE 3000

CMD ["npm", "start"]
