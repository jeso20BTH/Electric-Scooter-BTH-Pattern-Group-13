FROM node:14

RUN apt-get update && apt-get install

WORKDIR client_app/
RUN npm install -g cordova

RUN cordova create hello com.example.hello HelloWorld
WORKDIR hello

RUN cordova platform add browser
COPY /package*.json ./
RUN npm install
RUN rm  -rf ./www

COPY /www ./www

RUN cat ./www/js/models/db.js

ENTRYPOINT ["cordova"]

CMD ["run", "browser"]
