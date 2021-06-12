FROM node:14.17-alpine

RUN mkdir -p /user/app
WORKDIR /user/app
COPY package*.json /user/app/

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
