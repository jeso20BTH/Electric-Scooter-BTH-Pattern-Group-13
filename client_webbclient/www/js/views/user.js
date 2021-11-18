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
                    m('div.flex.column.center', [
                        m('p.user-data', `Balans: ${userModel.currentUser.credits} SEK`),
                    ]),
                    m('a.button.user-data', {href: '#!/bank/transfer'}, 'Fyll på')
                ]),

                (userModel.changePayment) ?
                    m('div.flex.row', [
                        m('div.flex.column.center', [
                            m('p', 'Betalningsmetod:')
                        ]),
                        m('select.user-data', {onchange: (e) => {userModel.selectedPaymentMethod = e.target.value}}, [
                            m('option', {value: 'Direkt'}, 'Direkt'),
                            m('option', {value: 'Månad'}, 'Månad')
                        ]),
                        m('button.user-data', {onclick: userModel.changePaymentMethod}, 'Bekräfta')
                    ]):
                    m('div.flex.row.start', [
                        m('div.flex.column.center', [
                            m('p.user-data', `Betalningmetod: ${userModel.currentUser.paymentmethod}`),
                        ]),
                        m('button.user-data', {onclick: () => {userModel.changePayment = true}}, 'Ändra')
                    ])
            ])
        ]
    }
};

export default index;
