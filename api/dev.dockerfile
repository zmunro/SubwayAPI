FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon
RUN npm run build
EXPOSE 3000
CMD ["node", "build/index.js"]