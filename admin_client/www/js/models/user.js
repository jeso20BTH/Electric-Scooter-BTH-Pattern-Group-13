import m from 'mithril'

// import dbModel from './db'

const axios = require('axios')

const userModel = {
  currentUser: {},
  authorized: false,
  getLoginData: async (id) => {
      console.log(id)
      console.log("test")

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
      const user = [data.email, data.login, data.html_url]

      userModel.currentUser = user

  }
}

export default userModel