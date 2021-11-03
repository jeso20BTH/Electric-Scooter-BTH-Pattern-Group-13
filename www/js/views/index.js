"use strict";

import m from 'mithril';

import scooterModel from './../models/scooter'

let rent = {
    view: function() {
        return [
            m("h1.title", "Hyr en cykel"),
            m("p.text", `Scanna en QR-kod eller skriv in cykelns ID för att hyra den.`),
            m("input.cycle", {
                placeholder: 'Ange cykel ID',
                oninput: (event) => {
                    scooterModel.id =event.target.value;
                },
                value: scooterModel.id
            }),
            m(
                "button",
                {
                    onclick: scooterModel.rent
                },
                'Hyr'
            ),
            m("button", {onclick: ()=>{console.log("QR");}},
                m(
                    "i.material-icons", "qr_code_scanner"
                )
            )
        ]
    }
};

let inRent = {
    view: function() {
        return [
            m("h1.title", "Uthyrning pågår"),
            m(
                'button',
                {
                    onclick: scooterModel.unrent
                },
                'Lämna'
            )
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
