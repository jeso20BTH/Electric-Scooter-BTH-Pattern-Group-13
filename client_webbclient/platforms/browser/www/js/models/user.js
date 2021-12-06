import m from 'mithril';
const axios = require('axios');

let dbURL = 'http://localhost:1337/graphql';

import dbModel from './db';
import cityModel from './city';
import utilitiesModel from './utilities';

let userModel = {
    historyMode: 'history',
    currentUser: {},
    filteredHistory: {},
    authorized: false,
    changePayment:false,
    selectedPaymentMethod: 'Direct',
    changeHistoryMode: () => {
        userModel.historyMode = (userModel.historyMode === 'history') ? 'invoice' : 'history';
    },
    changePaymentMethod: async (e) => {
        let user = await dbModel.updateUser({paymentmethod: userModel.selectedPaymentMethod});
        userModel.currentUser = await dbModel.getUser(userModel.currentUser.email);

        userModel.changePayment = false;
        userModel.selectedPaymentMethod = 'Direct';
        m.redraw();
    },
    login: async (id) => {
        console.log('get data');
        let data = await axios({
            method: 'post',
            url: 'http://localhost:666/data',
            headers: {
                token: 'test'
            },
            data: {
                id: id
            },
        });

        data = data.data;

        console.log(data.email);

        let user = await dbModel.getUser(data.email);

        console.log(user);

        console.log('user');

        if (!user) {
            console.log(data);
            await dbModel.addUser({
                email: data.email,
                firstname: data.name.split(' ')[0],
                lastname: data.name.split(' ')[1],
            });

            user = await dbModel.getUser(data.email);
        }

        userModel.currentUser = user;

        console.log(userModel.currentUser);
    },
    filterLog: (log) => {
        let filteredLog = {};

        log.map((entry) => {
            if (entry.payed === 0 && entry.endtime) {
                let city = cityModel.getCity(entry.cityid);
                let logYear = utilitiesModel.getYear(entry.endtime);
                let logMonth = utilitiesModel.getMonth(entry.endtime);
                let logDay = utilitiesModel.getDay(entry.endtime);
                console.log(logDay);
                let logId = `${logYear}-${logMonth}`;
                let price = utilitiesModel.calculatePrice({
                    startingfee: city.startingfee,
                    fee: city.fee,
                    discount: city.discount,
                    penaltyfee: city.penaltyfee,
                    startTime: entry.starttime,
                    endTime: entry.endtime,
                    startPosition: entry.startparking,
                    endPosition: entry.endparking
                });
                let duration = utilitiesModel.calculateDuration(entry.starttime, entry.endtime);
                let expDate = utilitiesModel.getExpDate(
                    logYear, logMonth
                );

                let logEntry = {
                    id: entry.id,
                    year: logYear,
                    month: logMonth,
                    day: logDay,
                    expDate: expDate,
                    price: price,
                    duration: duration,
                    city: city.name
                }

                if (filteredLog[logId]) {
                    filteredLog[logId].push(logEntry);
                } else {
                    filteredLog[logId] = [];
                    filteredLog[logId].push(logEntry);
                }
            }
        })

        console.log(filteredLog);

        return filteredLog;
    },
}

export default userModel;
