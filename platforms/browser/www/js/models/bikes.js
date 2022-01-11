'use strict';
import axios from 'axios';
import 'regenerator-runtime/runtime'
import conf from './../config.json'
import allCities from '../models/city';




let allBikes = {
    Bike: {},
    Bikes: {},
    CityBikes: {},
    getAllBikes: async () => {
        const data = await axios({
            url: "http://localhost:1337/graphql",
            method: "POST",
            headers: {
                jwt: conf.dbToken
            },
            data: ({
                query: `
                query {
                    bikes {
                        id,
                        available,
                        velocity,
                        battery,
                        xcoord,
                        ycoord,
                        cityid,
                        }
                    }
                `
            })
        })
        return data.data
    },
    getBikes: async () => {
        const data = await allBikes.getAllBikes()
        allBikes.Bikes = data.data.bikes
        return data.data.bikes
    },
    getBikesByCity: async () => {
        const data = await allBikes.getAllBikesOfCity()
        allBikes.CityBikes = data.data.city.bikes
        return
    },
    getAllBikesOfCity: async () => {
        const data = await axios({
            url: "http://localhost:1337/graphql",
            method: "POST",
            headers: {
                jwt: conf.dbToken
            },
            data: ({
                query: `
                query {
                    city (id: ${allCities.cityId}) {
                        id
                        name
                        bikes {
                            id
                            xcoord
                            ycoord
                            battery
                        }
                    }
                }
                `
            })
            
        })
        return data.data
    },
}

export default allBikes;
