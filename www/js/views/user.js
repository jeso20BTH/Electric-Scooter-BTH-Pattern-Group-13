"use strict";

import m from 'mithril';

import userModel from './../models/user';

let index = {
    view: function() {
        return [
            m('h1', 'Användare'),
            m('fieldset.flex.column.start.allign-center', [
                m('legend', 'Info'),
                m('p', `${userModel.currentUser.firstname} ${userModel.currentUser.lastname}`),
                m('p', userModel.currentUser.email),
                m('p', userModel.currentUser.phone),
            ]),
            m('fieldset.flex.column.start.allign-center', [
                m('legend', 'Betalning'),
                m('div.flex.row.start', [
                    m('p', `Balans: ${userModel.currentUser.credits} SEK`),
                    m('a.button', {href: '#!/bank/transfer'}, 'Fyll på')
                ]),
                m('div.flex.row.start', [
                    m('p', 'Betalningmetod: Direkt'),
                    m('button', 'Ärdra')
                ])
            ])
        ]
    }
};

export default index;
