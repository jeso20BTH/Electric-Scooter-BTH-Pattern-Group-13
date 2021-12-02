import m from 'mithril';
const axios = require('axios');

import dbModel from './db';

const dbURL = 'http://localhost:1337/graphql'

var authModel = {
    authorized: false,
    currentUser: {},
    getLoginData: async (id) => {
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

        return data.data
    },
    login: async (id) => {
        let data = await authModel.getLoginData(id);

        let user = await dbModel.getUser(data.email);

        if (!user) {
            await dbModel.addUser({
                email: data.email,
                firstname: data.name.split(' ')[0],
                lastname: data.name.split(' ')[1]
            });

            user = await dbModel.getUser(data.email);
        }

        authModel.currentUser = user;
    }
}

export default authModel;
