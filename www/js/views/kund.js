"use strict";
import m, { redraw } from 'mithril';
import kundModel from '../models/kund';

let kundView = {
    view: function () {
        return m("main.container", [
            m("h1", "Kunder hos Svenska Elsparkcyklar"),
            m("h2", kundModel.currentKunder.firstname + " " + kundModel.currentKunder.lastname),
            m("p", kundModel.currentKunder.email),
            (kundModel.currentKunder.historylogs).length > 0 ? [
                m("table.park", [
                    m("thead", [
                        m("tr", [
                            m("th", "Elcykel"),
                            m("th", "Betald"),
                            m("th", "Startkoordinater"),
                            m("th", "Slutkoordinater"),
    
                        ])
                    ]),
                    m("tbody", kundModel.currentKunder.historylogs.map(function (history) {
                        return m("tr", [
                            m("td", {"data-title": "Elcykel"}, history.bikeid),
                            m("td",  {"data-title": "Betald"}, [
                                history.payed == 0 ? [
                                    "Nej"
                                ] : "Ja",
                            ]),
                            m("td",  {"data-title": "Startkoordinater"}, history.startxcoord + ", " + history.startycoord),
                            m("td",  {"data-title": "Slutkoordinater"}, history.endxcoord + ", " + history.endycoord),
                        ])
                    })),
                ])
        ] : m("h4", "Det finns inga tidigare resor registrerade"),
        ])
        },
    
};



export default kundView;
