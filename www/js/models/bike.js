let allBikes = [
  {
    id: 1,
    available: 0,
    velocity: 10,
    battery: 55,
    xcoord: 56.1600575,
    ycoord: 15.5862748,
    cityid: 3
  },
  {
    id: 2,
    available: 1,
    velocity: 0,
    battery: 100,
    xcoord: 56.1600575,
    ycoord: 15.5862748,
    cityid: 2
  },
  {
    id: 3,
    available: 1,
    velocity: 0,
    battery: 99,
    xcoord: 56.1600575,
    ycoord: 15.5862748,
    cityid: 1
  },
]

var bikeModel = {
  id: null,
  inRent: false,
  rentTime: null,
  currentBike: {},
  allBikes: allBikes,
  getAllBikes: () => {
    bikeModel.allBikes = allBikes;
    // bikeModel.rent(2);
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