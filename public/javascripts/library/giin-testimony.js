import {validateMobile , validateEmail , validatePassword ,
     verifyPassword, validateName, validateUserName ,
     validateFullName ,  validateAccountNumber} from "./validate.js" 
import {sendData , getData ,deleteResource ,  selector , selectAll , createElement } from "./api.js"  
/**
 * Ensure that the username , email , phone number , account name , account number , 
 * bitcoin wallet is unique. Send request to the server while registration is ongion
 */
let userIdentifier = Array.from(selectAll(".email"))
let tableBody = selector("tbody") 
let deleteButton = selector("#deleteButton")
let unBlockButton = selector("#unBlockButton")
const RegistrationModel = {
    validFormValue : {} ,
}
class RegistrationView  { 
    constructor() {
        this.select = selector("#stateR") 
        this.checkBox = Array.from(this.getElements(".check")) 
        this.inputs = Array.from(this.getElements(".form-control"))
        this.submitButton = selector("#submitButton")  
        
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
    handleClick(event) {
        if (event.target.id === "deleteButton"){ 
            event.preventDefault()
            let href = event.target.href 
            if (confirm("Are you sure you want to delete this testimony ?")){ 
               deleteResource(href)
                event.target.parentNode.remove()
            }
        }
    }
    addEvent() {
        this.view.inputs.map(field => {
            field.addEventListener ("focus" ,  this.handleFocus)
            field.addEventListener("blur" , this.handleBlur) 
            field.addEventListener("click" , this.handleSubmit) 
            field.addEventListener("change" , this.handleSelect) 
            window.addEventListener("load" , this.handleLoad) 
        })
        deleteButton.addEventListener("click" , this.handleClick)
    }
} 

const app = new RegistrationController(RegistrationView , RegistrationModel)
