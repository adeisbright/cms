import {validatePassword , validateUserName } from "./validate.js" 
import {sendData  , selectAll , createElement, selector } from "./api.js"  
/**
 * Ensure that the username , email , phone number , account name , account number , 
 * bitcoin wallet is unique. Send request to the server while registration is ongion
 */

const RegistrationModel = {
    validFormValue : {}
}
class RegistrationView  { 
    constructor() {
        this.inputs = Array.from(selectAll(".filler"))
        this.submitButton = selector("#submit") 
    } 
} 

class RegistrationController {
    constructor(view , model) {
        this.view = new view()
        this.model = model
        this.addEvent() 
    }

    handleBlur(event) {    
        if (event.target.id === "userName"){
            if ( event.target.parentNode.lastChild.tagName === "p") {
                event.target.parentNode.lastChild.remove()    
            } 
            let p = createElement("p")   
            if (validateUserName(event.target.value.trim()).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.remove()
                }
                p.textContent = "Please , provide a name that matches the account" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.appendChild(p)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }
        if (event.target.id === "password") { 
            if ( event.target.parentNode.lastChild.tagName === "P") {
                event.target.parentNode.lastChild.remove()    
            }     
            let p = createElement("p")   
            if (validatePassword(event.target.value).value) {
                p.textContent = "" 
                p.classList.add("valid-feedback") 
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.remove()
                }
                p.textContent = "Password must be 8 or more characters" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.appendChild(p)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }
 
        
    }
    handleSubmit(event) { 
        event.preventDefault()
		if (event.target.id === "submit") {     
            let serverMessage = createElement("p")
            if(Array.from(selectAll(".filler")).every(input => input.classList.contains("is-valid"))){
                if ( event.target.previousSibling.tagName === "P") {
                    event.target.previousSibling.remove()    
                } 
                selector(".bright-form").submit()
            }else{
                event.preventDefault()
                if ( event.target.previousSibling.tagName === "P") {
                    event.target.previousSibling.remove()    
                } 
                serverMessage.textContent = "Please fill all neccessary fields." 
                serverMessage.classList.add("err")
                event.target.parentNode.insertBefore(serverMessage , event.target)
            }
           
		}
    }
    
    addEvent() {
        this.view.inputs.map(field => {
            field.addEventListener("blur" , this.handleBlur) 
        })
        selector("#submit").addEventListener("click" , this.handleSubmit)
        //})
    }
} 

const app = new RegistrationController(RegistrationView , RegistrationModel)
