import m from 'mithril'

// import dbModel from './db'

const axios = require('axios')

const kundModel = {
  currentKunder: {},
  getKundData: async (id) => {
    const data = await axios({
      url: "http://localhost:1337/graphql",
      method: "POST",
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
  }
}

export default kundModel