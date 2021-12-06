'use strict'

import m from 'mithril'
import L from 'leaflet'

import userModel from './../models/user'
import cityModel from './../models/city'
import utilitiesModel from './../models/utilities'

import 'leaflet/dist/leaflet.css'

import startIconImage from '../../img/scooter.png'
import endIconImage from '../../img/end.png'

let map

const startIcon = L.icon({
  iconUrl: startIconImage,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, 0] // Width and height of the icon
})

const endIcon = L.icon({
  iconUrl: endIconImage,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, 0] // Width and height of the icon
})

function showMap () {
  const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
  })

  map = L.map('map', {
    center: [0, 0],
    zoom: 15,
    layers: [baseLayer]
  })

  addTrip(
    ride.startPos,
    ride.endPos
  )

  console.log(map)
}

function addTrip (startPos, endPos) {
  const center = utilitiesModel.calculateCenter(startPos, endPos)

  console.log(center)
  console.log(map)
  if (map) {
    map.panTo(
      new L.LatLng(center[0], center[1])
    )

    const start = L.marker(
      startPos,
      { icon: startIcon }
    )

    const end = L.marker(
      endPos,
      { icon: endIcon }
    )

    start.addTo(map).bindPopup('Start')
    end.addTo(map).bindPopup('End')

    const latlngs = []

    // Get latlng from first marker
    latlngs.push(start.getLatLng())

    // Get latlng from first marker
    latlngs.push(end.getLatLng())

    // You can just keep adding markers

    // From documentation http://leafletjs.com/reference.html#polyline
    // create a red polyline from an arrays of LatLng points
    const polyline = L.polyline(latlngs, { color: 'red' }).addTo(map)

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds())
  }
}

const ride = {
  startPos: null,
  endPos: null,
  oninit: () => {
    const rideId = m.route.param('id')
    const log = userModel.currentUser.historylogs.find(entry => entry.id === parseInt(rideId))

    ride.startPos = [
      log.startxcoord,
      log.startycoord
    ]

    // ride.endPos = [
    //     log.endxcoord,
    //     log.endycoord
    // ];
    ride.endPos = [56.1613, 15.5871391]
  },
  oncreate: showMap,
  view: () => {
    const rideId = m.route.param('id')
    const log = userModel.currentUser.historylogs.find(entry => entry.id === parseInt(rideId))

    console.log(log)

    const city = cityModel.getCity(log.cityid)
    const duration = utilitiesModel.calculateDuration(
      log.starttime,
      log.endtime
    )

    const price = utilitiesModel.calculatePrice({
      startingfee: city.startingfee,
      fee: city.fee,
      discount: city.discount,
      penaltyfee: city.penaltyfee,
      startTime: log.starttime,
      endTime: log.endtime,
      startPosition: log.startparking,
      endPosition: log.endparking
    })

    const date = utilitiesModel.formatDate(
      new Date(parseInt(log.starttime))
    )

    console.log(log)
    return [
      m('a.return', { href: '#!/history' }, '< Tillbaka'),
      m('h1', `Resa ${log.id}`),
      m('div#map.map', ''),
      m('fieldset.flex.row.between', [
        m('legend', 'Reseinformation'),
        m('div.flex.column.start.allign-center.ride-info', [
          m('p', `Starttid: ${date}`),
          m('p', `Resetid:    ${duration}`),
          m('p', `Hämtad från parkering?: ${(log.startparking === 'unparked') ? 'Nej' : 'Ja'}`),
          m('p', `Lämnad på parkering?: ${(log.endparking === 'unparked') ? 'Nej' : 'Ja'}`)
        ]),
        m('div.flex.column.start.allign-center.ride-info', [
          m('p', `Startavgift: ${city.startingfee} SEK`),
          m('p', `Minutpris: ${city.fee} SEK`),
          m('p', `Straffavgift: ${(log.endparking === 'unparked') ? city.penaltyfee : '0'} SEK*`),
          m('p', `Avdrag: ${(log.startparking === 'unparked' && log.endparking === 'parked') ? city.discount * -1 : '0'} SEK**`),
          m('p', `Totalt: ${price} SEK`)
        ])
      ]),
      m('p', '*  Tillkommer om cykel inte lämnas på parkeringsplats'),
      m('p', '** Dras av ifall oparkerad cykel lämnas på parkeringsplats')
    ]
  }
}

export default ride
