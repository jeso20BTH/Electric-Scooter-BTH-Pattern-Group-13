let allScooters = [
    {
        id: '1',
        status: 'free',
        long: '',
        lat: '',
        battery: 1.0,
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
    currentScooter: {},
    allScooters: allScooters,
    getAllScooters: () => {
        scooterModel.allScooters = allScooters;
    },
    rent: () => {
        let foundScooter = scooterModel.allScooters.find(scooter => scooter.id === scooterModel.id);

        if (foundScooter && foundScooter.status === 'free') {
            scooterModel.inRent = true;
            scooterModel.currentScooter = foundScooter;
            scooterModel.id = '';
        }
    },
    unrent: () => {
        scooterModel.inRent = false;
        scooterModel.currentScooter = {};
    }
}

export default scooterModel;
