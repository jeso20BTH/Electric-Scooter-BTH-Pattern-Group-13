const utilitiesModel = {
  calculateDuration: (startTime, endTime) => {
    const difference = endTime - startTime

    const ms2s = 1000
    const s2m = 60
    const m2h = 60

    let hours = difference / ms2s / s2m / m2h
    let minutes = (hours - Math.floor(hours)) * m2h
    let seconds = (minutes - Math.floor(minutes)) * s2m

    hours = Math.floor(hours)
    minutes = Math.floor(minutes)
    seconds = Math.floor(seconds)

    hours = (hours < 10) ? `0${hours}` : `${hours}`
    minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`
    seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`

    return `${hours}:${minutes}:${seconds}`
  },
  calculatePrice: (data) => {
    let totalPrice = 0
    const ms2s = 1000
    const s2m = 60

    totalPrice += data.startingfee

    const startTime = new Date(parseInt(data.startTime))
    const endTime = new Date(parseInt(data.endTime))

    const duration = Math.ceil((endTime - startTime) / ms2s / s2m)

    totalPrice += duration * data.fee

    if (data.startPosition === 'unparked' && data.endPosition === 'parked') {
      totalPrice -= data.discount
    }

    if (data.endPosition === 'unparked') {
      totalPrice += data.penaltyfee
    }

    return totalPrice
  },
  formatDate: (date) => {
    let resString = ''
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    resString += `${utilitiesModel.addZeroSmallerThan(year, 10)}-`
    resString += `${utilitiesModel.addZeroSmallerThan(month, 10)}-`
    resString += `${utilitiesModel.addZeroSmallerThan(day, 10)} `
    resString += `${utilitiesModel.addZeroSmallerThan(hours, 10)}:`
    resString += `${utilitiesModel.addZeroSmallerThan(minutes, 10)}:`
    resString += `${utilitiesModel.addZeroSmallerThan(seconds, 10)}`

    return resString
  },
  addZeroSmallerThan: (value, smallerThan) => {
    return (value < smallerThan) ? `0${value}` : String(value)
  },
  getYear: (date) => {
    date = new Date(parseInt(date))

    return date.getFullYear()
  },
  getMonth: (date) => {
    date = new Date(parseInt(date))

    return date.getMonth() + 1
  },
  getDay: (date) => {
    date = new Date(parseInt(date))

    return date.getDate()
  },
  getExpDate: (year, month) => {
    const days = '14'
    let expMonth = month + 1
    let expYear = String(year)

    if (expMonth > 12) {
      expMonth = '01'
      expYear = String(year + 1)
    } else if (expMonth < 10) {
      expMonth = `0${expMonth}`
    }

    return `${expYear}-${expMonth}-${days}`
  },
  getDaysInMonth: (invoiceCode) => {
    const year = parseInt(invoiceCode.split('-')[0])
    const month = parseInt(invoiceCode.split('-')[1])

    return new Date(year, month, 0).getDate()
  },
  getDurationInSeconds: (duration) => {
    // Time conversion
    const h2m = 60
    const m2s = 60

    const durationParts = duration.split(':')

    const hours = parseInt(durationParts[0]) * h2m * m2s
    const minutes = parseInt(durationParts[1]) * m2s
    const seconds = parseInt(durationParts[2])

    return hours + minutes + seconds
  },
  getDurationFormated: (duration) => {
    const s2m = 60
    const m2h = 60

    let hours = duration / s2m / m2h
    let minutes = (hours - Math.floor(hours)) * m2h
    let seconds = (minutes - Math.floor(minutes)) * s2m

    hours = Math.floor(hours)
    minutes = Math.floor(minutes)
    seconds = Math.floor(seconds)

    hours = (hours < 10) ? `0${hours}` : `${hours}`
    minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`
    seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`

    return `${hours}:${minutes}:${seconds}`
  },
  generateOCR: (customerId, invoiceId, price, corporationId) => {
    const invoiceIdConverted = invoiceId.split('-').join('')

    return `${customerId}${invoiceIdConverted}${corporationId}${price}`
  },
  getSumary: (invoice, invoiceId, customerId) => {
    const corporationId = '1234567890'
    const daysInMonth = utilitiesModel.getDaysInMonth(invoiceId)
    let totalPrice = 0
    let totalDurationInSeconds = 0
    let expDate = ''
    const fromDate = `${invoiceId}-01`
    const toDate = `${invoiceId}-${daysInMonth}`

    invoice.forEach((trip) => {
      totalDurationInSeconds += utilitiesModel.getDurationInSeconds(trip.duration)
      totalPrice += trip.price

      if (!expDate) {
        expDate = trip.expDate
      }
    })

    const duration = utilitiesModel.getDurationFormated(totalDurationInSeconds)
    const ocr = utilitiesModel.generateOCR(customerId, invoiceId, totalPrice, corporationId)

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
    const lat = (start[0] + end[0]) / 2
    const long = (start[1] + end[1]) / 2

    return [lat, long]
  }
}

export default utilitiesModel
