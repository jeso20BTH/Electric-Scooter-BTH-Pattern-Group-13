let utilitiesModel = {
    calculateDuration: (startTime, endTime) => {
        let difference = endTime - startTime;

        let ms2s = 1000;
        let s2m = 60;
        let m2h = 60;

        let hours = difference / ms2s / s2m / m2h;
        let minutes = (hours - Math.floor(hours)) * m2h;
        let seconds = (minutes - Math.floor(minutes)) * s2m;



        hours = Math.floor(hours);
        minutes = Math.floor(minutes);
        seconds = Math.floor(seconds);

        hours = (hours < 10) ? `0${hours}` : `${hours}`;
        minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
        seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

        return `${hours}:${minutes}:${seconds}`
    },
    calculatePrice: (data) => {
        let totalPrice = 0;
        let ms2s = 1000;
        let s2m = 60;

        totalPrice += data.startingfee;

        let startTime = new Date(parseInt(data.startTime));
        let endTime = new Date(parseInt(data.endTime));

        let duration = Math.ceil((endTime - startTime) / ms2s / s2m);

        totalPrice += duration * data.fee;

        if (data.startPosition === 'unparked' && data.endPosition === 'parked') {
            totalPrice -= data.discount;
        }

        if (data.endPosition === 'unparked') {
            totalPrice += data.penaltyfee;
        }

        return totalPrice;
    },
    formatDate: (date) => {
        let resString = '';
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        resString += `${utilitiesModel.addZeroSmallerThan(year, 10)}-`;
        resString += `${utilitiesModel.addZeroSmallerThan(month, 10)}-`;
        resString += `${utilitiesModel.addZeroSmallerThan(day, 10)} `;
        resString += `${utilitiesModel.addZeroSmallerThan(hours, 10)}:`;
        resString += `${utilitiesModel.addZeroSmallerThan(minutes, 10)}:`;
        resString += `${utilitiesModel.addZeroSmallerThan(seconds, 10)}`;

        return resString;
    },
    addZeroSmallerThan: (value, smallerThan) => {
        return (value < smallerThan) ? `0${value}` : String(value);
    },
    getYear: (date) => {
        date = new Date(parseInt(date));

        return date.getFullYear();
    },
    getMonth: (date) => {
        date = new Date(parseInt(date));

        return date.getMonth() + 1;
    },
    getDay: (date) => {
        date = new Date(parseInt(date));

        return date.getDate();
    },
    getExpDate: (year, month) => {
        let days = '14';
        let expMonth = month + 1;
        let expYear = String(year);

        if (expMonth > 12) {
            expMonth = '01';
            expYear = String(year + 1);
        } else if (expMonth < 10) {
            expMonth = `0${expMonth}`
        }



        return `${expYear}-${expMonth}-${days}`;
    },
    getDaysInMonth: (invoiceCode) => {
        let year = parseInt(invoiceCode.split('-')[0]);
        let month = parseInt(invoiceCode.split('-')[1]);

        return new Date(year, month, 0).getDate();
    },
    getDurationInSeconds: (duration) => {
        // Time conversion
        let h2m = 60;
        let m2s = 60;

        let durationParts = duration.split(':');

        let hours = parseInt(durationParts[0]) * h2m * m2s;
        let minutes = parseInt(durationParts[1]) * m2s;
        let seconds = parseInt(durationParts[2]);

        return hours + minutes + seconds;
    },
    getDurationFormated: (duration) => {
        let s2m = 60;
        let m2h = 60;

        let hours = duration / s2m / m2h;
        let minutes = (hours - Math.floor(hours)) * m2h;
        let seconds = (minutes - Math.floor(minutes)) * s2m;



        hours = Math.floor(hours);
        minutes = Math.floor(minutes);
        seconds = Math.floor(seconds);

        hours = (hours < 10) ? `0${hours}` : `${hours}`;
        minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
        seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

        return `${hours}:${minutes}:${seconds}`
    },
    generateOCR: (customerId, invoiceId, price, corporationId) => {
        let invoiceIdConverted = invoiceId.split('-').join('');

        return `${customerId}${invoiceIdConverted}${corporationId}${price}`;
    },
    getSumary: (invoice, invoiceId, customerId) => {
        let corporationId = '1234567890';
        let daysInMonth = utilitiesModel.getDaysInMonth(invoiceId);
        let totalPrice = 0;
        let totalDurationInSeconds = 0;
        let expDate = '';
        let fromDate = `${invoiceId}-01`;
        let toDate = `${invoiceId}-${daysInMonth}`;

        invoice.map((trip) => {
            totalDurationInSeconds += utilitiesModel.getDurationInSeconds(trip.duration);
            totalPrice += trip.price;

            if(!expDate) {
                expDate = trip.expDate;
            }
        })

        let duration = utilitiesModel.getDurationFormated(totalDurationInSeconds);
        let ocr = utilitiesModel.generateOCR(customerId, invoiceId, totalPrice, corporationId);

        return {
            price: totalPrice,
            duration: duration,
            expDate: expDate,
            fromDate: fromDate,
            toDate: toDate,
            ocr: ocr,
            paymentAccount: corporationId
        }

    },
    calculateCenter: (start, end) => {
        let lat = (start[0] + end[0]) / 2
        let long = (start[1] + end[1]) / 2

        return [lat, long];
    }
}

export default utilitiesModel;
