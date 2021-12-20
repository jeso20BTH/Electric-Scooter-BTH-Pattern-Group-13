'use strict'

import m from 'mithril'

let config

try {
  config = require('./../config.json')
} catch (e) {
  console.log(e)
}

// const clientID = process.env.CLIENTID || config.clientID

const clientID = config.clientID


const login = {
  view: () => {
    return [
      m('h1', 'Logga in'),
      m('a.flex.row.start.allign-center.login-btn', {
        href: `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email&&redirect_uri=http://localhost:666/github/callback?callback=http://localhost:8040!/success/`
      }, [
        m('p', 'Logga in med github'),
        m('i.fab.fa-github')
      ])
    ]
  }
}

export default login