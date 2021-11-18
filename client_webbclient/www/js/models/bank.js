import m from 'mithril';

import userModel from './user';

let bankModel = {
    accounts: [
        {
            name: 'Lönekonto',
            clearing: '6896',
            account: '186 159 123',
            amount: 5687
        },
        {
            name: 'Buffertkonto',
            clearing: '6895',
            account: '186 669 333',
            amount: 28963
        },
        {
            name: 'ISK',
            clearing: '6897',
            account: '133 713 370',
            amount: 666
        }
    ],
    transferPrice: 600,
    transferAmount: '',
    currentAmount: null,
    currentAccount: 0,
    errorMessage: null,
    transfer: () => {
        let transferSum = parseInt(bankModel.transferAmount) + bankModel.transferPrice;

        console.log(parseInt(bankModel.transferAmount));
        if (
            transferSum <= bankModel.accounts[bankModel.currentAccount].amount &&
            parseInt(bankModel.transferAmount) > 0
        ) {
            bankModel.accounts[bankModel.currentAccount].amount -= transferSum;
            userModel.currentUser.credits += parseInt(bankModel.transferAmount);

            console.log(bankModel.accounts);

            bankModel.transferAmount = '';

            m.route.set('/bank/proccessing');

            setTimeout(() => {
                m.route.set('/user');
            }, 2000)
        } else {
            console.log(bankModel.accounts[bankModel.currentAccount].amount - bankModel.transferPrice);
            bankModel.accounts[bankModel.currentAccount].amount -= bankModel.transferPrice;

            if (bankModel.accounts[bankModel.currentAccount].amount < 0) {
                console.log(bankModel.accounts[bankModel.currentAccount].amount);
                bankModel.accounts[bankModel.currentAccount].amount = 0;
            }

            bankModel.errorMessage = {
                view: () => {
                    if (transferSum > bankModel.accounts[bankModel.currentAccount].amount) {
                        return [
                            m('fieldset.bank-error-message-div', [
                                m('legend', 'Error!'),
                                m('p', 'För stor överföring!'),
                                m('p', `
                                    Högsta tillåtna överföring är
                                    ${
                                        (
                                            bankModel.accounts[bankModel.currentAccount].amount -
                                            bankModel.transferPrice < 0
                                        ) ?
                                            0 :
                                            bankModel.accounts[bankModel.currentAccount].amount -
                                            bankModel.transferPrice
                                    } SEK.
                                `),
                                m('p', 'Vi drar ändå vår avgift för att du slösar vår tid.')
                            ])
                        ]
                    } else {
                        return [
                            m('fieldset.bank-error-message-div', [
                                m('legend', 'Error!'),
                                m('p', 'För liten överföring!'),
                                m('p', ` Överföring måste vara större än 0!`),
                                m('p', 'Vi drar ändå vår avgift för att du slösar vår tid.')
                            ])
                        ]
                    }
                }
            };


            setTimeout(() => {
                bankModel.errorMessage = null;
            }, 5000)
        }

    }
}

export default bankModel;
