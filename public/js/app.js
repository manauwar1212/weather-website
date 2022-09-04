console.log('Client side javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((res) =>{
    res.json().then((data) =>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = 'Address: ' + data.location
            messageTwo.textContent = 'Current Temperature: ' + data.forecast.currentTemp
            messageThree.textContent = 'Forecast: ' + data.forecast.description
        }
    })
})
})
