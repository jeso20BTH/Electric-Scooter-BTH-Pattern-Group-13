let chai = require('chai')
let expect = chai.expect;
const kund = require('./../www/js/models/kund.js').default
const kunder = require('./../www/js/models/customers.js')


describe("Customer", () => {
    describe("Before retrieving data", () => {
        it('CurrentCustomer shall be an empty object', async () => {
            expect(kund.currentKunder).to.be.an('object').that.is.empty;
        })
    })
    describe("After retrieving data", () => {
        before( async () =>  {
            //  Get customer with id 2
            await kund.getKund(2);

        })

        after(() => {
            kund.currentKunder = {}
        })
        it("Customer shall be stored as an object and not be empty", () => {
            expect(kund.currentKunder).to.be.an('object').that.is.not.empty;
        })
    
        it("Customers id shall be a number", () => {
            expect(kund.currentKunder.id).to.be.an('number');
        })
        it("Customers firstname shall be a string", () => {
            expect(kund.currentKunder.firstname).to.be.an('string');
        })
        it("Customers lastname shall be a string", () => {
            expect(kund.currentKunder.lastname).to.be.an('string');
        })
        it("Customers historylog shall be an array", () => {
            expect(kund.currentKunder.historylogs).to.be.an('array');
        })
    })
    
})