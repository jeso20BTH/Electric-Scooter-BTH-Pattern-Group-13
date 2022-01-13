const axios = require('axios');
const scooter = require('./modules/scooter.js')
const Bike = require('./modules/bike.js')

let users = [];
let bikes = [];
let noOfBikes = 1000;
let maxdifferenceLongLat = 0.01
let positionUpdateFreq = 60000;
let rentFreq = 1000;

function getDistanceFromLatLonInM(point1, point2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(point2[0]-point1[0]);  // deg2rad below
  var dLon = deg2rad(point2[1]-point1[1]);

  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(point1[0])) * Math.cos(deg2rad(point2[0])) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d * 1000;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function generateSteps(start, stop) {
    let points = []
    let maxSpeed = 25 * 1000 / 3600
    let updateSec = positionUpdateFreq / 1000;
    let dist = getDistanceFromLatLonInM(start, stop);
    let numberOfUpdates = Math.abs(Math.ceil(dist / (maxSpeed * updateSec)))

    let latPointDiff = start[0] - stop[0]
    let longPointDiff = start[1] - stop[1]

    let averageLat = latPointDiff / numberOfUpdates
    let firstLastLat = averageLat / 3
    let secondSecondLastLat = firstLastLat * 2
    let averageLong = longPointDiff / numberOfUpdates
    let firstLastLong = averageLong / 3
    let secondSecondLastLong = firstLastLong * 2

    let counter = numberOfUpdates - 2;
    let currPoints = [start[0], start[1]];

    currPoints[0] += firstLastLat;
    currPoints[1] += firstLastLong;
    points.push([currPoints[0], currPoints[1]])
    currPoints[0] += secondSecondLastLat;
    currPoints[1] += secondSecondLastLong;
    points.push([currPoints[0], currPoints[1]])

    for (var i = 0; i < counter; i++) {
        currPoints[0] += averageLat;
        currPoints[1] += averageLong;
        points.push([currPoints[0], currPoints[1]])
    }

    currPoints[0] += secondSecondLastLat;
    currPoints[1] += secondSecondLastLong;
    points.push([currPoints[0], currPoints[1]]);
    points.push(stop);

    return points
}

async function updatePosition(bikeIndex) {
    if (bikeIndex || bikeIndex === 0) {
        bikes[bikeIndex].interval = await setInterval(async () => {
            filteredBikes = bikes.filter(bike => bike.status === 'inRent');
            // console.log(filteredBikes);
            // console.log(bikes);
            console.log("");
            console.log("----------UPDATES------------");

            let curPosition = bikes[bikeIndex].steps[0];
            bikes[bikeIndex].position = curPosition;

            bikes[bikeIndex].steps.shift();

            bikes[bikeIndex].bike.setPosition(curPosition[0], curPosition[1]);
            console.log(`Update: ${bikeIndex + 1}`);

            if (bikes[bikeIndex].steps.length === 0) {
                clearInterval(bikes[bikeIndex].interval)
                bikes[bikeIndex].status = 'free';
                // delete bikes[bikeIndex].steps;
                delete bikes[bikeIndex].endPosition;

                let userIndex = users.findIndex(user => user.bike === bikeIndex)

                let data = {
                    currentScooter: {
                        id: bikes[bikeIndex].id,
                        available: 1,
                        xcoord: bikes[bikeIndex].position[0],
                        ycoord: bikes[bikeIndex].position[1],
                        cityid: 1
                    },
                    currentLog: users[userIndex].log,
                    currentUser: {
                        id: users[userIndex].id,
                        email: 'bgoudy0@ucoz.com'
                    }
                }

                await scooter.unrent(data);
                delete users[userIndex].bike
                users[userIndex].status = 'returned'

                console.log("");
                console.log("----------RETURN------------");
                console.log(`Return ${bikeIndex + 1}`);
            }

        }, positionUpdateFreq)
    }

}

function rentBike() {
    let rentInterval = setInterval(async () => {
        let filteredUsers = users.filter((user) => user.status === 'free')

        if (filteredUsers.length > 0) {
            console.log("");
            console.log("----------RENT------------");
            // console.log(filteredUsers);
            let filteredUserIndex = Math.floor(Math.random() * filteredUsers.length);
            let userIndex = users.findIndex((user) => user.id === filteredUsers[filteredUserIndex].id)

            let filteredBikes = bikes.filter(bike => bike.status === 'free');
            let filteredBikeIndex = Math.floor(Math.random() * filteredBikes.length);
            let bikeIndex = bikes.findIndex(bike => bike.id === filteredBikes[filteredBikeIndex].id)
            users[userIndex].status = 'inRent'
            users[userIndex].bike = bikeIndex

            let endPosition = generateEndPosition(bikes[bikeIndex].position)
            // console.log(bikes[bikeIndex].position ,endPosition);

            let steps = generateSteps(bikes[bikeIndex].position, endPosition);

            let bike = await new Bike(bikeIndex + 1)
            bikes[bikeIndex].bike = bike
            bikes[bikeIndex].bike.start();
            bikes[bikeIndex].bike.overrideGPS();
            bikes[bikeIndex].bike.setPosition(bikes[bikeIndex].position[0], bikes[bikeIndex].position[1])
            // console.log(steps);
            bikes[bikeIndex].steps = steps;
            bikes[bikeIndex].status = 'inRent';
            bikes[bikeIndex].endPosition = endPosition;

            let data = {
                currentScooter: {
                    id: bikes[bikeIndex].id,
                    available: 1,
                    xcoord: bikes[bikeIndex].position[0],
                    ycoord: bikes[bikeIndex].position[1],
                    cityid: 1
                },
                id: users[userIndex].id,
                email: 'bgoudy0@ucoz.com'
            }

            let log = await scooter.rent(data);
            users[userIndex].log = log
            console.log(`Rent ${bikeIndex  + 1}`);

            await updatePosition(bikeIndex);
        }

        if (filteredUsers.length === 0) {
            console.log('All bikes rented');
            clearInterval(rentInterval)}
    }, rentFreq)
}

function generateStartPosition() {
    let centerLat = 56.16123240505397;
    let centerLong = 15.585242467581105;

    let negativOrPosetiveLat = (Math.random() > 0.5) ? 1 : -1;
    let negativOrPosetiveLong = (Math.random() > 0.5) ? 1 : -1;
    let diffLat = Math.random() * maxdifferenceLongLat;
    let diffLong = Math.random() * maxdifferenceLongLat;

    let lat = centerLat + (negativOrPosetiveLat * diffLat);
    let long = centerLong + (negativOrPosetiveLong * diffLong);
    return [lat, long]
}

function generateEndPosition(position) {
    let negativOrPosetiveLat = (Math.random() > 0.5) ? 1 : -1;
    let negativOrPosetiveLong = (Math.random() > 0.5) ? 1 : -1;
    let diffLat = Math.random() * maxdifferenceLongLat;
    let diffLong = Math.random() * maxdifferenceLongLat;

    let lat = position[0] + (negativOrPosetiveLat * diffLat);
    let long = position[1] + (negativOrPosetiveLong * diffLong);
    return [lat, long]
}

async function main() {
    // Skapa loop för att starta cyklar
    for (var i = 1; i <= noOfBikes; i++) {
        let startPosition = generateStartPosition()
        bikes.push({position: startPosition, status: 'free', id: i})
        console.log(`Created: ${i}`);
        users.push({id: i, status: 'free'});
    }
    console.log(bikes, users);

    // console.log(users);
    rentBike()

}

main()
