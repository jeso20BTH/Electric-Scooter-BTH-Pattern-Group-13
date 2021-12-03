"use strict";

import m from 'mithril';

import bankModel from './../models/bank';

let bankAccount = {
    view: function() {
        return [
            m('h1', 'Konton'),
            m('table.bank-table', [
                m('thead', m('tr', [
                    m('td', 'Kontonummer'),
                    m('td', 'Namn'),
                    m('td', 'Saldo')
                ])),
                m('tbody', [
                    bankModel.accounts.map((account) => {
                        return m('tr', [
                            m('td', `${account.clearing} - ${account.account}`),
                            m('td', account.name),
                            m('td', `${account.amount} SEK`)
                        ])
                    })
                ])
            ])
        ]
    }
};

export default bankAccount;
