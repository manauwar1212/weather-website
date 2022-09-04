const request = require('request')

const geocode = (address,callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=bc7ae91786d5a153f72f282d9a63d5d0&query='+ encodeURIComponent(address)
    request({url:url,json:true},(error,response) =>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(response.body.error){
            callback('Unable to find address, please try again with different address.',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.data[0].latitude,
                longitude:response.body.data[0].longitude,
                location:response.body.data[0].label
            })
        }
    })

}

module.exports = geocode