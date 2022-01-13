"use strict";
import m from "mithril";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

import parkingIcon from "../../img/parking.png";
import bikeIcon from "../../img/bike.png";
import allBikes from '../models/bikes'
import parkingspaceInCity from '../models/parkingspaces';
import allCities from '../models/city';



let map;
let marker;
let markers = [];
let refresh;

let mapViews = {
    oninit: m.redraw(),
    view: function () {
        allCities.cityId == 1 ? [ allCities.cityName = "Karlskrona"
        ] : allCities.cityId == 3 ? [ allCities.cityName = "Luleå"
        ] : allCities.cityId == 2 ? [ allCities.cityName = "Stockholm"
        ] : null
        return [
            m("h1", allCities.cityName),
            m("p.mapinfo", "Cyklarnas position uppdateras var 10:e sekund"),
            m("div#map.map", "")
        ];
    },
    oncreate: function() {
        (async () => {
            await allBikes.getBikesByCity()
            showMap()
        })()
        // map != null ? [
        //     map.remove()
        // ] : null
    }
};


function showMap() { 
    let parks;
    parks = parkingspaceInCity.Parkings

    refresh !== null ? [
        console.log("i refresh"),
        clearInterval(refresh),
    ] : null

    let coordinates = [];
    allCities.cityId == 1 ? [
        coordinates[0] = 56.160817,
        coordinates[1] = 15.586703,
        coordinates[2] = 14.5
    ] : allCities.cityId == 3 ? [
        coordinates[0] = 65.5855652,
        coordinates[1] = 22.1481566,
        coordinates[2] = 13.5
    ] : allCities.cityId == 2 ? [
        coordinates[0] = 59.324150,
        coordinates[1] = 18.072689,
        coordinates[2] = 13
    ] : null

    map = L.map('map').setView([coordinates[0], coordinates[1]], coordinates[2]);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    }).addTo(map);
    markOut(parks)

    refresh = setInterval(() => {
        (async () => {
            await allBikes.getBikesByCity()
            markOut(parks)
        })();
    }, 10000)
}

function markOut(parks) {
    let locationMarker = showIcon(parkingIcon)

    // Ta bort lager för cyklar
    markers != null ? [
        markers.map(function (mark) {
            map.removeLayer(mark);
        }),
        markers = []
    ]: null

    allBikes.CityBikes !== null  ? 
    [ 
        console.log(allBikes.CityBikes),
        m("div", allBikes.CityBikes.map(function (bike) {
            locationMarker = showIcon(bikeIcon)
            marker = new L.Marker(
                [bike.xcoord, bike.ycoord], {icon: locationMarker},
            )
            map.addLayer(marker);
            marker.bindPopup(`<span>CykelId: <b>${bike.id}</b><br>Batteri: <b>${bike.battery}%</b><br><a class="popup" href="#!/cykel:${bike.id}">Flytta cykel</a></span>`);
            markers.push(marker);
        }))
    ]: null;

    parks !== null  ? 
    [ 
        m("div", parks.map(function (park) {
            locationMarker = showIcon(parkingIcon)
            let ladd;
            park.hascharger == 0 ? [
                ladd = "Nej"
            ] : ladd = "Ja"
            L.marker(
                [park.xcoord, park.ycoord], {icon: locationMarker}
            ).addTo(map).bindPopup(`<span><b>${park.name}</b><br>Laddningsstation: <b>${ladd}</b><br>Antal parkerade cyklar: <b>${(park.bikes).length}</b><br><a class="popup" href="#!/parkeringar">Visa samtliga parkeringar</a></span>`);
        })),
    ]: null;
}

function showIcon(x) {
    return L.icon({
    iconUrl: x,
    iconSize:     [16, 16],
    iconAnchor:   [12, 12],
    popupAnchor:  [0, 0]
    });
}



export default mapViews;

