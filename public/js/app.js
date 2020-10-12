
const weatherForecast = document.querySelector('form')
const searchElement = document.querySelector('input')
const p1 = document.querySelector('#message-1')
const p2 = document.querySelector('#message-2')

weatherForecast.addEventListener('submit', (event) => {
    event.preventDefault()
    
    p1.textContent = 'Loading...'
    p2.textContent = ''

    fetch('http://localhost:7000/weather?state='+searchElement.value).then((responce) => {
    responce.json().then((data) => {
        if(data.error) {
            //console.log(data.error)
            p1.textContent = data.error
        } else {
           p1.textContent = data.location
           p2.textContent = data.forecastData
        }
        
    })
})
})