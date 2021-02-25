import { selector, createElement } from "./api.js" ; 

const search = selector('#search')
const searchMobile = selector('#search-mobile')
const target = selector('.target')

const modal = selector('#myModal')
const mobileModal = selector('#mobileModal')
const main = selector('#main')
const backBtn = selector('#backBtn')

search.addEventListener('input', event => {
    modal.style.display = 'block'
    document.body.classList.add('modal-open')
    target.classList.add('modal-back', 'fade', 'show')
})

window.addEventListener('click', event => {
    if(event.target == modal){
        modal.style.display = 'none'
        document.body.classList.remove('modal-open')
        target.classList.remove('modal-back', 'fade', 'show')
    }
})

searchMobile.addEventListener('input', event => {
    backBtn.style.display = 'inline'
    main.style.display = 'none'
    mobileModal.style.display = 'block'
})

backBtn.addEventListener('click', event => {
    event.preventDefault()
    backBtn.style.display = 'none'
    main.style.display = 'block'
    searchMobile.value = ""
    if(mobileModal.style.display = "block"){
        mobileModal.style.display = "none"
    }
})