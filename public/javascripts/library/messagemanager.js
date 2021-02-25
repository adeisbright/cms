import {
    validateMobile , validateEmail , validatePassword ,
    verifyPassword, validateName, validateUserName ,
    validateFullName ,  validateAccountNumber
} from "./validate.js" 
import {sendData , putData , getData ,deleteResource ,  selector , selectAll , createElement } from "./api.js"  
let messageIdentifier = Array.from(selectAll(".id"))
let userSend          = selector("#userSend") 
let adminSend          = selector("#adminSend") 
let deleters          = Array.from(selectAll(".deleter"))
let deleteMessage    = selector("#deleteMessage")
class RegistrationController {
    constructor() {
        this.addEvent() 
    }
    handleClick(event) {
        if (event.target.id === "userSend"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let p = createElement("p")
            event.preventDefault()
            sendData(`/support/message`  , {
                title   : selector("#title").value.trim() , 
                content : selector("#content").value.trim()
            })
            .then(res => {
                p.textContent = res.message 
                event.target.parentNode.replaceChild(p , event.target)
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "adminSend"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let p = createElement("p")
            event.preventDefault()
            sendData(`/admin/inbox`  , {
                title   : selector("#title").value.trim() , 
                content : selector("#content").value.trim() , 
                userName : selector("#userName").value.trim() 
            })
            .then(res => {
                p.textContent = res.message 
                event.target.parentNode.replaceChild(p , event.target)
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "deleteMessage"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let messages = [] 
            Array.from(selectAll(".check")).map((message , i) => {
                if (message.checked){ 
                    let id = messageIdentifier[i].getAttribute("data-identifier")
                    messages.push(id)
                }
            })  
            putData(`/admin/inbox/delete`  , {messages})
            .then(res => {
                Array.from(selectAll(".check")).map((e , i) => {
                    if (e.checked){ 
                        e.parentNode.remove()
                    }
                }) 
            })
            .catch(err => console.error(err))
        } 
        if (event.target.classList.contains("deleter")){
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
        if(userSend)  userSend.addEventListener("click" , this.handleClick) 
        if(adminSend)  adminSend.addEventListener("click" , this.handleClick) 
        if(deleteMessage)  deleteMessage.addEventListener("click" , this.handleClick) 
        deleters.map(deleter => {
            deleter.addEventListener("click" , this.handleClick)
        })
    }
} 

new RegistrationController()
