import {validateMobile , validateEmail , validatePassword ,
    verifyPassword, validateName, validateUserName ,
    validateFullName ,  validateAccountNumber} from "./validate.js" 
import {sendData , putData , getData , selector , selectAll , createElement } from "./api.js" 

/** Create an object to hold the profile information  */
const ProfileModel = {
    validFormValue : {} , 
    passwordValue   : {} ,
    bankNames : ["First Bank" , "Access Bank" ,"Access Diamond Bank" , 
     "UBA" , "FCMB" , "Sterling Bank"  , "Zenith Bank" , "Fidelity Bank" , 
     "GTB" , "Union Bank" , "Citibank" , "Ecobank" , "Heritage Bank" , 
     "Keystone Bank" , "Polaris Bank" , "Stanbic IBTC" , "Standard Chartered" ,
     , "Unity Bank" , "Wema Bank" , "SunTrust Bank" , "Titan Trust" , "Providus Bank" , "Jaiz Bank" ,
     "Globus Bank"
        ] ,
    personalInfoValue : {} , 
    validAccountInformation : {} ,
    validPasswordValue : {} 
} 
/** Create an object to hold the profile information  */

// Object to handle the view 
class ProfileView  { 
    constructor() {
        this.select = selector("#stateR") 
        this.infoInput = Array.from(this.getElements(".form-control")) 
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
//Object to handle the model 

class ProfileController {
    constructor(view , model) {
        this.view = new view()
        this.model = model
        this.addEvent() 
    }
    handleChange(event){   
        if (event.target.id === "bankName") {
            event.target.value = event.target.value 
            event.target.classList.add("is-valid")
            ProfileModel.validAccountInformation[`${event.target.id}`] = event.target.value 
            
        }  
		if (event.target.id === "accountNumber") { 
            if(event.target.nextElementSibling.tagName === "P"){
                event.target.nextElementSibling.remove()
            } 
            let p = createElement("p")   
            if (validateAccountNumber(event.target.value.trim()).value) {
                ProfileModel.validAccountInformation[`${event.target.id}`] = event.target.value 
            }else { 
                p.textContent = "Enter a correct account number of 10 digits" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.insertBefore(p, event.target.nextElementSibling)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }
		if (event.target.id === "accountName") { 
            if(event.target.nextElementSibling.tagName === "P"){
                event.target.nextElementSibling.remove()
            }  
            let p = createElement("p")   
            if (validateFullName(event.target.value.trim()).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                ProfileModel.validAccountInformation[`${event.target.id}`] = event.target.value 
            }else { 
                p.textContent = "Please , provide a name that matches the account" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.insertBefore(p, event.target.nextElementSibling)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        } 
        if (event.target.id === "bitcoin") { 
            if(event.target.nextElementSibling.tagName === "P"){
                event.target.nextElementSibling.remove()
            }  
            let p = createElement("p")   
            if (e.target !== "") {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                ProfileModel.validAccountInformation[`${event.target.id}`] = event.target.value 
            }else { 
                p.textContent = "Please , provide a name that matches the account" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.insertBefore(p, event.target.nextElementSibling)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        } 
		if (event.target.id === "userName") { 
            if ( event.target.parentNode.lastChild.tagName === "p") {
                event.target.parentNode.lastChild.remove()    
            } 
            let p = createElement("p")   
            if (validateUserName(event.target.value.trim()).value) {
                
                ProfileModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.remove()
                }
                p.textContent = "Username should only be alphanumeric" 
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
                ProfileModel.validFormValue[`${event.target.id}`] = event.target.value 
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

        if (event.target.id === "telephone") {      
            let p = createElement("p")   
            if (validateMobile(event.target.value.trim()).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                ProfileModel.validFormValue[`${event.target.id}`] = event.target.value 
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
    }

    handleBlur(event){ 
        //Check if the last password is Ok
        if (event.target.id === "oldPassword") { 
            if ( event.target.parentNode.lastChild.tagName === "P") {
                event.target.parentNode.lastChild.remove()    
            }     
            let p = createElement("p")   
            if (validatePassword(event.target.value).value) {
                //Now , send a request to the server to confirm if the password is correct 
                let data = {
                    password : event.target.value.trim()
                } 
                sendData("/admin/settings/check-password" , {data})
                .then(res => {

                    if (res.message){
                        p.textContent = "" 
                        p.classList.add("valid-feedback")
                        event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                        event.target.classList.add("is-valid")
                        ProfileModel.passwordValue[`${event.target.id}`] = event.target.value 
                        Array.from(selectAll(".password"))
                        .filter(e => e.id !== event.target.id)
                        .map(e =>e.disabled = false) 

                    }else {
                        if(event.target.nextElementSibling){
                            event.target.nextElementSibling.remove()
                        }
                        p.textContent = "Password not correct" 
                        p.classList.add("invalid-feedback") 
                        event.target.classList.add("is-invalid")
                        event.target.parentNode.appendChild(p)
                        event.target.value = event.target.value 
                        event.target.removeEventListener("focus" , this.handleBlur)
                    }
                })
                .catch(err => {
                    p.textContent = "An error occured"
                })
                 
                
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
                ProfileModel.passwordValue[`${event.target.id}`] = event.target.value 
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
        if (event.target.id === "confirmPassword") { 
            if ( event.target.parentNode.lastChild.tagName === "P") {
                event.target.parentNode.lastChild.remove()    
            }     
            let p = createElement("p")   
            console.log(verifyPassword(event.target , selector("#password")).value)
            if (verifyPassword(event.target , selector("#password")).value) {
                p.textContent = "" 
                p.classList.add("valid-feedback") 
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                ProfileModel.passwordValue[`${event.target.id}`] = event.target.value 
            }else { 
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.remove()
                }
                p.textContent = "Password does not match" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.appendChild(p)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        } 
        
    }
    handleSubmit(event) { 
        if (event.target.id === "change") {     
            event.target.style.background     = "rgb(26, 141, 70)" 
            event.target.style.color          = "#fff"
            event.preventDefault()  
            event.target.style.background     = event.target.style.background
            const { accountName , accountNumber , bankName  }       = ProfileModel.validAccountInformation
            const data = {
                accountName      : accountName        || selector("#accountName").value, 
                accountNumber    : accountNumber      || selector("#accountNumber").value , 
                bankName         : bankName           || selector("#bankName").value , 
                // bitcoin          : bitcoin            || selector("#bitcoin").value , 
            } 
            let serverMessage = createElement("p") 
            let allInfos= Array.from(selectAll(".bank")) 
            if (allInfos.every(e => e.value !== "")  || allInfos.every(e => e.classList.contains("is-valid"))){ 
                putData("/admin/settings/account" , {data}) 
                .then(res => {
                    console.log(res.message) 
                    if (event.target.parentNode.firstChild.tagName === "P"){
                        event.target.parentNode.firstChild.remove()
                    }
                    serverMessage.textContent = res.message 
                    let firstChild = event.target.parentNode.firstChild 
                    event.target.parentNode.insertBefore(serverMessage , firstChild)
                })
                .catch(err => console.error(err))  
            }else {
                if (event.target.parentNode.firstChild.tagName === "P"){
                    event.target.parentNode.firstChild.remove()
                }
                serverMessage.textContent = "Please , fill the form properly" 
                let firstChild = event.target.parentNode.firstChild 
                event.target.parentNode.insertBefore(serverMessage , firstChild) 
            }
        } 
		if (event.target.id === "infoUpdate") {     
            event.preventDefault()  
            event.target.style.background = event.target.style.background
            const {userName , email , telephone } = ProfileModel.validFormValue 
            const data = {
                userName : userName     || selector("#userName").value ,
                email    : email        || selector("#email").value, 
                phoneNumber : telephone || selector("#telephone").value
            } 
            let serverMessage = createElement("p") 
            let allInfos= Array.from(selectAll(".info")) 
            if (allInfos.every(e => e.value !== "")  || allInfos.every(e => e.classList.contains("is-valid"))){ 
                putData("/admin/settings" , {data}) 
                .then(res => {
                    console.log(res.message) 
                    if (event.target.parentNode.parentNode.firstChild.tagName === "P"){
                        event.target.parentNode.parentNode.firstChild.remove()
                    }
                    serverMessage.textContent = res.message 
                    let firstChild = event.target.parentNode.parentNode.firstChild 
                    event.target.parentNode.parentNode.insertBefore(serverMessage , firstChild)
                })
                .catch(err => console.error(err))  
            }else {
                if (event.target.parentNode.parentNode.firstChild.tagName === "P"){
                    event.target.parentNode.parentNode.firstChild.remove()
                }
                serverMessage.textContent = "Please , fill the form properly" 
                let firstChild = event.target.parentNode.parentNode.firstChild 
                event.target.parentNode.parentNode.insertBefore(serverMessage , firstChild) 
            }
        } 
        if (event.target.id === "passwordUpdate"){
            event.preventDefault()  
            
            let serverMessage = createElement("p") 
            let allInfos= Array.from(selectAll(".password")) 
            if (allInfos.every(e => e.classList.contains("is-valid"))){  
                const {password , confirmPassword } = ProfileModel.passwordValue
                const data = {
                    password           : password,
                    confirmPassword    :confirmPassword, 
                } 
                serverMessage.textContent = "Loading ..... " //res.message 
                let firstChild = event.target.parentNode.parentNode.firstChild 
                event.target.parentNode.parentNode.insertBefore(serverMessage , firstChild)
                sendData("/admin/settings/reset-password" , {data}) 
                .then(res => {
                    console.log(res.message) 
                    if (event.target.parentNode.parentNode.firstChild.tagName === "P"){
                        event.target.parentNode.parentNode.firstChild.remove()
                    }
                    serverMessage.textContent = res.message 
                    let firstChild = event.target.parentNode.parentNode.firstChild 
                    event.target.parentNode.parentNode.insertBefore(serverMessage , firstChild)
                })
                .catch(err => console.error(err))  
            }else {
                if (event.target.parentNode.parentNode.firstChild.tagName === "P"){
                    event.target.parentNode.parentNode.firstChild.remove()
                }
                serverMessage.textContent = "Please , fill the form properly" 
                let firstChild = event.target.parentNode.parentNode.firstChild 
                event.target.parentNode.parentNode.insertBefore(serverMessage , firstChild) 
            }
        }   
        
    }
    handleClick(event){
        if (event.target.id === "revealPass"){ 
            let sibling = event.target.previousElementSibling
            sibling.type = sibling.type === "text" ? "password" : "text" 
            
        }
    }
    handleFocus(e){
        
		if ( e.target.id === "bankName") { 
            ProfileModel.bankNames.sort((a , b) => a.localeCompare(b)).map(bank => {
                let option = createElement("option") 
                option.value = bank
                option.textContent = bank
                e.target.append(option) 
            })
        }
    }
    addEvent() {
        this.view.infoInput.map(field => {
            field.addEventListener ("change" ,  this.handleChange)
            field.addEventListener("blur" , this.handleBlur) 
            field.addEventListener("click" , this.handleSubmit) 
            field.addEventListener("change" , this.handleSelect) 
            field.addEventListener("focus" , this.handleFocus)
        })
        selector("#passwordUpdate").addEventListener("click" , this.handleSubmit) 
        selector("#revealPass").addEventListener("click" , this.handleClick)
        window.addEventListener("load" , event => {
            Array.from(selectAll(".password"))
            .filter(e => e.id !== "oldPassword")
            .map(e =>e.disabled = true)
        })
    }
} 

const app = new ProfileController(ProfileView , ProfileModel)
