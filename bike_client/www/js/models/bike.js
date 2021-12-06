import { request, gql } from 'graphql-request';

const endpoint = 'http://localhost:1337/graphql';

var bikeModel = {
  id: null,
  inRent: false,
  rentTime: null,
  currentBike: {},
  allBikes: null,
  getAllBikes: () => {
    
  },
  getBike: async (bikeId) => {
    const query = gql`
        query getBike($bikeId: Int!) {
          bike (id: $bikeId) {
            id,
            available,
            velocity,
            battery,
            xcoord,
            ycoord,
            cityid,
            city {
              id,
              name,
              startingfee,
              penaltyfee,
              fee,
              discount
            }
          }
        }
      `
      const variables = {
        bikeId: bikeId,
      }
      const getData = () => {
        return new Promise(resolve => {
          request(endpoint, query, variables).then((res) => {
            resolve(res.bike);
          }).catch((error) => { console.log(error); });
        })
      }
      
      bikeModel.currentBike = await getData();
      return bikeModel.currentBike;
  },
  rent: (bikeId = bikeModel.id) => {
      let foundBike = bikeModel.allBikes.find(bike => bike.id === bikeId);
      console.log(bikeId);
      console.log(foundBike);

      if (foundBike && foundBike.available === 1) {
          bikeModel.inRent = true;
          bikeModel.currentBike = foundBike;
          bikeModel.id = null;
          bikeModel.rentTime = new Date();
      }
  },
  unrent: () => {
      bikeModel.inRent = false;
      bikeModel.currentBike = {};
      bikeModel.rentTime = null;
  },
}

export { bikeModel };