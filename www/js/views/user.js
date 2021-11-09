"use strict";

import m from 'mithril';

import authModel from './../models/auth';

let user = {
    view: () => {
        return [
            m('h1', authModel.currentUser.name),
            m('p', `Krediter: ${authModel.currentUser.credits} SEK`)
        ]
    }
}

export default user;
