FROM node:10

RUN apt-get update && apt-get install

WORKDIR oauth/

COPY / ./

RUN npm install

ENTRYPOINT ["npm"]

CMD ["start"]
