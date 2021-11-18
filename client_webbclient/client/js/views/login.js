"use strict";

import m from 'mithril';

let config;

try {
    config = require('./../config.json');
} catch (e) {
    console.log(e);
}

const clientID = config.clientID;

let login = {
    view: () => {
        return [
            m('h1', 'Logga in'),
            m('a', {
                href: `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email&&redirect_uri=http://localhost:666/github/callback?callback=userclient`
            }, 'Logga in med github')
        ]
    }
}

export default login;
