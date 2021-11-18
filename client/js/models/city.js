let cityModel = {
    allCities: [],
    getCity: (id) => {
        return cityModel.allCities.find(city => city.id === id);
    }
}

export default cityModel;
