let selector = e => document.querySelector(e)

let enquiryBtn = selector("#enquiry-btn")
let chatBtn = selector("#chat-btn")
let otherParts = selector(".other-parts")
let enquiryBox = selector(".enquiry-box")
let chatBox = selector(".chat-box")
let productCard = selector(".product-card")

enquiryBtn.addEventListener('click', event => {
    event.preventDefault()
    otherParts.classList.toggle('d-none')
    enquiryBox.classList.toggle('d-none')
    productCard.classList.toggle('shift-left')
})

// chatBtn.addEventListener('click', event => {
//     event.preventDefault()
//     if(!(otherParts.classList.contains('d-none'))){
//         otherParts.classList.add('d-none')
//         enquiryBox.classList.add('d-none')
//         chatBox.classList.remove('d-none')
//         productCard.classList.add('shift-left')
//     }else if(!(enquiryBox.classList.contains('d-none'))){
//         enquiryBox.classList.add('d-none')
//         otherParts.classList.add('d-none')
//         chatBox.classList.remove('d-none')
//         productCard.classList.add('shift-left')
//     }else{
//         otherParts.classList.remove('d-none')
//         chatBox.classList.add('d-none')
//         productCard.classList.remove('shift-left')
//     }
// })