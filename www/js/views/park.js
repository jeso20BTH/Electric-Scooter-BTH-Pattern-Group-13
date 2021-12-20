"use strict";
import m from 'mithril';
import axios from 'axios';

import parkingspaceInCity from '../models/parkingspaces';
import allCities from '../models/city';


let parkings;
let ladd;

let park = {
    oninit: (async () => {
        parkings = await parkingspaceInCity
        m.redraw();
    })(),
    view: function() {
        return m("main.container", [
            m("h1", "Parkeringar för " + allCities.cityName),
            m("div", parkings.map(function (p) {
                p.hascharger == 0 ? [
                    ladd = "Nej"
                ] : ladd = "Ja";
                return m("div.parks", [
                    p.cityid == allCities.cityId ? [
                        m("h2", p.name),
                        m("p", `Antal parkerade elcyklar: ${(p.bikes).length} |  Laddstation: ${ladd}`),
                        m("table.park", [
                            m("thead", [
                                m("tr", [
                                    m("th", "Elcykel ID"),
                                    m("th", "Batteri"),
                                    m("th", "Laddar"),
                                ])
                            ]),
                            m("tbody", (p.bikes).map(function (b) {
                                b.available == 0 ? [
                                    ladd = "Ja"
                                ] : ladd = "Nej";
                                return [
                                    m("tr", [
                                        m("td", {"data-title": "Elcykel ID"}, b.id),
                                        m("td", {"data-title": "Batteri"}, b.battery),
                                        m("td", {"data-title": "Laddas"}, ladd),

                                    ])
                                ]
                            }))
                        ])
                    ] : null,
                ])
            })),
        ]) 
    },
};


export default park;


