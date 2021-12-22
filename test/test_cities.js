let chai = require('chai')
let expect = chai.expect;
const city = require('./../www/js/models/city.js').default






describe("Cities", () => {
    describe("Before retrieving data", () => {
        it('Cities shall be an empty object', async () => {
            expect(city.Cities).to.be.an('object').that.is.empty;
        })
    })
    describe("After retrieving data", () => {
        before( async () =>  {
            //  Get all bikes
            await city.getCities();

        })
        after(() => {
            city.Cities = {}
        })
        it("Cities shall be stored as an array and not be empty", () => {
            expect(city.Cities).to.be.an('array').that.is.not.empty;
        })
        it("Cities shall be Karlskrona, Stockholm och Luleå", () => {
            expect(city.Cities[0].name).to.be.equal('Karlskrona');
            expect(city.Cities[1].name).to.be.equal('Stockholm');
            expect(city.Cities[2].name).to.be.equal('Luleå');
        })
        it("There shall be three cities registered", () => {
            expect(city.Cities.length).to.be.equal(3);
        })
    })
})