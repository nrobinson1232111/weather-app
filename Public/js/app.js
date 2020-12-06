const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#message-1')
const m2 = document.querySelector('#message-2')
const m3 = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const location = search.value

    m1.innerText = "Loading"
    m2.innerText = null;
    m3.innerText = null

    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((weather_data)=>{
            if(weather_data.error){
                m1.innerText = null
                m3.innerText =null
                return m2.innerText = weather_data.error
            }

            m1.innerText = `Location: ${weather_data.location}`
            m2.innerText = 'The temperature is: ' + weather_data.forecast + 'F'
            m3.innerText = `The humidity is ${weather_data.humidity}%`
        })
    })
})

