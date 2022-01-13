'use strict'

import m from 'mithril'

import dbModel from './../models/db'
import cityModel from './../models/city'
import userModel from './../models/user'

const index = {
  oninit: async () => {
    cityModel.allCities = await dbModel.getCities()
    if (userModel.currentUser) {
      userModel.currentUser = await dbModel.getUser(userModel.currentUser.email)
    }
  },
  view: function () {
    return [
      m('h1', 'Välkommen'),
      m('p', 'Vi på Svenska Elsparkscyklar AB, erbjuder dig en modern upplevelse gällande uthyrning av cyklar.'),
      m('p', 'Vi finns i nuläget i tre städer med vision att udvidga oss.')
    ]
  }
}

export default index
