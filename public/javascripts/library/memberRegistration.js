import {validateMobile , validateEmail , validatePassword ,
     verifyPassword, validateName, validateUserName ,
     validateFullName ,  validateAccountNumber} from "./validate.js" 
import {sendData , getData , selector , selectAll , createElement } from "./api.js"  
/**
 * Ensure that the username , email , phone number , account name , account number , 
 * bitcoin wallet is unique. Send request to the server while registration is ongion
 */

const RegistrationModel = {
    bankNames : ["First Bank" , "Access Bank" ,"Access Diamond Bank" , 
     "UBA" , "FCMB" , "Sterling Bank"  , "Zenith Bank" , "Fidelity Bank" , 
     "GTB" , "Union Bank" , "Citibank" , "Ecobank" , "Heritage Bank" , 
     "Keystone Bank" , "Polaris Bank" , "Stanbic IBTC" , "Standard Chartered" ,
     , "Unity Bank" , "Wema Bank" , "SunTrust Bank" , "Titan Trust" , "Providus Bank" , "Jaiz Bank" ,
     "Globus Bank"
        ] ,
    validFormValue : {}
}
class RegistrationView  { 
    constructor() {
        this.select = selector("#stateR") 
        this.inputs = Array.from(this.getElements(".chronicle-form"))
        this.submitButton = selector("#submit") 
    } 
    createElement(tag){
		return document.createElement(tag)  
	}
	getElement(target) {
		return document.querySelector(target) 
    } 
	getElements(target) {
		return document.querySelectorAll(target) 
	} 
} 

class RegistrationController {
    constructor(view , model) {
        this.view = new view()
        this.model = model
        this.addEvent() 
    }

    handleFocus(e){
        
		if ( e.target.id === "bankName") { 
            RegistrationModel.bankNames.sort((a , b) => a.localeCompare(b)).map(bank => {
                let option = createElement("option") 
                option.value = bank
                option.textContent = bank
                e.target.append(option) 
            })
        }
    }
    handleSelect(event) {
        if (event.target.id === "bankName") {
            event.target.value = event.target.value 
            RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
        }
    }

    handleBlur(event) {    
		if (event.target.id === "accountNumber") { 
            if ( event.target.parentNode.lastChild.tagName === "p") {
                event.target.parentNode.lastChild.remove()    
            } 
            let p = createElement("p")   
            if (validateAccountNumber(event.target.value.trim()).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.remove()
                }
                p.textContent = "Enter a correct account number of 10 digits" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.appendChild(p)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }
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
		if (event.target.id === "accountName") { 
            if ( event.target.parentNode.lastChild.tagName === "p") {
                event.target.parentNode.lastChild.remove()    
            } 
            let p = createElement("p")   
            if (validateFullName(event.target.value.trim()).value) {
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
		if (event.target.id === "email") { 
            if ( event.target.parentNode.lastChild.tagName === "p") {
                event.target.parentNode.lastChild.remove()    
            } 
            let p = createElement("p")   
            if (validateEmail(event.target.value).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.remove()
                }
                p.textContent = "Please , provide a valid email address" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.appendChild(p)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }

        if (event.target.id === "phoneNumber") {      
            let p = createElement("p")   
            if (validateMobile(event.target.value.trim()).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.remove()
                }
                p.textContent = "Phone number must be 11 digits and begin with zero" 
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
    handleChange(event) {
        if (event.target.id === "referralNo") {
            event.target.value = event.target.getAttribute("data-code") 
        }
    }
    handleSubmit(event) { 
		if (event.target.id === "submit") {   
            getData("https://api.telegram.org/bot1092786133:AAGlnYntMzlwNQya84d2jTjBxUiJYVz3G5c/getUpdates")
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err))  
            let serverMessage = createElement("p")
            if( RegistrationModel.validFormValue.email && RegistrationModel.validFormValue.phoneNumber 
                && RegistrationModel.validFormValue.password && RegistrationModel.validFormValue.bankName 
                && RegistrationModel.validFormValue.accountNumber && RegistrationModel.validFormValue.accountName ){

                if (selector("#agreement").checked) {
                
                    console.log("Redirecting...")

                }else {
                    event.preventDefault()
                    if ( event.target.previousSibling.tagName === "P") {
                        event.target.previousSibling.remove()    
                    } 
                    serverMessage.textContent = "Accept our terms and conditions." 
                    serverMessage.classList.add("err")
                    event.target.parentNode.insertBefore(serverMessage , event.target)
                }
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
    handleLoad(e){
        let code  = selector("#referralNo")
        code.value = code.getAttribute("data-code") 
        console.log(code.value)
    }
    addEvent() {
        this.view.inputs.map(field => {
            field.addEventListener ("focus" ,  this.handleFocus)
            field.addEventListener("blur" , this.handleBlur) 
            field.addEventListener("click" , this.handleSubmit) 
            field.addEventListener("change" , this.handleSelect) 
            window.addEventListener("load" , this.handleLoad)
        })
        selector("#referralNo").addEventListener("change" , this.handleChange)
    }
} 

const app = new RegistrationController(RegistrationView , RegistrationModel)
