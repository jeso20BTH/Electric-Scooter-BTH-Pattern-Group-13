let chai = require('chai')
let expect = chai.expect;

import utilities from './../www/js/models/utilities';

describe("Utilities", () => {
    describe("Calculate time", () => {
        it("Time shall be 02:46:39, with added zero at 2", () => {
            let startTime = 0;
            let endTime = 10000000;
            let time = utilities.calculateTime(startTime, endTime);

            expect(time).to.be.an('string');
            expect(time).to.equal('02:46:39');
        })
    })

    describe("Battery percentage", () => {
        it('100% shall return max', async () => {
            let battery = utilities.batteryPercentage(100);

            expect(battery).to.be.an('string');
            expect(battery).to.equal('max');
        })

        it('89% shall return high', async () => {
            let battery = utilities.batteryPercentage(89);

            expect(battery).to.be.an('string');
            expect(battery).to.equal('high');
        })

        it('69% shall return middle', async () => {
            let battery = utilities.batteryPercentage(69);

            expect(battery).to.be.an('string');
            expect(battery).to.equal('middle');
        })

        it('39% shall return low', async () => {
            let battery = utilities.batteryPercentage(39);

            expect(battery).to.be.an('string');
            expect(battery).to.equal('low');
        })

        it('19% shall return critical', async () => {
            let battery = utilities.batteryPercentage(19);

            expect(battery).to.be.an('string');
            expect(battery).to.equal('critical');
        })

        it('4% shall return min', async () => {
            let battery = utilities.batteryPercentage(4);

            expect(battery).to.be.an('string');
            expect(battery).to.equal('min');
        })
    })

    describe('Calculate price', () => {
        let data
        beforeEach(() => {
            data = {
                startingfee: 20,
                fee: 5,
                discount: 10,
                penaltyfee: 15,
                startTime: 0,
                endTime: 1,
            }
        })

        it('Shall return price for one minute with no discount and no penalty', () => {
            data.startPosition = 'parked';
            data.endPosition = 'parked';

            let price = utilities.calculatePrice(data);

            expect(price).to.be.an('number');
            expect(price).to.equal(25);
        })

        it('Shall return price for one minute with discount and no penalty', () => {
            data.startPosition = 'unparked';
            data.endPosition = 'parked';

            let price = utilities.calculatePrice(data);

            expect(price).to.be.an('number');
            expect(price).to.equal(15);
        })

        it('Shall return price for one minute with penalty and no discount', () => {
            data.startPosition = 'unparked';
            data.endPosition = 'unparked';

            let price = utilities.calculatePrice(data);

            expect(price).to.be.an('number');
            expect(price).to.equal(40);
        })
    })
})
