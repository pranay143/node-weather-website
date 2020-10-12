const request = require('request')

const geoCode = (country, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +country+ '.json?access_token=pk.eyJ1IjoiY2hpbm5pc3ByYW5heSIsImEiOiJja2Y1YjhobmwwbGZtMzNuc2luNG9lZDZsIn0.LGt-iwyTgl83KWmJY4PROQ'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect service', undefined)
        } else if(body.features.length === 0) {
            callback('Unable find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}


module.exports = geoCode