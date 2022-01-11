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


var login = {
  view: () => {
    return [ m("main.start", [
      m('h1', 'Välkommen till Svenska Elsparkcyklar'),
      m('h2.admin', 'Administrativa sida'),
      m('p', 'Här får du överblick över alla städer, cyklar och kunder. Du har även möjlighet till att be servicepersonalen om att flytta cyklar till önskad parkering.'),
      m('p', 'För att komma åt Svenska Elsparkcyklars administrativa sida kan du logga in med github'),
      m('div.sign-in', [
        m('a', {
          href: `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email&&redirect_uri=http://localhost:666/github/callback?callback=http://localhost:8040!/success/`
        }, [  
          m('i.fab.fa-github'),
          m('span', 'Logga in med github'),
        ])
      ])
    ])
  ]

  }
}

export default login