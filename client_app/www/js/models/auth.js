import m from 'mithril';
const axios = require('axios');

import dbModel from './db';

const dbURL = 'http://localhost:1337/graphql'

var authModel = {
    authorized: false,
    currentUser: {},
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
        })

        data = data.data;
        console.log(data);
        console.log(data.name.split(' ')[0], data.name.split(' ')[1]);

        let user = await dbModel.getUser(data.email);

        console.log(user);
        if (!user) {
            console.log('not defined');

            await dbModel.addUser({
                email: data.email,
                firstname: data.name.split(' ')[0],
                lastname: data.name.split(' ')[1]
            });

            user = await dbModel.getUser(data.email);

            console.log(user);
        }

        authModel.currentUser = user;
    }
}

export default authModel;
