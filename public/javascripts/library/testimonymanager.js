import {
    validateMobile , validateEmail , validatePassword ,
    verifyPassword, validateName, validateUserName ,
    validateFullName ,  validateAccountNumber
} from "./validate.js" 
import {sendData , putData , getData ,deleteResource ,  selector , selectAll , createElement } from "./api.js"  

let testimonyIdentifier    = Array.from(selectAll(".id"))
// let tableBody         = selector("tbody") 
let approveButton     = selector("#approveButton") 
let hideButton        = selector("#hideButton") 
let deleteButton      = selector("#delete") 
let createButton      = selector("#create") 
let deleteTestimony   = selector("#deleteTestimony")
class RegistrationController {
    constructor() {
        this.addEvent() 
    }
    handleClick(event) {
        if (event.target.id === "approveButton"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let testimonies = [] 
            Array.from(selectAll(".check")).map((testament , i) => {
                if (testament.checked){ 
                    let id = testimonyIdentifier[i].getAttribute("data-identifier")
                   testimonies.push(id)
                }
            }) 
            putData(`/admin/testimonies/approve`  , {testimonies})
            .then(res => {
                console.log(res)
                Array.from(selectAll(".check")).map((e , i) => {
                    if (e.checked){ 
                        e.parentNode.previousSibling.textContent = res.message //remove() 
                    }
                }) 
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "hideButton"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let testimonies = [] 
            Array.from(selectAll(".check")).map((testament , i) => {
                if (testament.checked){ 
                    let id = testimonyIdentifier[i].getAttribute("data-identifier")
                    testimonies.push(id)
                }
            }) 
            putData(`/admin/testimonies/hide`  , {testimonies})
            .then(res => {
                console.log(res)
                Array.from(selectAll(".check")).map((e , i) => {
                    if (e.checked){ 
                        e.parentNode.previousSibling.textContent = res.message
                    }
                }) 
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "delete"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let testimonies = [] 
            Array.from(selectAll(".check")).map((testament , i) => {
                if (testament.checked){ 
                    let id = testimonyIdentifier[i].getAttribute("data-identifier")
                    testimonies.push(id)
                }
            }) 
            putData(`/admin/testimonies/delete`  , {testimonies})
            .then(res => {
                console.log(res)
                Array.from(selectAll(".check")).map((e , i) => {
                    if (e.checked){ 
                        e.parentNode.parentNode.remove() 
                    }
                }) 
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "create"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            event.preventDefault()
            sendData(`/testimonies`  , {
                title   : selector("#title").value.trim() , 
                content : selector("#content").value.trim()
            })
            .then(res => {
                selector("#server").textContent = res.message
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "deleteTestimony"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            getData(`${event.target.getAttribute("data-identifier")}`) 
            .then(res => {
                event.target.parentNode.remove()
            })
            .catch(err => console.error(err))
        }
        
    }
    addEvent() {
        if(approveButton)  approveButton.addEventListener("click" , this.handleClick) 
        if(hideButton)     hideButton.addEventListener("click" ,    this.handleClick)
        if(deleteButton)      deleteButton.addEventListener("click" ,  this.handleClick)
        if(createButton)      create.addEventListener("click" ,  this.handleClick) 
        if(deleteTestimony)   deleteTestimony.addEventListener("click" ,  this.handleClick)
    }
} 

new RegistrationController()
