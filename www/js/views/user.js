"use strict";

import m from 'mithril';

import authModel from './../models/auth';

let user = {
    view: () => {
        return [
            m('h1', `${authModel.currentUser.firstname} ${authModel.currentUser.lastname}`),
            m('p', `Krediter: ${authModel.currentUser.balance} SEK`)
        ]
    }
}

export default user;
