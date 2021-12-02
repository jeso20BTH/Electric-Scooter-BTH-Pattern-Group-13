"use strict";

import m from 'mithril';

let config;

try {
    config = require('./../models/config.json');
} catch (e) {
    console.log(e);
}

const clientID = process.env.CLIENTID || config.clientID;

import authModel from './../models/auth';

let login = {
    view: () => {
        return [
            m('div.flex.column.center.login-div',
                m('h1', 'Logga in'),
                m('a.display.flex.row.center.allign-center', {
                        href: `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email&&redirect_uri=http://localhost:666/github/callback?callback=http://localhost:8000!/success/`
                        // href: '#!success/1'
                    }, [
                        m('p', 'Logga in med github'),
                        m('i.fab.fa-github')
                    ]
                )
            )
        ]
    }
}

export default login;
