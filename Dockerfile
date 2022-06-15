FROM node:14.17-alpine

RUN mkdir -p /user/app
WORKDIR /user/app
COPY package*.json /user/app/

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]


#FROM node:14.17-alpine
#ARG PORT
#ENV PORT=${PORT:-4000}
#WORKDIR /usr/express/app
#COPY package*.json .
#RUN npm install
#COPY . .
#EXPOSE $PORT
#CMD ["npm", "run", "start:docker"]
