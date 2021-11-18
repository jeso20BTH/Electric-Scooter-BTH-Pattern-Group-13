"use strict";

import m from "mithril";
import L, { popup } from "leaflet";
import "leaflet/dist/leaflet.css";
import position from "../models/position.js";

import locationIcon from "../../img/location.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

import station from "../models/station.js";
import delayed from "../models/delayed.js";

var map;
var locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize:     [24, 24],
    iconAnchor:   [12, 12],
    popupAnchor:  [0, 0]
});

function convertPoint(str) {
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(str);
    var temp = matches[1].split(' ');
    var point = [];
    point[0] = parseFloat(temp[1]);
    point[1] = parseFloat(temp[0]);
    return point;
}

function showMap() {
    var stationList = [];
    var locationList = [];
    delayed.currentDelayeds.forEach(function(d) {
        let l = (d.FromLocation == undefined) ? undefined : d.FromLocation[0].LocationName;
        if (l !== undefined) {
            if (locationList.indexOf(l) === -1) {
                locationList[l] = [[
                    d.ActivityType,
                    d.AdvertisedTrainIdent,
                    d.AdvertisedTimeAtLocation,
                    d.EstimatedTimeAtLocation
                ]];
            } else {
                locationList[l].push([
                    d.ActivityType,
                    d.AdvertisedTrainIdent,
                    d.AdvertisedTimeAtLocation,
                    d.EstimatedTimeAtLocation
                ]);
            }
        }
    });

    station.currentStations.forEach(function(s) {
        if (locationList[s.LocationSignature] !== undefined) {
            stationList.push([s.LocationSignature, [convertPoint(s.Geometry.WGS84), locationList[s.LocationSignature]]]);
        }
    });

    var places = {};
    stationList.forEach(function(s) {
        places[s[0]] = [s[1][0], s[1][1]];
    });

    map = L.map('map').setView([56.181932, 15.590525], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    }).addTo(map);

    for (var place in places) {
        if (Object.prototype.hasOwnProperty.call(places, place)) {
            var popupContent = "<div class='location-label'>Location: <strong>" + place + "</strong></div>";
            popupContent += "<ul class='popup'>";
            places[place][1].forEach(function(p) {
                popupContent += "<li class='popup-info'>";
                popupContent += "<p>Activity Type: <strong>" + p[0] + "</strong></p>";
                popupContent += "<p>Advertised Train Ident: <strong>" + p[1] + "</strong></p>";
                popupContent += "<p>Advertised Time At Location: <strong>" + p[2] + "</strong></p>";
                popupContent += "<p>Estimated Time At Location: <strong>" + p[3] + "</strong></p>";
                popupContent += "</li>";
            });
            popupContent += "</ul>";
            
            L.marker(places[place][0]).addTo(map).bindPopup(popupContent);
        }
    }

    showPosition();
}

function showPosition() {
    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        L.marker(
            [
                position.currentPosition.latitude,
                position.currentPosition.longitude
            ],
            {
                icon: locationMarker
            }
        ).addTo(map).bindPopup("Din plats");
    }
}

const mapView = {
    oninit: position.getPosition,
    oncreate: function() {
        station.loadAll().then(function() {
            delayed.loadAll().then(function() {
                showMap();
            });
        });
    },
    view: function() {
        return [
            m("h1", "Map"),
            m("div#map.map", "")
        ];
    }
};

export { mapView };