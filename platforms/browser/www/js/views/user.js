"use strict";

import m from 'mithril';

import userModel from './../models/user';
import dbModel from './../models/db';
import bankModel from './../models/bank';
import cityModel from './../models/city';

let index = {
    oninit: async () => {
        userModel.currentUser = await dbModel.getUser(userModel.currentUser.email);
        cityModel.allCities = await dbModel.getCities();
    },
    view: function() {
        let paymentMethod = bankModel.paymentMethods.find(
            method => method.value === userModel.currentUser.paymentmethod
        );
        console.log(userModel.currentUser);
        return [
            m('h1', 'Användare'),
            m('fieldset.flex.column.start.allign-center', [
                m('legend', 'Info'),
                m('p', `${userModel.currentUser.firstname} ${userModel.currentUser.lastname}`),
                m('p', userModel.currentUser.email),
            ]),
            m('fieldset.flex.column.start.allign-center', [
                m('legend', 'Betalning'),
                m('div.flex.row.start', [
                    m('div.flex.column.center', [
                        m('p.user-data', `Balans: ${userModel.currentUser.balance} SEK`),
                    ]),
                    m('a.button.user-data', {href: '#!/bank/transfer'}, 'Fyll på')
                ]),

                (userModel.changePayment) ?
                    m('div.flex.row', [
                        m('div.flex.column.center', [
                            m('p', 'Betalningsmetod:')
                        ]),
                        m('select.user-data', {onchange: (e) => {userModel.selectedPaymentMethod = e.target.value}}, [
                            bankModel.paymentMethods.map((method) => {
                                return m('option', {value: method.value}, method.text)
                            })
                        ]),
                        m('button.user-data', {onclick: userModel.changePaymentMethod}, 'Bekräfta')
                    ]):
                    m('div.flex.row.start', [
                        m('div.flex.column.center', [
                            m('p.user-data', `Betalningmetod: ${paymentMethod.text}`),
                        ]),
                        m('button.user-data', {onclick: () => {userModel.changePayment = true}}, 'Ändra')
                    ])
            ])
        ]
    }
};

export default index;
