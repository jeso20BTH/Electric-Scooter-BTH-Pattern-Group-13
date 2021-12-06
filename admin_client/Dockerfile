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

RUN ls platforms/browser/cordova/lib

RUN rm ./platforms/browser/cordova/lib/run.js
COPY /platforms/browser/cordova/lib/run.js ./platforms/browser/cordova/lib/run.js

ENTRYPOINT ["cordova"]

CMD ["run", "browser"]