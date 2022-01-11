import 'regenerator-runtime/runtime'
// import dbModel from './db'

const axios = require('axios')
import conf from './../config.json'


const kundModel = {
  currentKunder: {},
  allaKunder: {},
  getKundData: async (id) => {
    const data = await axios({
      url: "http://localhost:1337/graphql",
      method: "POST",
      headers: {
        jwt: conf.dbToken
      },
      data: ({
          query: `
          query { 
            customer(id: ${id} ) {
              id,
              firstname,
              lastname,
              email,
              balance,
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
                cityid,
                startparking,
                endparking
              }
          }
        }
          `
      })
    })
    return data.data
  },
  getKund: async (id) => {
    const data = await kundModel.getKundData(id)
    kundModel.currentKunder = data.data.customer
    return;
  },
  getAllaKund: async () => {
    const data = await kundModel.getAllCustomers()
    kundModel.allaKunder = data.data.customers
    return;
  },
  getAllCustomers: async () => {
    const data = await axios({
      url: "http://localhost:1337/graphql",
      method: "POST",
      headers: {
        jwt: conf.dbToken
      },
      data: ({
          query: `
          query { 
            customers {
                id,
                firstname,
                lastname,
                email,
                balance,
                paymentmethod,
            }
        }
        `
      })
    })
      return data.data;
  },
}

export default kundModel
