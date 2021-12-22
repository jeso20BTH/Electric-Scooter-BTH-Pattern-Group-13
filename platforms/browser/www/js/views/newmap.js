"use strict";

import m from "mithril";
import L from "leaflet";
import parkingspaceInCity from '../models/parkingspaces';
import allCities from '../models/city';
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import locationIcon from "../../img/location.png";
import ms from "../../img/ms.png";



let map;
let ladd;
let parks;
let bikes;
let xcoord;
let ycoord;
let zoom;
let locationMarker = showIcon(locationIcon)


let mapViews = {
    oninit: (async () => {
        parks = await parkingspaceInCity.getPark()
        m.redraw();
    })(),
    view: function (vnode) {
        let cityId = ((vnode.attrs.id).substring(1))
        allCities.cityId = cityId
        allCities.cityId == 1 ? [
            allCities.cityName = "Karlskrona"
        ] : allCities.cityId == 3 ? [
            allCities.cityName = "Luleå"
        ] : allCities.cityId == 2 ? [
            allCities.cityName = "Stockholm"
        ] : null
        return [
            m("h1", allCities.cityName),
            m("div#map.map", "")
        ];
    },
    oncreate: function() {
        showMap()
    }
};


function showMap() {
    axios({
    url: "http://localhost:1337/graphql",
    method: "POST",
    data: ({
        query: `
        query {
            city (id: ${allCities.cityId}) {
                id
                name
                bikes {
                    id
                    xcoord
                    ycoord
                    battery
                }
            }
        }
        `
    })
    }).then((result) => {
        bikes = result.data.data.city.bikes
        allCities.cityId == 1 ? [
            xcoord = 56.160817,
            ycoord = 15.586703,
            zoom = 14.5
        ] : allCities.cityId == 3 ? [
            xcoord = 65.5855652,
            ycoord = 22.1481566,
            zoom = 13.5
        ] : allCities.cityId == 2 ? [
            xcoord = 59.324150,
            ycoord = 18.072689,
            zoom = 13
        ] : null


        map = L.map('map').setView([xcoord, ycoord], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
            attribution: `&copy;
            <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors`
        }).addTo(map);
        bikes !== null  ? 
        [ 
            m("div", bikes.map(function (bike) {
                locationMarker = showIcon(ms)
                L.marker(
                    [bike.xcoord, bike.ycoord], {icon: locationMarker},
                ).addTo(map).bindPopup(`<span>CykelId: <b>${bike.id}</b><br>Batteri: <b>${bike.battery}</b><br><a class="popup" href="#!/cykel:${bike.id}">Flytta cykel</a></span>`);
                })),
            m("div", parks.map(function (park) {
                    park.hascharger == 0 ? [
                        ladd = "Nej"
                    ] : ladd = "Ja"
                    locationMarker = showIcon(locationIcon)
                L.marker(
                    [park.xcoord, park.ycoord], {icon: locationMarker}
                ).addTo(map).bindPopup(`<span><b>${park.name}</b><br>Laddningsstation: <b>${ladd}</b><br>Antal parkerade cyklar: <b>${(park.bikes).length}</b><br><a class="popup" href="#!/parkeringar">Visa samtliga parkeringar</a></span>`);
            }))
        ]: m("p", "Det finns inga städer registrerade.");   
    });
}

function showIcon(x) {
    return L.icon({
    iconUrl: x,
    iconSize:     [14, 14],
    iconAnchor:   [12, 12],
    popupAnchor:  [0, 0]
    });
}

export default mapViews;
