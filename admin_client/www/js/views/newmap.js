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
import green from "../../img/green.png";
import red from "../../img/red.png";
import orange from "../../img/orange.png";



let map;
let parks;
let bikes;
let xcoord;
let ycoord;
let zoom;
let locationMarker = showIcon(locationIcon)



let mapViews = {
    oninit: (async () => {
        parks = await parkingspaceInCity
        m.redraw();
    })(),
    view: function() {
        return [
            m("h1", "Map " + allCities.oneCity + allCities.cityId),
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
        // console.log(result.data.data.city.bikes)

        allCities.oneCity == "Karlskrona" ? [
            xcoord = 56.160817,
            ycoord = 15.586703,
            zoom = 14.5
        ] : allCities.oneCity == "Luleå" ? [
            xcoord = 65.5855652,
            ycoord = 22.1481566,
            zoom = 13.5
        ] : allCities.oneCity == "Stockholm" ? [
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
                // let y = bike.id
                // console.log(bike.battery)
                bike.battery < 20 ? [
                    locationMarker = showIcon(red)
                ] : bike.battery < 80 ? [
                    locationMarker = showIcon(orange)
                ] : locationMarker = showIcon(ms)

                L.marker(
                    [bike.xcoord, bike.ycoord], {icon: locationMarker},
                    // console.log(bike.id)
                    
                ).addTo(map).bindPopup(`<a class="popup" href="#!/test">CykelId: ${bike.id}<br>Flytta cykel`).on('click', onClick);
            })),
            m("div", parks.map(function (park) {
                    park.hascharger == 0 ? [
                        locationMarker = showIcon(locationIcon)
                    ] : locationMarker = showIcon(red),
                L.marker(
                    [park.xcoord, park.ycoord], {icon: locationMarker}
                ).addTo(map).bindPopup("parkering");
            }))
        ]: m("p", "Det finns inga inleveranser.");   
    });
}

function showIcon(x) {
    return L.icon({
    iconUrl: x,
    iconSize:     [10, 10],
    iconAnchor:   [5, 5],
    popupAnchor:  [0, 0]
});
}

function onClick(e) {
    // var test = e.target.innerText;
    // console.log(test);

    var popup = e.target.getPopup();
    // console.log(popup);
    var content = popup.getContent();
 
    // console.log(content);
    allCities.bikeId = content;
    // console.log(allCities.bikeId)
    // m.route.set("#!/");
 };



export default mapViews;
