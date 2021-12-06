let chai = require('chai')
let expect = chai.expect;

import u from './../www/js/models/utilities';

describe("Utilities", () => {
    describe("Date and time", () => {
        it("Duration shall return 02:46:39, with added zero at 2", () => {
            let startTime = 0;
            let endTime = 10000000;
            let time = u.calculateDuration(startTime, endTime);

            expect(time).to.be.an('string');
            expect(time).to.equal('02:46:39');
        })

        it('Date shall be formated 2021-12-03 08:41:16', () => {
            let date = u.formatDate(new Date(1638520876288));

            expect(date).to.be.an('string');
            expect(date).to.be.equal('2021-12-03 08:41:16')
        })

        it('Shall return full year 2021', () =>{
            let year = u.getYear(1638520876288);

            expect(year).to.be.an('number');
            expect(year).to.be.equal(2021)
        })

        it('Shall return month 12', () => {
            let month = u.getMonth(1638520876288);

            expect(month).to.be.an('number');
            expect(month).to.be.equal(12);
        })

        it('Shall return day 3', () =>{
            let day = u.getDay(1638520876288);

            expect(day).to.be.an('number');
            expect(day).to.be.equal(3);
        })

        it('Experation date shall return 2022-01-14', () =>{
            let date = u.getExpDate(2021, 12)

            expect(date).to.be.an('string');
            expect(date).to.equal('2022-01-14');
        })

        it('Experation date shall return 2022-02-14', () =>{
            let date = u.getExpDate(2022, 1)

            expect(date).to.be.an('string');
            expect(date).to.equal('2022-02-14');
        })

        it('Experation date shall return 2022-11-14', () =>{
            let date = u.getExpDate(2022, 10)

            expect(date).to.be.an('string');
            expect(date).to.equal('2022-11-14');
        })

        it('January 2022 shall return 31', () =>{
            let days = u.getDaysInMonth('2022-01')

            expect(days).to.be.an('number');
            expect(days).to.equal(31);
        })

        it('Febuary 2022 shall return 28', () =>{
            let days = u.getDaysInMonth('2022-02')

            expect(days).to.be.an('number');
            expect(days).to.equal(28);
        })

        it('Febuary 2024 shall return 29', () =>{
            let days = u.getDaysInMonth('2024-02')

            expect(days).to.be.an('number');
            expect(days).to.equal(29);
        })

        it('June 2022 shall return 30', () =>{
            let days = u.getDaysInMonth('2022-06')

            expect(days).to.be.an('number');
            expect(days).to.equal(30);
        })

        it('The duration 06:00:12 shall return 21612', () => {
            let durInSecs = u.getDurationInSeconds('06:00:12');

            expect(durInSecs).to.be.an('number');
            expect(durInSecs).to.equal(21612);
        })

        it('The duration 21612 shall return  06:00:11', () => {
            let durStr = u.getDurationFormated(21612);

            expect(durStr).to.be.an('string');
            expect(durStr).to.equal('06:00:11');
        })
    })

    describe('Payment', () => {
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

            let price = u.calculatePrice(data);

            expect(price).to.be.an('number');
            expect(price).to.equal(25);
        })

        it('Shall return price for one minute with discount and no penalty', () => {
            data.startPosition = 'unparked';
            data.endPosition = 'parked';

            let price = u.calculatePrice(data);

            expect(price).to.be.an('number');
            expect(price).to.equal(15);
        })

        it('Shall return price for one minute with penalty and no discount', () => {
            data.startPosition = 'unparked';
            data.endPosition = 'unparked';

            let price = u.calculatePrice(data);

            expect(price).to.be.an('number');
            expect(price).to.equal(40);
        })

        it('OCR shall equal 133720211266669', () => {
            let ocr = u.generateOCR(1337, '2021-12', 69, 666);

            expect(ocr).to.be.an('string');
            expect(ocr).to.equal('133720211266669');
        })

        it('Shall generate an correct summary', () => {
            let invoice = [
                {duration: '00:15:00', price: 50, expDate: '2022-01-14'},
                {duration: '00:45:00', price: 150, expDate: '2022-01-14'}
            ];
            let invoiceId = '2021-12';
            let customerId = 1337;
            let sumary = u.getSumary(invoice, invoiceId, customerId);

            expect(sumary).to.be.an('object');
            expect(sumary.price).to.equal(200);
            expect(sumary.duration).to.equal('01:00:00');
            expect(sumary.expDate).to.equal('2022-01-14');
            expect(sumary.fromDate).to.equal('2021-12-01');
            expect(sumary.toDate).to.equal('2021-12-31');
            expect(sumary.ocr).to.equal('13372021121234567890200');
            expect(sumary.paymentAccount).to.equal('1234567890');
        })
    }),

    describe('Position', () => {
        it('Shall return [10.5, 25.25] with input [10, 10] and [11, 40.5]', () => {
            let pos = u.calculateCenter([10, 10], [11, 40.5]);

            expect(pos).to.be.an('array');
            expect(pos[0]).to.equal(10.5);
            expect(pos[1]).to.equal(25.25);
        })
    })
})
