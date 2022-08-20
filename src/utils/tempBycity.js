const request = require('request')

const tempByCityName = (cityName, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=d70b68152c79ac87b7e33d63ec09b403&units=metric'

    request({ url: url, json: true}, (error, response) => {
        if(error){
            // console.log(error)
            callback('Unable to connect to weather services!', undefined)
        }else if(response.body.message){
            callback('Unable to get location please enter correct name. ')
        }else{
            callback(undefined, 'Current weather is : '+ response.body.main.temp+ ' C')
        }
    })
}  

module.exports = tempByCityName