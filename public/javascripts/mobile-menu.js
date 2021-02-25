const selector = e => document.querySelector(e)

const mobile_button = selector('#mobile-open')
const mobile_options = selector('.mobile-nav-options')
const main = selector('#main')

mobile_button.addEventListener('click', event=> {
    event.preventDefault()
    mobile_options.classList.toggle('d-none')
    mobile_button.classList.toggle('break')
    main.classList.toggle('d-none')  
})