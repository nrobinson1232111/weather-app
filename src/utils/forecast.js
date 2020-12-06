const axios = require('axios');

const forecast = (longitude, lattitude, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=b51372175d72601663a0707a3f9b3d0f&query=${lattitude},${longitude}&units=f`;

    axios.get(weatherUrl).then(({data}={}) =>{

        if(!data.error){
            callback(undefined, {
                name: data.location.name,
                weather_descriptions: data.current.weather_descriptions[0], 
                temperature: data.current.temperature,
                feelsLike: data.current.feelslike,
                humidity: data.current.humidity
            })
        } else{
            callback({error: 'Error with API entry'}, undefined);
        }
    }).catch((error) => {
        callback({error: 'Unable to access API.'}, undefined);
    })
}

module.exports = forecast;