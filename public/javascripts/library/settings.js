import {
    validateMobile , 
    validateEmail , 
    validatePassword ,
    verifyPassword, 
    validateFullName , 
    validateAccountNumber 
} from "./validate.js" 
import {
    sendData , 
    getData ,
    selector , 
    selectAll , 
    createElement ,
    putData
} from "./api.js"  

/** Create an object to hold the profile information  */
const ProfileModel = {
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

// Object to handle the view 
class ProfileView  { 
    constructor() {
        this.select = selector("#stateR") 
        this.inputs = Array.from(this.getElements(".form-control"))
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
    /**
     * @description handleblur handles blur event on the specified fields targeted 
     * @params{String} Is the event object for the particular event that occurs 
     * @return{String} Returns a string value 
     */
    handleBlur(event){  
        if (event.target.id === "oldPassword"){
            let serverMessage = createElement("p")   
            if(event.target.nextElementSibling.tagName === "P"){
                event.target.nextElementSibling.remove()
            } 
            let oldPassword = event.target.value.trim() 
            getData(`/user/verify-password?password=${oldPassword}`) 
            .then(res => {
                if (res.message){
                    serverMessage.textContent = "" 
                    serverMessage.classList.add("valid-feedback") 
                    event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                    event.target.classList.add("is-valid") 
                }else {
                    serverMessage.textContent = "Wrong password" 
                    serverMessage.classList.add("invalid-feedback") 
                    event.target.classList.add("is-invalid")
                    event.target.parentNode.insertBefore(serverMessage , event.target.nextElementSibling)
                }
            })
            .catch(err => {
                console.error(err)
            })
        }
        if (event.target.id === "newPassword") { 
            if(event.target.nextElementSibling.tagName === "P"){
                event.target.nextElementSibling.remove()
            }     
            let p = createElement("p")   
            if (validatePassword(event.target.value).value) {
                console.log(event.target.value)
                p.textContent = "" 
                p.classList.add("valid-feedback") 
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                ProfileModel.validPasswordValue[`${event.target.id}`] = event.target.value 
            }else { 
                p.textContent = "Password must be 8 or more characters" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.insertBefore(p, event.target.nextElementSibling)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        } 
        if (event.target.id === "confirmPassword") { 
            if(event.target.nextElementSibling.tagName === "P"){
                event.target.nextElementSibling.remove()
            }      
            let p = createElement("p")   
            if (verifyPassword(event.target , selector("#newPassword")).value) {
                p.textContent = "" 
                p.classList.add("valid-feedback") 
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                ProfileModel.validPasswordValue[`${event.target.id}`] = event.target.value 
            }else { 
                p.textContent = "Password does not match" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.insertBefore(p, event.target.nextElementSibling)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
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
    /**
     * @description 
     * @param  {String} event The event that is to be listened to 
     * @return {String}
     */
    handleChange(event){ 
        if (event.target.id === "bankName") {
            event.target.value = event.target.value 
            event.target.classList.add("is-invalid")
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

        // Updating Personal Information 
		if (event.target.id === "email") { 
            if(event.target.nextElementSibling.tagName === "P"){
                event.target.nextElementSibling.remove()
            }  
            let p = createElement("p")   
            if (validateEmail(event.target.value).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                ProfileModel.personalInfoValue[`${event.target.id}`] = event.target.value.trim() 
            }else { 
                p.textContent = "Please , provide a valid email address" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.insertBefore(p, event.target.nextElementSibling)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }
        if (event.target.id === "telephone") {      
            if(event.target.nextElementSibling.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let p = createElement("p")   
            if (validateMobile(event.target.value.trim()).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                ProfileModel.personalInfoValue[`${event.target.id}`] = event.target.value.trim() 
            }else { 
                p.textContent = "Phone number must be 11 digits and begin with zero" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.insertBefore(p, event.target.nextElementSibling)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }  
    }
    handleSubmit(event) { 
		if (event.target.id === "update") {     
            event.target.style.background     = "rgb(26, 141, 70)" 
            event.target.style.color          = "#fff"
            event.preventDefault()  
            event.target.style.background     = event.target.style.background
            const { email , telephone }       = ProfileModel.personalInfoValue 
            const data = {
                email       : email        || selector("#email").value, 
                phoneNumber : telephone    || selector("#telephone").value
            } 
            let serverMessage = createElement("p") 
            let allInfos= Array.from(selectAll(".info")) 
            if (allInfos.every(e => e.value !== "")  || allInfos.every(e => e.classList.contains("is-valid"))){ 
                putData("/dashboard/account/settings" , {data}) 
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
        if (event.target.id === "change") {     
            event.target.style.background     = "rgb(26, 141, 70)" 
            event.target.style.color          = "#fff"
            event.preventDefault()  
            event.target.style.background     = event.target.style.background
            const { accountName , accountNumber , bankName , bitcoin }       = ProfileModel.validAccountInformation
            const data = {
                accountName      : accountName        || selector("#accountName").value, 
                accountNumber    : accountNumber      || selector("#accountNumber").value , 
                bankName         : bankName           || selector("#bankName").value , 
                bitcoin          : bitcoin            || selector("#bitcoin").value , 
            } 
            let serverMessage = createElement("p") 
            let allInfos= Array.from(selectAll(".bank")) 
            if (allInfos.every(e => e.value !== "")  || allInfos.every(e => e.classList.contains("is-valid"))){ 
                putData("/user/account" , {data}) 
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
        if (event.target.id === "reset"){
            event.target.style.background = "rgb(26, 141, 70)" 
            event.target.style.color = "#fff"
            event.preventDefault()  
            let serverMessage = createElement("p") 
            let allInfos= Array.from(selectAll(".password")) 
            if (allInfos.every(e => e.classList.contains("is-valid"))){  
                const {newPassword , confirmPassword } = ProfileModel.validPasswordValue
                const data = {
                    password           : newPassword,
                    confirmPassword    :confirmPassword, 
                } 
                serverMessage.textContent = "Loading ..... " 
                let firstChild = event.target.parentNode.firstChild 
                event.target.parentNode.insertBefore(serverMessage , firstChild)
                putData("/user/verify-password" , {data}) 
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
                serverMessage.textContent = "Please , endeavor to enter correct details" 
                let firstChild = event.target.parentNode.parentNode.firstChild 
                event.target.parentNode.parentNode.insertBefore(serverMessage , firstChild) 
            }
        }   
    }
    addEvent() {
        this.view.inputs.map(field => {
            field.addEventListener ("focus" ,  this.handleFocus)
            field.addEventListener("blur" , this.handleBlur) 
            field.addEventListener("click" , this.handleSubmit) 
            field.addEventListener("change" , this.handleChange) 
        })
    }
} 

const app = new ProfileController(ProfileView , ProfileModel)
