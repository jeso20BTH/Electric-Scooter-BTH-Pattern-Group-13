const axios = require('axios')
let config

try {
  config = require('./config.json')
} catch (e) {
  console.log(e)
}
const token = process.env.DBTOKEN || config.dbToken
const dbURL = 'http://localhost:69/graphql'

class Bike {
    constructor(id) {
        return(async () => {
            const query = `{
                bike (id: ${id}) {
                    id,
                    available,
                    velocity,
                    battery,
                    xcoord,
                    ycoord,
                    cityid
                }
            }`
            let res = await axios({
                method: 'post',
                url: dbURL,
                data: {
                  query: query
                },
                headers: {
                  jwt: token
                }
            })

            res = res.data.data.bike
            this.id = res.id
            this.available = res.available
            this.velocity = res.velocity
            this.battery = res.battery
            this.xcoord = res.xcoord
            this.ycoord = res.ycoord
            this.previousXCoord = res.xcoord
            this.previousYCoord = res.ycoord
            this.cityid = res.cityid
            this.gps = true
            this.lightcolor = null
            this.startIntervall
            this.charging = false
            this.updateFrequency = 60000;

            return this
        })();
    }

    start () {
        this.lightcolor = 'green'

        this.startIntervall = setInterval(async () => {
            if (this.gps) {
                this.getPosition()
            }

            this.calculateVelocity()
            this.checkBattery()
            // await this.checkCharger()

            let res = await this.send()

            this.lightcolor = (this.charging) ? 'red' : (res.avaliable === 0) ? 'blue' : 'green'
        }, 60000)
    }

    stop () {
         this.lightcolor = null

         clearIntervall(this.startIntervall)
    }

    async send () {
        const query = `mutation {
            updateBike (
                xcoord: ${this.xcoord},
                ycoord: ${this.ycoord},
                battery: ${this.battery},
                velocity: ${this.velocity},
                columnToMatch: "id",
                valueToMatch: "${this.id}"
            ) {
                id,
                available,
                velocity,
                battery,
                xcoord,
                ycoord
            }
        }`
        let res = await axios({
            method: 'post',
            url: dbURL,
            data: {
              query: query
            },
            headers: {
              jwt: token
            }
          })

        return res.data.data.updateBike
    }

    setPosition(x, y) {
        this.previousXCoord = this.xcoord
        this.previousYCoord = this.ycoord
        this.xcoord = x
        this.ycoord = y
    }

    getPosition() {
        function success(pos) {
            this.previousXCoord = this.xcoord
            this.previousYCoord = this.ycoord
            this.xcoord = pos.longitude
            this.ycoord = pos.latitude
        }

        function errorFunction(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
        navigator.geolocation.getCurrentPosition(success, errorFunction)
    }

    calculateVelocity() {
        let ms2s = 1000
        let s2m = 60
        let m2h = 60
        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }

        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(this.ycoord-this.previousYCoord);  // deg2rad below
        let dLon = deg2rad(this.xcoord-this.previousXCoord);

        let a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(this.previousYCoord)) * Math.cos(deg2rad(this.ycoord)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let distance = R * c;
        let updateFrequencyHours = this.updateFrequency / (ms2s * s2m * m2h)

        this.velocity = distance / updateFrequencyHours
    }

    overrideGPS() {
        this.gps = false
    }

    checkBattery () {
        this.drainBattery()

        if (this.charging) {
            this.chargeBattery()
        }
    }

    drainBattery () {
        if (this.velocity > 0) {
            this.battery -= 1

            if (this.battery <= 0) {
                this.stop()
            }
        }
    }

    chargeBattery () {
        this.battery += 1

        if (this.battery >= 100) {
            this.charging = false
            this.start()
        }
    }

    async checkCharger () {
        const query = `
            {
                bike2parkingspaces {
                    id,
                    bikeid,
                    parkingspace {
                        hascharger
                    }
                }
            }
        `
        let res = await axios({
            method: 'post',
            url: dbURL,
            data: {
              query: query
            },
            headers: {
              jwt: token
            }
        })

        res = res.data.data.bike2parkingspaces

        for (let b2p of res) {
            if (b2p.bikeid == this.id && b2p.parkingspace.hascharger == 1 && this.velocity == 0) {
                this.charging == true
            }
        }
    }

}

module.exports = Bike
