'use strict'

import m from 'mithril'

import positionModel from './../models/position'
const authModel = require('./../models/auth')

const user = {
  oninit: async () => {
    await positionModel.getCities()
  },
  view: () => {
    const currentCity = positionModel.allCities.find(city => city.id === positionModel.currentCity)
    return [
      m('h1', `${authModel.currentUser.firstname} ${authModel.currentUser.lastname}`),
      m('p', authModel.currentUser.email),
      m('p.credits', `Krediter: ${authModel.currentUser.balance} SEK`),
      m('div.flex.row.between.city-nav', [
        positionModel.allCities.map((city) => {
          let element = 'p.city-nav-element'
          element += `#city-${city.id}`
          element += (positionModel.currentCity === city.id) ? '.selected-city' : ''

          return m(element, {
            onclick: (e) => {
              const cityId = parseInt(e.target.id.split('-')[1])

              positionModel.currentCity = cityId
            }
          },
          city.name)
        })
      ]),
      (currentCity)
        ? m('div', [
          m('h3', `Här hittar du prisinformation för ${currentCity.name}`),
          m('div. flex.row.between', [
            m('p', 'Startavgift'),
            m('p.price', `${currentCity.startingfee} SEK`)
          ]),
          m('div. flex.row.between', [
            m('p', 'Minuttaxa'),
            m('p.price', `${currentCity.fee} SEK`)
          ]),
          m('div. flex.row.between', [
            m('p', 'Straffavgift*'),
            m('p.price', `${currentCity.penaltyfee} SEK`)
          ]),
          m('div. flex.row.between', [
            m('p', 'Avdrag**'),
            m('p.price', `${currentCity.discount} SEK`)
          ]),
          m('p.fine-line', '* En avgift tillkommer om cykel ej ställs på parkering.'),
          m('p.fine-line', '** En summa dras av om man tar oparkerad cykel till parkering.')
        ])
        : ''

    ]
  }
}

export default user
