'use strict'

import m from 'mithril'

import dbModel from './../models/db'
import userModel from './../models/user'
import cityModel from './../models/city'
import utilitiesModel from './../models/utilities'

const historyTable = {
  view: () => {
    return [
      m('table.table', [
        m('thead',
          m('tr',
            m('td', 'Datum'),
            m('td', 'Restid'),
            m('td', 'Kostnad'),
            m('td', 'Betald')
          )
        ),
        m('tbody', [
          userModel.currentUser.historylogs.forEach((history) => {
            console.log(history)
            const city = cityModel.getCity(history.cityid)
            const duration = utilitiesModel.calculateDuration(
              history.starttime,
              history.endtime
            )
            console.log(city)
            const price = utilitiesModel.calculatePrice({
              startingfee: city.startingfee,
              fee: city.fee,
              discount: city.discount,
              penaltyfee: city.penaltyfee,
              startTime: history.starttime,
              endTime: history.endtime,
              startPosition: history.startparking,
              endPosition: history.endparking
            })

            const date = utilitiesModel.formatDate(
              new Date(parseInt(history.starttime))
            )

            console.log(city, duration, price)

            if (history.endtime) {
              return m('tr', [
                m('td',
                  m('a', { href: `#!/history/ride/${history.id}` }, date)
                ),
                m('td', duration),
                m('td', `${price || 0} SEK`),
                m('td',
                  (history.payed)
                    ? m('i.material-icons', 'check')
                    : m('i.material-icons', 'clear')
                )
              ])
            }
          })
        ])
      ])
    ]
  }
}

const invoiceTable = {
  view: () => {
    userModel.filteredHistory = userModel.filterLog(userModel.currentUser.historylogs)
    const logKeys = Object.keys(userModel.filteredHistory)
    console.log(logKeys)
    return [
      m('table.table', [
        m('thead',
          m('tr',
            m('td', 'Månad'),
            m('th', 'Förfallodag'),
            m('td', 'Kostnad'),
            m('td', '')
          )
        ),
        m('tbody', [
          logKeys.map((key) => {
            let total = 0
            let expDate = ''
            userModel.filteredHistory[key].forEach((entry) => {
              total += entry.price

              if (!expDate) {
                expDate = entry.expDate
              }
            })

            return m('tr', [
              m('td',
                m('a', { href: `#!/invoice/${key}` }, key)
              ),
              m('td', expDate),
              m('td', `${total} SEK`),
              m('td',
                m('a', { href: `#!/bank/pay/${key}` }, 'Betala')
              )
            ])
          })
        ])
      ])
    ]
  }
}

const history = {
  oninit: async () => {
    cityModel.allCities = await dbModel.getCities()
    userModel.currentUser = await dbModel.getUser(userModel.currentUser.email)
  },
  view: function () {
    console.log(userModel.currentUser)
    return [
      m('div.flex.between', [
        m('h1', (userModel.historyMode === 'history') ? 'Historik' : 'Fakturor'),
        m('button', {
          onclick: userModel.changeHistoryMode
        }, (userModel.historyMode === 'history') ? 'Fakturor' : 'Historik')
      ]),
      (userModel.historyMode === 'history') ? m(historyTable) : m(invoiceTable)
    ]
  }
}

export default history
