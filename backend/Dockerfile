FROM node:18.17.0

WORKDIR /app

COPY . /app/

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:dev"]