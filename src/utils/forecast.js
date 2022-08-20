const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(latitude) +'&lon='+ encodeURIComponent(longitude) +'&appid=d70b68152c79ac87b7e33d63ec09b403&units=metric'

// using shorthand method on object and destructuring object {} is objects
    request({ url, json: true}, (error,{ body }) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.message){
            callback('Unable to find location please check coordinates.')
        }else{
            callback(undefined,'Current weather is '+ body.main.temp)
        }
    })
}

module.exports = forecast