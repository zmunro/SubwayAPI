FROM node:latest
RUN mkdir -p /usr/src
WORKDIR /usr/src/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon ts-node
RUN npm run build
EXPOSE 3000
CMD ["node", "build/index.js"]