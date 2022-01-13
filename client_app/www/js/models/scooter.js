const authModel = require('./auth.js')
const dbModel = require('./db.js')
const utilitiesModel = require('./utilities.js')

const scooterModel = {
  id: '',
  currentLog: {},
  inRent: false,
  rentTime: null,
  currentScooter: {},
  allScooters: [],
  allParkings: [],
  getAllScooters: async () => {
    scooterModel.allScooters = await dbModel.getBikes()
  },
  getAllParkings: async () => {
    scooterModel.allParkings = await dbModel.getParkings()
  },
  rent: async (data) => {
    if (data.currentScooter && data.currentScooter.available === 1) {
      const log = await dbModel.addLogEntry({
        scooterId: data.currentScooter.id,
        userId: data.id,
        xcoord: data.currentScooter.xcoord,
        ycoord: data.currentScooter.ycoord,
        city: data.currentScooter.cityid
      })

      await dbModel.getUser(data.email)

      scooterModel.currentLog = log

      await dbModel.updateBike({
        id: data.currentScooter.id,
        status: 0
      })
      scooterModel.inRent = true
      scooterModel.id = ''
      return log
    }
  },
  unrent: async (data) => {
    scooterModel.inRent = false

    await dbModel.updateBike({
      id: data.currentScooter.id,
      status: 1
    })

    let log

    if (data.paymentmethod === 'Direct') {
      log = await dbModel.updateLogPosition({
        id: data.currentLog.id,
        xcoord: data.currentScooter.xcoord,
        ycoord: data.currentScooter.ycoord
      })

      const city = await dbModel.getCity(data.currentLog.cityid)
      const totalPrice = utilitiesModel.calculatePrice({
        startingfee: city.startingfee,
        fee: city.fee,
        discount: city.discount,
        penaltyfee: city.penaltyfee,
        startTime: log.starttime,
        endTime: log.endtime,
        startPosition: log.startparking,
        endPosition: log.endparking
      })

      if (data.currentUser.balance >= totalPrice) {
        log = await dbModel.updateLogPayed({
          id: data.currentLog.id,
          payed: 1
        })

        await dbModel.updateUser({
          email: data.currentUser.email,
          firstname: data.currentUser.firstname,
          lastname: data.currentUser.lastname,
          balance: data.currentUser.balance -= totalPrice
        })
      } else {
        log = await dbModel.updateLogPayed({
          id: data.currentLog.id,
          payed: 0
        })
      }
    } else if (data.paymentmethod === 'Monthly') {
      log = await dbModel.updateLogPositionAndPayed({
        id: data.currentLog.id,
        xcoord: data.currentScooter.xcoord,
        ycoord: data.currentScooter.ycoord,
        payed: 0
      })
    }

    authModel.currentUser = await dbModel.getUser(data.currentUser.email)

    scooterModel.currentScooter = {}
    scooterModel.currentLog = {}
    scooterModel.rentTime = null
  },
  handleScan: (err, text) => {
    const element = document.getElementsByClassName('blink')

    for (let i = 0; i < element.length; i++) {
      element[i].classList.remove('gone')
    }

    document.getElementsByTagName('BODY')[0].removeAttribute('style')
    if (document.getElementsByClassName('qr-buttons')[0]) {
      document.getElementsByClassName('qr-buttons')[0].setAttribute('style', 'visibility: hidden;')
    }

    if (window.QRScanner) {
      window.QRScanner.disableLight()
    }

    if (err) {
      return err
    } else {
<<<<<<< HEAD
      scooterModel.id = text;
=======
      scooterModel.id = text
>>>>>>> 5d8df943fb892635cbd74193bf2808fbc1293624
    }
  }
}

module.exports = scooterModel
