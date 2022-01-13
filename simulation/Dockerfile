FROM node:10

RUN apt-get update && apt-get install

WORKDIR simulation/

COPY /package.json ./

RUN npm install

COPY /index.js ./

COPY /modules ./modules/

RUN ls modules

ENTRYPOINT ["node"]

CMD ["index.js"]
