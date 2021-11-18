const axios = require('axios');
import m from 'mithril';


let dbURL = 'http://localhost:1337/graphql';

import authModel from './auth';
import dbModel from './db';
import utilitiesModel from './utilities';

var scooterModel = {
    id: '',
    currentLog: {},
    inRent: false,
    rentTime: null,
    currentScooter: {},
    allScooters: [],
    getAllScooters: async () => {
        scooterModel.allScooters = await dbModel.getBikes();
    },
    rent: async (e, scooterId=scooterModel.id) => {
        console.log(scooterId);
        scooterModel.currentScooter = await dbModel.getBike(scooterId);

        console.log(scooterModel.currentScooter);

        if (scooterModel.currentScooter && scooterModel.currentScooter.available === 1) {
            let log = await dbModel.addLogEntry({
                scooterId: scooterModel.currentScooter.id,
                userId: authModel.currentUser.id,
                xcoord: scooterModel.currentScooter.xcoord,
                ycoord: scooterModel.currentScooter.ycoord,
                city: scooterModel.currentScooter.cityid
            });

            await dbModel.getUser(authModel.currentUser.email);

            console.log(authModel.currentUser);

            scooterModel.currentLog = log;

            await dbModel.updateBike({
                id: scooterModel.currentScooter.id,
                status: 0
            });
            scooterModel.inRent = true;
            scooterModel.id = '';

            m.redraw();
        }
    },
    unrent: async () => {
        scooterModel.currentScooter = await dbModel.getBike(scooterModel.currentScooter.id);

        await dbModel.updateBike({
            id: scooterModel.currentScooter.id,
            status: 1
        });

        let user = await dbModel.getUser(authModel.currentUser.email);
        let log;

        if (user.paymentmethod === 'Direct') {
            log = await dbModel.updateLogPosition({
                id: scooterModel.currentLog.id,
                xcoord: scooterModel.currentScooter.xcoord,
                ycoord: scooterModel.currentScooter.ycoord
            });

            console.log(log);

            let city = await dbModel.getCity(1);
            let totalPrice = utilitiesModel.calculatePrice({
                startingfee: city.startingfee,
                fee: city.fee,
                discount: city.discount,
                penaltyfee: city.penaltyfee,
                startTime: log.starttime,
                endTime: log.endtime,
                startPosition: log.startparking,
                endPosition: log.endparking,
            });

            console.log(totalPrice);

            if (user.balance >= totalPrice) {
                log = await dbModel.updateLogPayed({
                    id: scooterModel.currentLog.id,
                    payed: 1
                });

                console.log(log);

                await dbModel.updateUser({balance: authModel.currentUser.balance -= totalPrice});
            } else {
                log = await dbModel.updateLogPayed({
                    id: scooterModel.currentLog.id,
                    payed: 0
                });

                console.log(log);
            }
        } else if (user.paymentmethod === 'Monthly') {
            log = await dbModel.updateLogPositionAndPayed({
                id: scooterModel.currentLog.id,
                xcoord: scooterModel.currentScooter.xcoord,
                ycoord: scooterModel.currentScooter.ycoord,
                payed: 0
            });
        }

        authModel.currentUser = await dbModel.getUser(authModel.currentUser.email);

        scooterModel.inRent = false;
        scooterModel.currentScooter = {};
        scooterModel.currentLog = {};
        scooterModel.rentTime = null;
    }
}

export default scooterModel;
