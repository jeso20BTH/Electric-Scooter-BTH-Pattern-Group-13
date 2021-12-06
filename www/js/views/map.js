'use strict'

import m from 'mithril'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'

import positionModel from './../models/position'
import scooterModel from './../models/scooter'
import utilitiesModel from './../models/utilities'

import currentIcon from '../../img/location_alt.png'
import scooterIconImage from '../../img/scooter.png'
import scooterShadowImage from '../../img/scooter_shadow.png'
import parkingIconImage from '../../img/parking.png'
import chargerIconImage from '../../img/chargespot.png'

let map

const locationIcon = L.icon({
  iconUrl: currentIcon,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, 0] // Width and height of the icon
})

const scooterIcon = L.icon({
  iconUrl: scooterIconImage,
  shadowUrl: scooterShadowImage,
  iconSize: [48, 48],
  shadowSize: [48, 48],
  iconAnchor: [24, 24],
  shadowAnchor: [24, 24],
  popupAnchor: [0, 0] // Width and height of the icon
})

const chargerIcon = L.icon({
  iconUrl: chargerIconImage,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, 0] // Width and height of the icon
})

const parkingIcon = L.icon({
  iconUrl: parkingIconImage,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, 0] // Width and height of the icon
})

function showMap () {
  const lat = (positionModel.currentPosition.latitude) ? positionModel.currentPosition.latitude : 0
  const long = (positionModel.currentPosition.longitude) ? positionModel.currentPosition.longitude : 0

  const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
  })

  map = L.map('map', {
    center: [lat, long],
    // center: [56.1613, 15.5871391],
    zoom: 18,
    layers: [baseLayer]
  })

  // let baseMap = {
  //     "Standard": baseLayer
  // };
  //
  // L.control.layers(baseMap).addTo(map);
}

function addBikes () {
  scooterModel.allScooters.forEach((scooter) => {
    if (scooter.available === 1) {
      const popupString = `
                <h2>Cykel ${scooter.id}</h2>
                <p>Batteri ${scooter.battery}%</p>
            `

      const selectedIcon = scooterIcon

      const marker = L.marker(
        [scooter.xcoord, scooter.ycoord],
        { icon: selectedIcon }
      )

      const batteryLevel = utilitiesModel.batteryPercentage(scooter.battery)

      marker.addTo(map).bindPopup(popupString)

      L.DomUtil.addClass(marker._icon, `bike-${batteryLevel}`)
    }
  })
}

function addParkings () {
  scooterModel.allParkings.forEach((parking) => {
    let popupString = `
            <h2>${parking.name}</h2>
        `

    if (parking.hascharger) {
      popupString += '<p>Laddstation</p>'

      L.marker(
        [parking.xcoord, parking.ycoord],
        { icon: chargerIcon }
      ).addTo(map).bindPopup(popupString)
    } else {
      popupString += '<p>Parkering</p>'

      L.marker(
        [parking.xcoord, parking.ycoord],
        { icon: parkingIcon }
      ).addTo(map).bindPopup(popupString)
    }
  })
}

function showPosition () {
  if (positionModel.currentPosition.latitude && positionModel.currentPosition.longitude) {
    if (mapView.counter <= 0) {
      map.panTo(
        new L.LatLng(positionModel.currentPosition.latitude, positionModel.currentPosition.longitude)
        // new L.LatLng(56.1613, 15.5871391)
      )
      mapView.counter++
    }
    L.marker(
      // [56.1613, 15.5871391],
      [positionModel.currentPosition.latitude, positionModel.currentPosition.longitude],
      { icon: locationIcon }
    ).addTo(map).bindPopup('<h2>Din plats<h2>')
  }
}

function goToCurrentPosition () {
  map.panTo(new L.LatLng(positionModel.currentPosition.latitude, positionModel.currentPosition.longitude))
  // map.panTo(new L.LatLng(56.1613, 15.5871391))
  mapView.counter++
}

const mapView = {
  counter: 0,
  oninit: async () => {
    await positionModel.getPosition()
    await scooterModel.getAllScooters()
    await scooterModel.getAllParkings()
  },
  oncreate: showMap,
  view: () => {
    showPosition()
    addBikes()
    addParkings()
    return [
      m('div#map.map', ''),
      m(
        'i.material-icons.center-button',
        {
          onclick: goToCurrentPosition
        },
        'near_me'
      )
    ]
  }
}

export default mapView
