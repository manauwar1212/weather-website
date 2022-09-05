const request = require('request')
const dateTime = require('luxon')
const { DateTime } = require('luxon')
const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=e7278389ba620834ddbdb867dd42d101&query='+latitude +','+longitude + '&units=m'
    request({url:url,json:true},(error,response) =>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                currentTemp: response.body.current.temperature,
                feelsTemp: response.body.current.feelslike,
                description: response.body.current.weather_descriptions[0],
                time:response.body.location.localtime
            })
        }
    })
}

module.exports = forecast
