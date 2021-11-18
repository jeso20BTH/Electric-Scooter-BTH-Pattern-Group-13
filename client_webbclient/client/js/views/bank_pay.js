"use strict";

import m from 'mithril';

import bankModel from './../models/bank';
import utilitiesModel from './../models/utilities';
import userModel from './../models/user';

let bank = {
    view: function() {
        let invoiceId = m.route.param("id");
        let invoice = userModel.filteredHistory[invoiceId];
        let sumary = utilitiesModel.getSumary(invoice, invoiceId, userModel.currentUser.id);
        return [
            m('h1', 'Betalning'),
            m('fieldset.flex.column.start.transfer', [
                m('legend', 'Överföring'),
                m('fieldset.flex.row.between', [
                    m('legend', 'Nuvarande konto'),
                    m('select', { onchange: (e) => { bankModel.currentAccount = e.target.value; } }, [
                        bankModel.accounts.map((account, index) => {
                            if (account.amount >= sumary.price) {
                                return m('option', {
                                        value: index
                                    },
                                    `${account.clearing} - ${account.account} [ ${account.amount} SEK ]`
                                )
                            }
                        })
                    ])
                ]),
                (bankModel.errorMessage) ? m(bankModel.errorMessage) : '',
                m('fieldset.flex.row.between', [
                    m('legend', 'Betalgiro'),
                    m('input[readonly].input-readonly', {
                            type: 'text',
                            value: sumary.paymentAccount
                        }
                    ),
                ]),
                m('fieldset.flex.row.between', [
                    m('legend', 'OCR'),
                    m('input[readonly].input-readonly', {
                            type: 'text',
                            value: sumary.ocr
                        }
                    ),
                ]),
                m('fieldset.flex.row.between', [
                    m('legend', 'Belop'),
                    m('input[readonly].input-readonly', {
                            type: 'number',
                            value: sumary.price
                        }
                    ),
                ]),
                m('div.flex.row.center',
                    m('button.bank-button', { type: 'submit', onclick: async () => {await bankModel.pay(invoice)}}, 'Betala')
                )
            ])
        ]
    }
};

export default bank;
