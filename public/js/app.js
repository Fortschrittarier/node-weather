

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const loc = search.value

    if(loc === '') {
        msg1.textContent = ''
        msg2.textContent = ''
        return;
    }

    msg1.textContent = 'loading...'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + loc).then((res) => {
    res.json().then((data) => {
        if(data.error) {
            return msg1.textContent = data.error
        }
        msg1.textContent = data.location
        msg2.textContent = data.forecast
    })
})

})