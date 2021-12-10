'use strict';
import axios from 'axios';

let historyID;
let bikeidS;


function createBikeLog(bikeid, cityid, startx, starty, endx, endy) {
    bikeidS = bikeid.toString()
    axios({
        url: "http://localhost:1337/graphql",
        method: 'POST',
        data: ({
            query: `
                mutation {
                    updateBike (xcoord: ${endx}, ycoord: ${endy}, columnToMatch: "id", valueToMatch: "${bikeidS}") {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord,
                    cityid
                    }
                }
                `
        })
    });
    axios({
        url: "http://localhost:1337/graphql",
        method: 'POST',
        data: ({
            query: `
            mutation {
                addHistory (bikeid: ${bikeid}, startxcoord: ${startx}, startycoord: ${starty}, cityid: ${cityid}) {
                    id,
                    bikeid,
                    customerid,
                    starttime,
                    endtime,
                    startxcoord,
                    startycoord,
                    endxcoord,
                    endycoord,
                    payed,
                    cityid,
                    startparking,
                    bike {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                    },
                    customer {
                    id,
                    firstname,
                    lastname,
                    email,
                    balance,
                    paymentmethod
                    }
                }
                }
                `
        })
        }).then((result) => {
        historyID = result.data.data.addHistory.id
        historyID = historyID.toString()
        axios({
            url: "http://localhost:1337/graphql",
            method: 'POST',
            data: ({
                query: `
                mutation {
                    updateHistory (endxcoord: ${endx}, endycoord: ${endy}, columnToMatch: "id", valueToMatch: "${historyID}") {
                        id,
                        bikeid,
                        customerid,
                        starttime,
                        endtime,
                        startxcoord,
                        startycoord,
                        endxcoord,
                        endycoord,
                        payed,
                        cityid,
                        startparking,
                        endparking,
                        bike {
                        id,
                        available,
                        velocity,
                        battery,
                        xcoord,
                        ycoord
                        },
                        customer {
                        id,
                        firstname,
                        lastname,
                        email,
                        balance,
                        paymentmethod
                        }
                    }
                }
                `
            })
        });
    });

    return;
};


export default createBikeLog;
