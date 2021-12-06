import m from 'mithril'

import userModel from './user'
import dbModel from './db'

const bankModel = {
  paymentMethods: [
    { value: 'Direct', text: 'Direkt' },
    { value: 'Monthly', text: 'Månad' }
  ],
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
  transfer: async () => {
    const transferSum = parseInt(bankModel.transferAmount) + bankModel.transferPrice

    userModel.currentUser = await dbModel.getUser(userModel.currentUser.email)

    let balance = userModel.currentUser.balance

    if (
      transferSum <= bankModel.accounts[bankModel.currentAccount].amount &&
            parseInt(bankModel.transferAmount) > 0
    ) {
      bankModel.accounts[bankModel.currentAccount].amount -= transferSum
      await dbModel.updateUser({ balance: balance += parseInt(bankModel.transferAmount) })
      userModel.currentUser = await dbModel.getUser(userModel.currentUser.email)

      bankModel.transferAmount = ''

      m.route.set('/bank/proccessing')

      setTimeout(() => {
        m.route.set('/user')
      }, 2000)
    } else {
      bankModel.accounts[bankModel.currentAccount].amount -= bankModel.transferPrice

      if (bankModel.accounts[bankModel.currentAccount].amount < 0) {
        bankModel.accounts[bankModel.currentAccount].amount = 0
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
                                        )
                                            ? 0
                                            : bankModel.accounts[bankModel.currentAccount].amount -
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
                m('p', ' Överföring måste vara större än 0!'),
                m('p', 'Vi drar ändå vår avgift för att du slösar vår tid.')
              ])
            ]
          }
        }
      }

      setTimeout(() => {
        bankModel.errorMessage = null
      }, 5000)
    }
  },
  pay: async (invoice) => {
    let totalPrice = 0
    await invoice.map(async (trip) => {
      totalPrice += trip.price

      await dbModel.updateLogPayed({
        id: trip.id,
        payed: 1
      })
    })

    bankModel.accounts[bankModel.currentAccount].amount -= totalPrice

    m.route.set('/bank/proccessing')

    setTimeout(() => {
      m.route.set('/history')
    }, 2000)
  }
}

export default bankModel
