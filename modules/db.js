/* global process */
const authModel = require('./auth.js')
const axios = require('axios')

let config

try {
  config = require('./config.json')
} catch (e) {
  console.log(e)
}
const token = process.env.DBTOKEN || config.dbToken
const dbURL = process.env.dbURL || config.localhost

const dbModel = {
  callDatabase: async (query) => {
    const res = await axios({
      method: 'post',
      url: dbURL,
      data: {
        query: query
      },
      headers: {
        jwt: token
      }
    })

    return res.data.data
  },
  getCities: async () => {
    const query = `{
            cities {
                id,
                name,
                startingfee,
                penaltyfee,
                fee,
                discount,
                bikes {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord,
                    cityid
                }
            }
        }`

    const cities = await dbModel.callDatabase(query)

    return cities.cities
  },
  getCity: async (id) => {
    const query = `{
            city (id: ${id}) {
                id,
                name,
                startingfee,
                penaltyfee,
                fee,
                discount,
                bikes {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord,
                    cityid
                }
            }
        }`

    const city = await dbModel.callDatabase(query)

    return city.city
  },
  getUser: async (email) => {
    const query = `{
            customer(email: "${email}") {
                id,
                firstname,
                lastname,
                email,
                balance
                paymentmethod
                historylogs {
                    id,
                    bikeid,
                    customerid,
                    starttime,
                    endtime,
                    startxcoord,
                    startycoord,
                    endxcoord,
                    endycoord,
                    payed,
                    cityid
                }
            }
        }`

    const user = await dbModel.callDatabase(query)

    return user.customer
  },
  addUser: async (data) => {
    const query = `mutation {
            addCustomer(
                email: "${data.email}",
                firstname: "${data.firstname}",
                lastname: "${data.lastname}",
                balance: 0,
                paymentmethod: "Direct"
            ) {
                id,
                firstname,
                lastname,
                email,
                balance,
                paymentmethod
            }
        }`

    const user = await dbModel.callDatabase(query)

    return user.addCustomer
  },
  updateUser: async (data) => {
    const query = `mutation {
            updateCustomer(
                email: "${data.email || authModel.currentUser.email}",
                firstname: "${data.firstname || authModel.currentUser.firstname}",
                lastname: "${data.lastname || authModel.currentUser.lastname}",
                balance: ${data.balance || authModel.currentUser.balance},
                columnToMatch: "email",
                valueToMatch: "${data.email || authModel.currentUser.email}"
            ) {
                id,
                firstname,
                lastname,
                email,
                balance
            }
        }`

    const user = await dbModel.callDatabase(query)

    return user.updateCustomer
  },
  getBikes: async () => {
    const query = `{
            bikes {
                id
                available
                velocity
                battery
                xcoord
                ycoord
            }
        }`

    const bikes = await dbModel.callDatabase(query)

    return bikes.bikes
  },
  getBike: async (id) => {
    const query = `{
            bike (id: ${id}) {
                id,
                available,
                velocity,
                battery,
                xcoord,
                ycoord,
                cityid
            }
        }`

    const bike = await dbModel.callDatabase(query)

    return bike.bike
  },
  updateBike: async (data) => {
    const query = `mutation {
            updateBike (
                available: ${data.status},
                columnToMatch: "id",
                valueToMatch: "${data.id}"
            ) {
                id,
                available,
                velocity,
                battery,
                xcoord,
                ycoord
            }
        }`

    const bike = await dbModel.callDatabase(query)

    return bike.updateBike
  },
  addLogEntry: async (data) => {
    const query = `mutation {
            addHistory (
                bikeid: ${data.scooterId},
                customerid: ${data.userId},
                startxcoord: ${data.xcoord},
                startycoord: ${data.ycoord},
                cityid: ${data.city}
            ) {
                id,
                bikeid,
                customerid,
                starttime,
                endtime,
                startxcoord,
                startycoord,
                endxcoord,
                endycoord,
                startparking,
                endparking,
                payed,
                cityid
                bike {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
                customer {
                    id,
                    firstname,
                    lastname,
                    email,
                    balance,
                    paymentmethod
                }
            }
        }`

    const logEntery = await dbModel.callDatabase(query)

    return logEntery.addHistory
  },
  updateLogPositionAndPayed: async (data) => {
    const query = `mutation {
            updateHistory (
                endxcoord: ${data.xcoord},
                endycoord: ${data.ycoord},
                payed: ${data.payed},
                columnToMatch: "id",
                valueToMatch: "${data.id}"
            ) {
                id,
                bikeid,
                customerid,
                starttime,
                endtime,
                startxcoord,
                startycoord,
                endxcoord,
                endycoord,
                payed,
                cityid,
                startparking,
                endparking,
                bike {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
                customer {
                    id,
                    firstname,
                    lastname,
                    email,
                    balance,
                    paymentmethod
                }
            }
        }`

    const log = await dbModel.callDatabase(query)

    return log.updateHistory
  },
  updateLogPosition: async (data) => {
    const query = `mutation {
            updateHistory (
                endxcoord: ${data.xcoord},
                endycoord: ${data.ycoord},
                columnToMatch: "id",
                valueToMatch: "${data.id}"
            ) {
                id,
                bikeid,
                customerid,
                starttime,
                endtime,
                startxcoord,
                startycoord,
                endxcoord,
                endycoord,
                payed,
                cityid,
                startparking,
                endparking,
                bike {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
                customer {
                    id,
                    firstname,
                    lastname,
                    email,
                    balance,
                    paymentmethod
                }
            }
        }`

    const log = await dbModel.callDatabase(query)

    return log.updateHistory
  },
  updateLogPayed: async (data) => {
    const query = `mutation {
            updateHistory (
                payed: ${data.payed},
                columnToMatch: "id",
                valueToMatch: "${data.id}"
            ) {
                id,
                bikeid,
                customerid,
                starttime,
                endtime,
                startxcoord,
                startycoord,
                endxcoord,
                endycoord,
                payed,
                cityid,
                startparking,
                endparking,
                bike {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
                customer {
                    id,
                    firstname,
                    lastname,
                    email,
                    balance,
                    paymentmethod
                }
            }
        }`

    const log = await dbModel.callDatabase(query)

    return log.updateHistory
  },
  getParkings: async () => {
    const query = `{
            parkingspaces {
                id,
                xcoord,
                ycoord,
                name,
                cityid,
                hascharger,
                city {
                    id,
                    name,
                    startingfee,
                    penaltyfee,
                    fee,
                    discount
                }
                bikes {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                },
            }
        }`

    const parking = await dbModel.callDatabase(query)

    return parking.parkingspaces
  }
}

module.exports = dbModel
