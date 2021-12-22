'use strict';
import axios from 'axios';

let parkingspaceInCity = { 
    Parkings: {},
    getAllParks: async () => {
        const data = await axios({
        url: "http://localhost:1337/graphql",
        method: "POST",
        data: ({
            query: `
            query {
                parkingspaces {
                    xcoord,
                    ycoord,
                    name,
                    cityid,
                    hascharger,
                    bikes {
                        id,
                        available,
                        battery
                    }
                }
            }
            `
            })

        })
        return data.data
    },
    getPark: async () => {
        const data = await parkingspaceInCity.getAllParks()
        parkingspaceInCity.Parkings = data.data.parkingspaces
        return data.data.parkingspaces
    }
}

export default parkingspaceInCity;
