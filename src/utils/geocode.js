const axios = require('axios')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZHJuYXRlcm9iaW5zb24iLCJhIjoiY2tod3Z2bnhhMDMxYzJycGFpZTJmanhmeiJ9.bf1C6kzbd11Z5tIKYrtn0g&limit=1`

    axios.get(url).then(({data}={})=>{
        if(data.features.length === 0){
            callback({error: "Unable to find location. Try another search."}, undefined)
        }
        else{

            callback(undefined, {
                lattitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            })
        }

    }).catch((error)=>{
        callback({error: "Unable to connect to location services."}, undefined)
    })
}

module.exports = geocode