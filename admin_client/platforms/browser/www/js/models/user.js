import 'regenerator-runtime/runtime'
import conf from './../config.json'
import axios from 'axios'

const userModel = {
  currentUser: {},
  authorized: false,
  getLoginData: async (id) => {
    const data = await axios({
      method: 'post',
      url: 'http://localhost:666/data',
      headers: {
        jwt: conf.dbToken
      },
      data: {
        id: id
      }
    })
    return data.data
  },
  login: async (id) => {
    const data = await userModel.getLoginData(id)
    const user = data.login
    userModel.currentUser = user
    userModel.authorized = true;
  }
}

export default userModel