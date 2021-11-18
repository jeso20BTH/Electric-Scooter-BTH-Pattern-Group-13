"use strict";

import m from 'mithril';

import bankModel from './../models/bank';

let bank = {
    view: function() {
        return [
            m('h1', 'Överföring'),
            m('p', `För varje överföring tillkommer en avgift på ${bankModel.transferPrice} SEK`),
            m('fieldset.flex.column.start.transfer', [
                m('legend', 'Överföring'),
                m('fieldset.flex.row.between', [
                    m('legend', 'Nuvarande konto'),
                    m('select', { onchange: (e) => { bankModel.currentAccount = e.target.value; } }, [
                        bankModel.accounts.map((account, index) => {
                            return m('option', {
                                    value: index
                                },
                                `${account.clearing} - ${account.account} [ ${account.amount} SEK ]`
                            )
                        })
                    ])
                ]),
                (bankModel.errorMessage) ? m(bankModel.errorMessage) : '',
                m('fieldset.flex.row.between', [
                    m('legend', 'Belop att överföra'),
                    m('input', {
                            type: 'number',
                            placeholder: 'Belop att överföra',
                            max: bankModel.accounts[bankModel.currentAccount].amount - bankModel.transferPrice,
                            oninput: (e)=>{bankModel.transferAmount = e.target.value;},
                            value: bankModel.transferAmount
                        }
                    ),
                ]),
                m('div.flex.row.center',
                    m('button.bank-button', { type: 'submit', onclick: bankModel.transfer}, 'Överför')
                )
            ])
        ]
    }
};

export default bank;
