"use strict";
import m from 'mithril';
import allCities from '../models/city';
import axios from "axios";

import createBikeLog from '../models/func';
import parkingspaceInCity from '../models/parkingspaces';
import allBikes from '../models/bikes';


let moveToPark;
let test;
let px;
let py;
let bx;
let id;
let by;
let parkings;
let bikes;

let name;
let ladd;
let available = 1;
let cityidBike;
let standard = [];



let moveBike = {
    oninit: (async () => {
        parkings = await parkingspaceInCity
        bikes = await allBikes
        m.redraw();
        
    })(),
    view: function (vnode) {
        let bikeid = ((vnode.attrs.id).substring(1))
        let parkering = [];
        parkings.map(function (p) {
            p.hascharger == 0 ? [
                ladd = "Nej"
            ] : ladd = "Ja";
            p.city.name == allCities.cityName ? [
                !parkering.includes(`${p.name}, Laddstation: ${ladd}`) ? [
                    parkering.push(`${p.name}, Laddstation: ${ladd}`)
                ] : null,
                standard.length == 0 ? [
                    console.log("hej"),
                    standard.push(`${p.name}, Laddstation: ${ladd}`)
                ] : null,
                // console.log(standard),
        ] : null });

        return m("main.container", [
            m("h1", `Meddela servicepersonal om flytt av elcykel ${bikeid}`),
            m("p", `Välj vart cyklen ${bikeid} ska flyttas:`),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    // console.log(moveToPark)
                    

                    moveToPark == null ? [
                        // console.log(standard),
                        moveToPark = standard.join(),
                    ] : null

                    // console.log(moveToPark.slice(-1))
                    moveToPark.slice(-1) == "a" ? [
                        moveToPark = moveToPark.slice(0, -17)
                    ] : moveToPark = moveToPark.slice(0, -18)

                    // console.log(moveToPark)


                    parkings.map(function (p) {
                        p.name == moveToPark ? [
                            px = p.xcoord,
                            py = p.ycoord,
                            p.hascharger == 1 ? [
                                available = 0
                            ] : null,
                    ] : null;
                    });
                    bikes.map(function (b) {
                        b.id == bikeid ? [
                            bx = b.xcoord,
                            by = b.ycoord,
                            cityidBike = b.cityid
                    ] : null;
                    });
                    // console.log(bikeid, cityidBike, bx, by, px, py, available)
                    (async () => {
                        await createBikeLog(bikeid, cityidBike, bx, by, px, py, available);
                    })();
                    allCities.refresh = 0;
                    m.route.set(`/flytt_cykel:${allCities.cityId}`);
                }
            }, [
                
                m("select.input", {
                    onchange: function (e) {
                        moveToPark = e.target.value
                    },
                }, parkering.map(function (p) {
                    return m("option", { value: p }, p);
                })),
                m("input[type=submit][value=Meddela servicepersonal om flytt].Btn", "Spara")
            ]),
        ]);
    },
};

export default moveBike;

