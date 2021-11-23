"use strict";

import m from 'mithril';
// var QRScanner = require('QRScanner');

import scooterModel from './../models/scooter';
import utilitiesModel from './../models/utilities';
import authModel from './../models/auth';
import positionModel from './../models/position';

let rent = {
    view: function() {
        return [
            m('div.column.flex.between.rent-div.blink', [
                m('div', [
                    m("h1.title", "Hyr en cykel"),
                    m("p.text", `Scanna en QR-kod eller skriv in cykelns ID för att hyra den.`),
                ]),
                m('div.rent-input-div', [
                    m("input.cycle", {
                        placeholder: 'Ange cykel ID',
                        oninput: (event) => {
                            scooterModel.id = event.target.value;
                        },
                        value: scooterModel.id
                    }),
                    m("button.flex.column.center.qr-btn", {
                        onclick: ()=>{
                            let element = document.getElementsByClassName('blink');

                            for (var i = 0; i < element.length; i++) {
                                element[i].classList.add('gone');
                            }

                            document.getElementsByTagName("BODY")[0].setAttribute('style','background-color: transparent');

                            document.getElementsByClassName('qr-buttons')[0].setAttribute('style', 'visibility: visible;')
                            window.QRScanner.scan(scooterModel.handleScan);
                            window.QRScanner.show()
                        }},
                            // cordova.plugins.barcodeScanner.scan(
                            //     function (result) {
                            //         alert("We got a barcode\n" +
                            //             "Result: " + result.text + "\n" +
                            //             "Format: " + result.format + "\n" +
                            //             "Cancelled: " + result.cancelled);
                            //     },
                            //     function (error) {
                            //         alert("Scanning failed: " + error);
                            //     },
                            //     {
                            //         preferFrontCamera : false, // iOS and Android
                            //         showFlipCameraButton : true, // iOS and Android
                            //         showTorchButton : true, // iOS and Android
                            //         torchOn: false, // Android, launch with the torch switched on (if available)
                            //         saveHistory: false, // Android, save scan history (default false)
                            //         prompt : "Place a barcode inside the scan area", // Android
                            //         resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                            //         formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                            //         orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                            //         // disableAnimations : true, // iOS
                            //         disableSuccessBeep: false // iOS and Android
                            //     }
                        //     );
                        // }},
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
            ]),
            m('div.qr-buttons', [
                m('div.flex.column.center.allign-center.square-div', [
                    m('div.flex.row.between.square-top', [
                        m('div.left.top'),
                        m('div.right.top')
                    ]),
                    m('div.flex.row.between.square-bottom', [
                        m('div.left.bottom'),
                        m('div.right.bottom')
                    ])
                ]),
                m('div.flex.column.center.allign-center.square-div', [
                    m('div.scan-line')
                ]),
                m('div.flex.row.between.buttons', [
                    m('i.material-icons.close', {onclick: () => {
                        window.QRScanner.cancelScan();
                    }}, 'clear'),
                    m('i.material-icons.light', {onclick: (e) => {
                        window.QRScanner.getStatus((status) => {
                            if (status.lightEnabled) {
                                window.QRScanner.disableLight();
                            } else {
                                window.QRScanner.enableLight();
                            }
                        });
                    }}, 'flashlight_on'),
                    m('i.material-icons.reverse', {onclick: () => {
                        window.QRScanner.getStatus((status) => {
                            if (status.currentCamera) {
                                window.QRScanner.useBackCamera();
                            } else {
                                window.QRScanner.useFrontCamera();
                            }
                        });
                    }}, 'flip_camera_android')
                ]),
            ])
        ]
    }
};

let inRent = {
    view: function() {
        let curScooter = scooterModel.currentScooter;
        let speed = curScooter.velocity;
        let battery = curScooter.battery;
        let scooterId = curScooter.id;
        let timeRented = utilitiesModel.calculateTime(
            new Date(parseInt(scooterModel.currentLog.starttime))
        );
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
    onInit: async () => {
        await scooterModel.getAllScooters();
        console.log(scooterModel.allScooters);
    },
    view: function() {
        return (!scooterModel.inRent) ? m(rent) : m(inRent)
    }
};

export default index;
