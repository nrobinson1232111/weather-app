const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#message-1')
const m2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const location = search.value

    m2.innerText = null
    m1.innerText = "Loading"

    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((weather_data)=>{
            if(weather_data.error){
                m1.innerText = null
                return m2.innerText = weather_data.error
            }

            m1.innerText = weather_data.location 
            m2.innerText = weather_data.forecast + 'F'
        })
    })
})

