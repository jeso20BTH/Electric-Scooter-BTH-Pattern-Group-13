const axios = require('axios');
import m from 'mithril';


let dbURL = 'http://localhost:1337/graphql';

import authModel from './auth';

let dbModel = {
    callDatabase: async (query) => {
        let res = await axios({
            method: 'post',
            url: dbURL,
            data: {
                query: query
            }
        });

        return res.data.data;
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
        }`
    },
    updateUser: async (data) => {
        let query = `mutation {
            updateCustomer(
                email: "${data.email || authModel.currentUser.email}",
                firstname: "${data.firstname || authModel.currentUser.fisrtname}",
                lastname: "${data.lastname || authModel.currentUser.lastname}",
                balance: ${data.balance || authModel.currentUser.balance},
                columnToMatch: "email",
                valueToMatch: "${authModel.currentUser.email}"
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
        return [
            {
                id: '1',
                status: 'free',
                long: '',
                lat: '',
                battery: 1,
                speed: 0,
            },
            {
                id: '2',
                status: 'rented',
                long: '',
                lat: '',
                battery: 0.6,
                speed: 12,
            },
            {
                id: '3',
                status: 'service',
                long: '',
                lat: '',
                battery: 0.1,
                speed: 0,
            }
        ]
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

        console.log(query);

        let bike = await dbModel.callDatabase(query);

        console.log(bike);

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
    }
};

export default dbModel;
