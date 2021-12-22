'use strict';
import axios from 'axios';
import 'regenerator-runtime/runtime'



let allBikes = {
    Bikes: {},
    getAllBikes: async () => {
        const data = await axios({
            url: "http://localhost:1337/graphql",
            method: "POST",
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
  }
}

export default allBikes;
