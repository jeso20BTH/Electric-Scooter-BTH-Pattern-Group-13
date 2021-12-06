import m from 'mithril'

import dbModel from './db'
import cityModel from './city'
import utilitiesModel from './utilities'
const axios = require('axios')

const userModel = {
  historyMode: 'history',
  currentUser: {},
  filteredHistory: {},
  authorized: false,
  changePayment: false,
  selectedPaymentMethod: 'Direct',
  changeHistoryMode: () => {
    userModel.historyMode = (userModel.historyMode === 'history') ? 'invoice' : 'history'
  },
  changePaymentMethod: async () => {
    await dbModel.updateUser({ paymentmethod: userModel.selectedPaymentMethod })
    userModel.currentUser = await dbModel.getUser(userModel.currentUser.email)

    userModel.changePayment = false
    userModel.selectedPaymentMethod = 'Direct'
    m.redraw()
  },
  getLoginData: async (id) => {
    const data = await axios({
      method: 'post',
      url: 'http://localhost:666/data',
      headers: {
        token: 'test'
      },
      data: {
        id: id
      }
    })

    return data.data
  },
  login: async (id) => {
    const data = await userModel.getLoginData(id)

    let user = await dbModel.getUser(data.email)

    if (!user) {
      await dbModel.addUser({
        email: data.email,
        firstname: data.name.split(' ')[0],
        lastname: data.name.split(' ')[1]
      })

      user = await dbModel.getUser(data.email)
    }

    userModel.currentUser = user
  },
  filterLog: (log) => {
    const filteredLog = {}

    log.forEach((entry) => {
      if (entry.payed === 0 && entry.endtime) {
        const city = cityModel.getCity(entry.cityid)
        const logYear = utilitiesModel.getYear(entry.endtime)
        const logMonth = utilitiesModel.getMonth(entry.endtime)
        const logDay = utilitiesModel.getDay(entry.endtime)
        const logId = `${logYear}-${logMonth}`
        const price = utilitiesModel.calculatePrice({
          startingfee: city.startingfee,
          fee: city.fee,
          discount: city.discount,
          penaltyfee: city.penaltyfee,
          startTime: entry.starttime,
          endTime: entry.endtime,
          startPosition: entry.startparking,
          endPosition: entry.endparking
        })
        const duration = utilitiesModel.calculateDuration(entry.starttime, entry.endtime)
        const expDate = utilitiesModel.getExpDate(
          logYear, logMonth
        )

        const logEntry = {
          id: entry.id,
          year: logYear,
          month: logMonth,
          day: logDay,
          expDate: expDate,
          price: price,
          duration: duration,
          city: city.name
        }

        if (filteredLog[logId]) {
          filteredLog[logId].push(logEntry)
        } else {
          filteredLog[logId] = []
          filteredLog[logId].push(logEntry)
        }
      }
    })

    return filteredLog
  }
}

export default userModel
