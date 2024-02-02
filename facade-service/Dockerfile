FROM node:alpine3.19
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD [ "npm", "start"]