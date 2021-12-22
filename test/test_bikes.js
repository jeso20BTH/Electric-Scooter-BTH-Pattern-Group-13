let chai = require('chai')
let expect = chai.expect;
const bikes = require('./../www/js/models/bikes.js').default



describe("Bikes", () => {
    describe("Before retrieving data", () => {
        it('Bikes shall be an empty object', async () => {
            expect(bikes.Bikes).to.be.an('object').that.is.empty;
        })
    })
    describe("After retrieving data", () => {
        before( async () =>  {
            //  Get all bikes
            await bikes.getBikes();

        })
        after(() => {
            bikes.Bikes = {}
        })
        it("Bikes shall be stored as an array and not be empty", () => {
            expect(bikes.Bikes).to.be.an('array').that.is.not.empty;
        })
        it("More or equal to 1000 bikes shall be stored", () => {
            expect((bikes.Bikes).length).to.be.greaterThanOrEqual(1000);
        })
    })
})
