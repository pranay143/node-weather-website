const request = require('request')

const getForecastData = (lat, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=2941ef0ea77260b0ac9c836f8040ac82&query= '+ lat +', '+ longitude
debugger
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect service', undefined)
        } else if(body.error) {
            callback('Unable to find the location please try again', undefined)
        } else {
            callback(undefined, 'Temperature: '+body.current.temperature+' degrees and weather is '+ body.current.weather_descriptions[0])
        }
    })
}

module.exports = getForecastData