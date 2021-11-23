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
    allParkings: [],
    getAllScooters: async () => {
        scooterModel.allScooters = await dbModel.getBikes();
        m.redraw();
    },
    getAllParkings: async () => {
        scooterModel.allParkings = await dbModel.getParkings();
        m.redraw();
    },
    rent: async (e, scooterId=scooterModel.id) => {
        scooterModel.currentScooter = await dbModel.getBike(scooterId);

        if (scooterModel.currentScooter && scooterModel.currentScooter.available === 1) {
            let log = await dbModel.addLogEntry({
                scooterId: scooterModel.currentScooter.id,
                userId: authModel.currentUser.id,
                xcoord: scooterModel.currentScooter.xcoord,
                ycoord: scooterModel.currentScooter.ycoord,
                city: scooterModel.currentScooter.cityid
            });

            await dbModel.getUser(authModel.currentUser.email);

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

            if (user.balance >= totalPrice) {
                log = await dbModel.updateLogPayed({
                    id: scooterModel.currentLog.id,
                    payed: 1
                });

                await dbModel.updateUser({balance: authModel.currentUser.balance -= totalPrice});
            } else {
                log = await dbModel.updateLogPayed({
                    id: scooterModel.currentLog.id,
                    payed: 0
                });
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
    },
    handleScan: (err, text) => {
        let element = document.getElementsByClassName('blink');

        for (var i = 0; i < element.length; i++) {
            element[i].classList.remove('gone');
        }

        document.getElementsByTagName("BODY")[0].removeAttribute('style');
        document.getElementsByClassName('qr-buttons')[0].setAttribute('style', 'visibility: hidden;')

        window.QRScanner.disableLight();

        if (err) {
            console.log(err);
        } else {
            scooterModel.id = text;

            m.redraw();
        }
    }
}

export default scooterModel;
