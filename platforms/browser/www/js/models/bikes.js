'use strict';
import axios from 'axios';



let allBikes = 
    axios({
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
}).then((result) => {
    return result.data.data.bikes
});

export default allBikes;
