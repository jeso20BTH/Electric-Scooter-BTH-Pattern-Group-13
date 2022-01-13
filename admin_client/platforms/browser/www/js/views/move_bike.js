"use strict";
import m from 'mithril';
import allCities from '../models/city';
import parkingspaceInCity from '../models/parkingspaces';
import allBikes from '../models/bikes';
import userModel from '../models/user';
import createBikeLog from '../models/movebikes';



let moveToPark;
let coordinates = [];
// let parkings;
let bikes;
let ladd;
let available = 1;
let cityidBike;
let standard = [];



let moveBike = {
    oninit: (async () => {
        bikes = await allBikes.getBikes()
        m.redraw();
    })(),
    view: function (vnode) {
        // parkings = parkingspaceInCity.Parkings
        let bikeid = ((vnode.attrs.id).substring(1))
        let parkering = [];
        (parkingspaceInCity.Parkings).map(function (p) {
            p.hascharger == 0 ? [
                ladd = "Nej"
            ] : ladd = "Ja";
            p.cityid == allCities.cityId ? [
                !parkering.includes(`${p.name}, Laddstation: ${ladd}`) ? [
                    parkering.push(`${p.name}, Laddstation: ${ladd}`)
                ] : null,
                standard.length == 0 ? [
                    standard.push(`${p.name}, Laddstation: ${ladd}`)
                ] : null,
        ] : null });

        return m("main.container", [
            m("h1", `Meddela servicepersonal om flytt av elcykel ${bikeid}`),
            m("p", `Välj vart cyklen ${bikeid} ska flyttas:`),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    moveToPark == null ? [
                        moveToPark = standard.join(),
                    ] : null
                    moveToPark.slice(-1) == "a" ? [
                        moveToPark = moveToPark.slice(0, -17)
                    ] : moveToPark = moveToPark.slice(0, -18)
                    parkingspaceInCity.Parkings.map(function (p) {
                        p.name == moveToPark ? [
                            coordinates[0] = p.xcoord,
                            coordinates[1] = p.ycoord,
                            p.hascharger == 1 ? [
                                available = 0
                            ] : null,
                    ] : null;
                    });
                    bikes.map(function (b) {
                        b.id == bikeid ? [
                            coordinates[2] = b.xcoord,
                            coordinates[3] = b.ycoord,
                            cityidBike = b.cityid
                    ] : null;
                    });
                    (async () => {
                        await createBikeLog(bikeid, cityidBike, coordinates[2], coordinates[3], coordinates[0], coordinates[1], available);
                    })();
                    allCities.refresh = 0;
                    let id = `${allCities.cityId}-${userModel.currentUser}`
                    m.route.set(`/flytt_cykel:${id}`);
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

