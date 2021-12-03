let chai = require('chai')
let expect = chai.expect;

import city from './../www/js/models/city';

describe('City', () => {
    describe("Initial state", () => {
        it("All cities shall be an empty array", () => {
            expect(city.allCities).to.be.an('array');
            expect(city.allCities.length).to.equal(0);
        })
    })

    describe('Find city', () => {
        before(() => {
            city.allCities = [
                {id: 1, text: 'wrong city'},
                {id: 2, text: 'wrong city'},
                {id: 3, text: 'wrong city'},
                {id: 4, text: 'wrong city'},
                {id: 5, text: 'correct city'},
                {id: 6, text: 'wrong city'},
                {id: 7, text: 'wrong city'},
            ];
        })
        it('Shall find correct city in all cities', () => {
            let res = city.getCity(5);

            expect(res).to.be.an('object');
            expect(res.id).to.equal(5);
            expect(res.text).to.equal('correct city');
        })
    })
})
