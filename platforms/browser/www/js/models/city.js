'use strict';
import axios from 'axios';



let allCities = {
    Cities: {},
    getAllCities: async () => {
        const data = await axios({
            url: "http://localhost:1337/graphql",
            method: "POST",
            data: ({
                query: `
                query {
                    cities {
                        id,
                        name,
                    }
                }
                `
            })
        })
        return data.data
    },
    getCities: async () => {
      const data = await allCities.getAllCities()
      allCities.Cities = data.data.cities
      return data.data.cities
  }
}


export default allCities;
