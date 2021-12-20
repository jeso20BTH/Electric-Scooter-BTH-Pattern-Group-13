FROM node:14

WORKDIR /bike-app

COPY . ./

RUN chmod -R 755 .

RUN npm install -g cordova
RUN npm install
RUN npm run style-min
RUN cordova telemetry on
RUN cordova platform add browser

CMD ["cordova", "run", "browser"]