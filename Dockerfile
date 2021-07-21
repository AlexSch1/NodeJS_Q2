##FROM node:14.17-alpine
##
##RUN mkdir -p /user/app
##WORKDIR /user/app
##COPY package*.json /user/app/
##
##RUN npm install
##
##COPY . .
##
##RUN npm run build
#
##COPY /user/app/dist ./dist
##
##EXPOSE 4000
#
##CMD ["node", "dist/main"]
#
##
##
##
#
#FROM node:14.17-alpine AS development
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN npm install glob rimraf
#
#RUN npm install --only=development
#
#COPY . .
#
#RUN npm run build
#
#FROM node:14.17-alpine as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN npm install --only=production
#
#COPY . .
#
#COPY --from=development /usr/src/app/dist ./dist
#
#CMD ["node", "dist/main"]
