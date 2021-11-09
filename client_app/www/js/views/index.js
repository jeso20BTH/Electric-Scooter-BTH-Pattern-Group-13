"use strict";

import m from 'mithril';

import scooterModel from './../models/scooter'
import utilitiesModel from './../models/utilities'

let rent = {
    view: function() {
        return [
            m('div.column.flex.between.rent-div', [
                m('div', [
                    m("h1.title", "Hyr en cykel"),
                    m("p.text", `Scanna en QR-kod eller skriv in cykelns ID för att hyra den.`),
                ]),
                m('div.rent-input-div', [
                    m("input.cycle", {
                        placeholder: 'Ange cykel ID',
                        oninput: (event) => {
                            scooterModel.id = event.target.value;
                            console.log(event.target.value);
                        },
                        value: scooterModel.id
                    }),
                    m("button.flex.column.center.qr-btn", {onclick: ()=>{console.log("QR");}},
                        m(
                            "i.material-icons", "qr_code_scanner"
                        )
                    ),
                ]),
                m('div.flex.row.center',
                    m(
                        "button",
                        {
                            onclick: scooterModel.rent
                        },
                        'Hyr'
                    )
                )
            ])
        ]
    }
};

let inRent = {
    view: function() {
        let curScooter = scooterModel.currentScooter;
        let speed = curScooter.speed;
        let battery = Math.floor(curScooter.battery * 100);
        let scooterId = curScooter.id;
        let timeRented = utilitiesModel.calculateTime(scooterModel.rentTime);
        let batteryPercetageClass = utilitiesModel.batteryPercentage(battery);

        setInterval(() => {
            m.redraw();
        }, 1000);

        return [
            m("div.flex.column.between.scooter-info", [
                m('div.flex.row.between.allign-center', [
                    m('span', `${speed}km/h`),
                    m('div.flex.row.center.battery-div', [
                        m(`div.battery-percent-div.${batteryPercetageClass}`, {
                            style: {
                                right: `${100-battery}%`
                            }
                        }),
                        m('span.battery-percent-text', `${battery}%`)
                    ])
                ]),
                m('div', [
                    m('div.flex.row.center',
                        m('span.header', `Hyrd elsparkcykel ${scooterId}`)
                    ),
                    m('div.flex.row.center',
                        m('span.time-description', 'Tid uthyrd')
                    ),
                    m('div.flex.row.center',
                        m('span.time', `${timeRented}`)
                    )
                ]),
                m('div.column.flex.center.button-div', [
                    m(
                        'button',
                        {
                            onclick: ()=>{console.log('Start');}
                        },
                        'Start'
                    ),
                    m(
                        'button',
                        {
                            onclick: scooterModel.unrent
                        },
                        'Lämna'
                    ),
                ])
            ]),

        ]
    }
};

let index = {
    onInit: () => {
        scooterModel.getAllScooters();
    },
    view: function() {
        return (!scooterModel.inRent) ? m(rent) : m(inRent)
    }
};

export default index;
