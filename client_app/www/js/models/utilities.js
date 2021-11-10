let utilities = {
    calculateTime: (startTime) => {
        let curTime = new Date();
        let difference = curTime - startTime;

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
    batteryPercentage: (currentBatteryPercentage) => {
        let className;

        className = (currentBatteryPercentage > 90) ? 'max' :
            (currentBatteryPercentage > 70) ? 'high' :
                (currentBatteryPercentage > 40) ? 'middle' :
                    (currentBatteryPercentage > 20) ? 'low' :
                        (currentBatteryPercentage > 5) ? 'critical' : 'min'

        return className;
    }
}

export default utilities;