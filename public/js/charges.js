import {sendData , getData , selector , selectAll , createElement } from "./api.js"  
let submitButton = selector("#save") 
//Check if the selected user has being charged for the current period under review 

submitButton.addEventListener("click" , e => {
    e.preventDefault() 
    let target = e.target
    let data = {}
    Array.from(selectAll(".field")).map(field => {
        data[field.id] = field.value
    }) 
    console.log(data)
    sendData("/revenue/charges" , data)
    .then(res => {
        let alert = createElement("p") 
        alert.textContent = res.message 
        target.parentNode.appendChild(alert)
    }).catch(err => console.err(err))
}) 
