const request = require('request')

const forecast = ({lon, lat}, callback) => {
    
    const url_weather = 'http://api.weatherstack.com/current?access_key=f3c462107258a7cffb42374f111ea4b1&query='
                        + lat + ',' + lon
                        + '&units=m'

    request({url: url_weather, json: true}, (error, {body}) => {
        if(error) {
            callback('Cannot find location', undefined)
        } else if (body.error) {
            callback('No forecast for that location', undefined)
        } else {
            const weather = body.current.weather_descriptions[0]
                            + ' | Temperature: ' + body.current.temperature + '°C'
                            + ' | Feels like: ' + body.current.feelslike  + '°C'
                            + ' | Wind direction: ' + body.current.wind_dir
            callback(undefined, weather)
        }
    })
}

module.exports = forecast

