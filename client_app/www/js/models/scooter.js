let allScooters = [
    {
        id: '1',
        status: 'free',
        long: '',
        lat: '',
        battery: 0.3,
        speed: 0,
    },
    {
        id: '2',
        status: 'rented',
        long: '',
        lat: '',
        battery: 0.6,
        speed: 12,
    },
    {
        id: '3',
        status: 'service',
        long: '',
        lat: '',
        battery: 0.1,
        speed: 0,
    }
]

var scooterModel = {
    id: '',
    inRent: false,
    rentTime: null,
    currentScooter: {},
    allScooters: allScooters,
    getAllScooters: () => {
        scooterModel.allScooters = allScooters;
    },
    rent: () => {
        let foundScooter = scooterModel.allScooters.find(scooter => scooter.id === scooterModel.id);

        console.log(foundScooter);

        if (foundScooter && foundScooter.status === 'free') {
            scooterModel.inRent = true;
            scooterModel.currentScooter = foundScooter;
            scooterModel.id = '';
            scooterModel.rentTime = new Date();
        }
    },
    unrent: () => {
        scooterModel.inRent = false;
        scooterModel.currentScooter = {};
        scooterModel.rentTime = null;
    },
}

export default scooterModel;
