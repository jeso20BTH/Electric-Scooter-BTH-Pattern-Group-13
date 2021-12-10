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
let by;
let parkings;
let bikes;
let name;
let cityidBike;


let moveBike = {
    oninit: (async () => {
        parkings = await parkingspaceInCity
        bikes = await allBikes
        m.redraw();
    })(),
    view: function (vnode) {
        let bikeid = ((vnode.attrs.id).substring(1))

        return m("main.container", [
            m("h1", `Meddela servicepersonal om flytt av elcykel ${bikeid}`),
            m("p", `Välj vart cyklen ${bikeid} ska flyttas:`),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    moveToPark == null ? [
                        moveToPark = 1
                    ] : null
                    // form.success = 'Inleveransen är skapad';
                    parkings.map(function (p) {
                        p.id == moveToPark ? [
                            px = p.xcoord,
                            py = p.ycoord
                    ] : null;
                    });
                    bikes.map(function (b) {
                        b.id == bikeid ? [
                            bx = b.xcoord,
                            by = b.ycoord,
                            cityidBike = b.cityid
                    ] : null;
                    });
                    (async () => {
                        await createBikeLog(bikeid, cityidBike, bx, by, px, py);
                    })();
                    allCities.refresh = 0;
                    m.route.set(`/flytt_cykel:${allCities.cityId}`);
                }
            }, [
                
                m("select.input", {
                    onchange: function (e) {
                        moveToPark = parseInt(e.target.value)
                    }
                }, parkings.map(function (p) {
                    p.city.name == allCities.cityName ? [
                        name = p.city.name
                ] : null;
                    return m("option", { value: p.id }, p.name + ", " + name)
                })),
                m("input[type=submit][value=Meddela service om flytt].Btn", "Spara")
            ]),
        ]);
    },
};

export default moveBike;

