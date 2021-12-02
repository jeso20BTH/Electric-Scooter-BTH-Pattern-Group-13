const axios = require('axios');
import m from 'mithril';
console.log(process.env.DBTOKEN);

let config;

try {
    config = require('./config.json');
} catch (e) {
    console.log(e);
}
let token = process.env.DBTOKEN || config.dbToken;
let dbURL = 'http://localhost:1337/graphql';

import authModel from './auth';

let dbModel = {
    callDatabase: async (query) => {
        console.log(token);
        let res = await axios({
            method: 'post',
            url: dbURL,
            data: {
                query: query
            },
            headers: {
                jwt: token
            }
        });

        return res.data.data;
    },
    getCities: async () => {
        let query = `{
            cities {
                id,
                name,
                startingfee,
                penaltyfee,
                fee,
                discount,
                bikes {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord,
                    cityid
                }
            }
        }`;

        let cities = await dbModel.callDatabase(query);

        return cities.cities;
    },
    getCity: async (id) => {
        let query = `{
            city (id: ${id}) {
                id,
                name,
                startingfee,
                penaltyfee,
                fee,
                discount,
                bikes {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord,
                    cityid
                }
            }
        }`;

        let city = await dbModel.callDatabase(query);

        return city.city;
    },
    getUser: async (email) => {
        let query = `{
            customer(email: "${email}") {
                id,
                firstname,
                lastname,
                email,
                balance
                paymentmethod
                historylogs {
                    id,
                    bikeid,
                    customerid,
                    starttime,
                    endtime,
                    startxcoord,
                    startycoord,
                    endxcoord,
                    endycoord,
                    payed,
                    cityid
                }
            }
        }`;

        let user = await dbModel.callDatabase(query);

        return user.customer;
    },
    addUser: async (data) => {
        let query = `mutation {
            addCustomer(
                email: "${data.email}",
                firstname: "${data.firstname}",
                lastname: "${data.lastname}",
                balance: 0,
                paymentmethod: "Direct"
            ) {
                id,
                firstname,
                lastname,
                email,
                balance,
                paymentmethod
            }
        }`;

        let user = await dbModel.callDatabase(query);

        return user.addCustomer;
    },
    updateUser: async (data) => {
        let query = `mutation {
            updateCustomer(
                email: "${data.email || authModel.currentUser.email}",
                firstname: "${data.firstname || authModel.currentUser.firstname}",
                lastname: "${data.lastname || authModel.currentUser.lastname}",
                balance: ${data.balance || authModel.currentUser.balance},
                columnToMatch: "email",
                valueToMatch: "${data.email || authModel.currentUser.email}"
            ) {
                id,
                firstname,
                lastname,
                email,
                balance
            }
        }`;

        let user = await dbModel.callDatabase(query);

        return user.updateCustomer;
    },
    getBikes: async () => {
        let query = `{
            bikes {
                id
                available
                velocity
                battery
                xcoord
                ycoord
            }
        }`;

        let bikes = await dbModel.callDatabase(query);

        return bikes.bikes;
    },
    getBike: async (id) => {
        let query =  `{
            bike (id: ${id}) {
                id,
                available,
                velocity,
                battery,
                xcoord,
                ycoord,
                cityid
            }
        }`;

        let bike = await dbModel.callDatabase(query);

        return bike.bike;
    },
    updateBike: async (data) => {
        let query = `mutation {
            updateBike (
                available: ${data.status},
                columnToMatch: "id",
                valueToMatch: "${data.id}"
            ) {
                id,
                available,
                velocity,
                battery,
                xcoord,
                ycoord
            }
        }`;

        let bike = await dbModel.callDatabase(query);

        return bike.updateBike;
    },
    addLogEntry: async (data) => {
        let query =  `mutation {
            addHistory (
                bikeid: ${ data.scooterId },
                customerid: ${ data.userId },
                startxcoord: ${ data.xcoord },
                startycoord: ${ data.ycoord },
                cityid: ${ data.city }
            ) {
                id,
                bikeid,
                customerid,
                starttime,
                endtime,
                startxcoord,
                startycoord,
                endxcoord,
                endycoord,
                startparking,
                endparking,
                payed,
                cityid
                bike {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
                customer {
                    id,
                    firstname,
                    lastname,
                    email,
                    balance,
                    paymentmethod
                }
            }
        }`;

        let logEntery = await dbModel.callDatabase(query);

        return logEntery.addHistory;
    },
    updateLogPositionAndPayed: async (data) => {
        let query = `mutation {
            updateHistory (
                endxcoord: ${data.xcoord},
                endycoord: ${data.ycoord},
                payed: ${data.payed},
                columnToMatch: "id",
                valueToMatch: "${data.id}"
            ) {
                id,
                bikeid,
                customerid,
                starttime,
                endtime,
                startxcoord,
                startycoord,
                endxcoord,
                endycoord,
                payed,
                cityid,
                startparking,
                endparking,
                bike {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
                customer {
                    id,
                    firstname,
                    lastname,
                    email,
                    balance,
                    paymentmethod
                }
            }
        }`;

        let log = await dbModel.callDatabase(query);

        return log.updateHistory;
    },
    updateLogPosition: async (data) => {
        let query = `mutation {
            updateHistory (
                endxcoord: ${data.xcoord},
                endycoord: ${data.ycoord},
                columnToMatch: "id",
                valueToMatch: "${data.id}"
            ) {
                id,
                bikeid,
                customerid,
                starttime,
                endtime,
                startxcoord,
                startycoord,
                endxcoord,
                endycoord,
                payed,
                cityid,
                startparking,
                endparking,
                bike {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
                customer {
                    id,
                    firstname,
                    lastname,
                    email,
                    balance,
                    paymentmethod
                }
            }
        }`;

        let log = await dbModel.callDatabase(query);

        return log.updateHistory;
    },
    updateLogPayed: async (data) => {
        let query = `mutation {
            updateHistory (
                payed: ${data.payed},
                columnToMatch: "id",
                valueToMatch: "${data.id}"
            ) {
                id,
                bikeid,
                customerid,
                starttime,
                endtime,
                startxcoord,
                startycoord,
                endxcoord,
                endycoord,
                payed,
                cityid,
                startparking,
                endparking,
                bike {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
                customer {
                    id,
                    firstname,
                    lastname,
                    email,
                    balance,
                    paymentmethod
                }
            }
        }`;

        let log = await dbModel.callDatabase(query);

        return log.updateHistory;
    },
    getParkings: async () => {
        let query = `{
            parkingspaces {
                id,
                xcoord,
                ycoord,
                name,
                cityid,
                hascharger,
                city {
                    id,
                    name,
                    startingfee,
                    penaltyfee,
                    fee,
                    discount
                }
                bikes {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
            }
        }`;

        let parking = await dbModel.callDatabase(query);

        return parking.parkingspaces;
    }
};

export default dbModel;
