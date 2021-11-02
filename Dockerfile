FROM node:16.13-buster-slim

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install --legacy-peer-deps

COPY ./src ./src
COPY ./public ./public

EXPOSE 3000

CMD ["npm", "start"]
