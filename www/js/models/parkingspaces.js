'use strict';
import axios from 'axios';

let parkingspaceInCity = 
    axios({
    url: "http://localhost:1337/graphql",
    method: "POST",
    data: ({
        query: `
        query {
            parkingspaces {
                id,
                xcoord,
                ycoord,
                name,
                cityid,
                hascharger,
                city {
                    id,
                    name,
                    startingfee,
                    penaltyfee,
                    fee,
                    discount,
                },
                bikes {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord
                }
            }
        }
        `
    })
}).then((result) => {
    return result.data.data.parkingspaces
});

export default parkingspaceInCity;

