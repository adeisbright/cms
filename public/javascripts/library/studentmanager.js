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
let blockButton = selector("#blockButton")
let unBlockButton = selector("#unBlockButton")
const RegistrationModel = {
    validFormValue : {} ,  
    bankNames : ["First Bank" , "Access Bank" ,"Access Diamond Bank" , 
     "UBA" , "FCMB" , "Sterling Bank"  , "Zenith Bank" , "Fidelity Bank" , 
     "GTB" , "Union Bank" , "Citibank" , "Ecobank" , "Heritage Bank" , 
     "Keystone Bank" , "Polaris Bank" , "Stanbic IBTC" , "Standard Chartered" ,
     , "Unity Bank" , "Wema Bank" , "SunTrust Bank" , "Titan Trust" , "Providus Bank" , "Jaiz Bank" ,
     "Globus Bank"
        ] ,
}
class RegistrationView  { 
    constructor() {
        this.select = selector("#stateR") 
        this.checkBox = Array.from(this.getElements(".check")) 
        this.inputs = Array.from(this.getElements(".form-control"))
        this.submitButton = selector("#submitButton")  
        this.deleteButton = selector("#deleteButton")
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
           
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let p  = createElement("p") 
            p.textContent  = "Clicked" 
            let usersToDelete = [] 
            Array.from(selectAll(".check")).map((e , i) => {
                if (e.checked){ 
                    let email = userIdentifier[i].getAttribute("data-identifier")
                    usersToDelete.push(email)
                    console.log(usersToDelete)
                }
            }) 
            sendData(`/admin/users/delete`  , {usersToDelete})
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
        if (event.target.id === "blockButton"){
           console.log("Hi")
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let p  = createElement("p") 
            p.textContent  = "Clicked" 
            let usersToDelete = [] 
            Array.from(selectAll(".check")).map((e , i) => {
                if (e.checked){ 
                    let email = userIdentifier[i].getAttribute("data-identifier")
                    usersToDelete.push(email)
                    console.log(usersToDelete)
                }
            }) 
            sendData(`/admin/users/block`  , {usersToDelete})
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
        if (event.target.id === "unBlockButton"){
            console.log("Hi")
             if(event.target.parentNode.lastChild.tagName === "P"){
                 event.target.nextElementSibling.remove()
             }
             let p  = createElement("p") 
             p.textContent  = "Clicked" 
             let usersToDelete = [] 
             Array.from(selectAll(".check")).map((e , i) => {
                 if (e.checked){ 
                     let email = userIdentifier[i].getAttribute("data-identifier")
                     usersToDelete.push(email)
                     console.log(usersToDelete)
                 }
             }) 
             sendData(`/admin/users/unblock`  , {usersToDelete})
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
    }
    handleSelect(event) {
        if (event.target.id === "flag") {
            event.target.value = event.target.value 
            event.target.classList.add("is-valid")
            RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
        }
        if (event.target.id === "bankName") {
            event.target.value = event.target.value 
            event.target.classList.add("is-valid")
            RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
        }
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
    handleBlur(event) {    
		if (event.target.id === "userName") { 
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
                p.textContent = "Username can only be alphanumeric" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.appendChild(p)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }
        if (event.target.id === "email"){
            if ( event.target.parentNode.lastChild.tagName === "p") {
                event.target.parentNode.lastChild.remove()    
            } 
            let p = createElement("p")   
            if (validateEmail(event.target.value.trim()).value) {
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
            if ( event.target.parentNode.lastChild.tagName === "p") {
                event.target.parentNode.lastChild.remove()    
            } 
            let p = createElement("p")   
            if (validatePassword(event.target.value.trim()).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.remove()
                }
                p.textContent = "Password must be 8 characters or more" 
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
        if (event.target.id === "telephone") {      
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
        if (event.target.id === "accountNumber") {      
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
        if (event.target.id === "accountName") {      
            let p = createElement("p")   
            if (validateFullName(event.target.value.trim()).value) {
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.remove()
                }
                p.textContent =  "Please , provide a name that matches the account" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
                event.target.parentNode.appendChild(p)
            }
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        } 
        // if (event.target.id === "bitcoinWallet") {      
        //     let p = createElement("p")   
        //     if (true) {
        //         event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
        //         event.target.classList.add("is-valid")
        //         RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
                
        //     }else { 
        //         if(event.target.nextElementSibling){
        //             event.target.nextElementSibling.remove()
        //         }
        //         p.textContent =  "Please , provide a name that matches the account" 
        //         p.classList.add("invalid-feedback") 
        //         event.target.classList.add("is-invalid")
        //         event.target.parentNode.appendChild(p)
        //     }
        //     event.target.value = event.target.value 
		// 	event.target.removeEventListener("focus" , this.handleBlur)
        // } 
        
    }
    handleSubmit(event) { 
		if (event.target.id === "submitButton") {   
            event.target.style.background = "#339"
            let inputIDS = [
                "userName" , "email" , "accountNumber" ,
                "accountName" , "accountNumber" , "password" ,
                "telephone" , "bankName"  
            ]
            event.preventDefault() 
            let serverMessage = createElement("p") 
            let Message = createElement("p") 
            let allInput = Array.from(selectAll(".form-control")).filter(e => inputIDS.includes(e.id)) 
            if (allInput.every(e => e.classList.contains("is-valid"))){ 
                if (event.target.parentNode.parentNode.firstChild.tagName === "P"){
                    event.target.parentNode.parentNode.firstChild.remove()
                }
                let adminData = RegistrationModel.validFormValue 
                serverMessage.textContent = "Loading...." 
                let firstChild = event.target.parentNode.parentNode.firstChild 
                event.target.parentNode.parentNode.insertBefore(serverMessage , firstChild) 
                sendData("/admin/users" , {adminData}) 
                .then(res => {
                    if (event.target.parentNode.parentNode.firstChild.tagName === "P"){
                        event.target.parentNode.parentNode.firstChild.remove()
                    }
                    serverMessage.textContent = res.message
                    let firstChild = event.target.parentNode.parentNode.firstChild 
                    event.target.parentNode.parentNode.insertBefore(serverMessage , firstChild) 
                    if (res.admin){ 
                        const { 
                            userName , flag , email ,
                             telephone , accountName , 
                            accountNumber ,  bankName  
                        } = res.admin 

                        let tableRow         = createElement("tr") 
                        let serialNumberCell = createElement("td") 
                        let userNameCell     = createElement("td") 
                        let emailCell        = createElement("td") 
                        let accountNumberCell    = createElement("td") 
                        let accountNameCell    = createElement("td") 
                        let bankNameCell    = createElement("td") 
                        let telephoneCell    = createElement("td") 
                        let flagCell    = createElement("td") 
                        let actionCell       = createElement("td")
                        serialNumberCell.textContent = Number(tableBody.lastChild.firstChild.textContent) + 1 
                        userNameCell.textContent = userName 
                        emailCell.textContent    = email 
                        telephoneCell.textContent = telephone 
                        accountNameCell.textContent = accountName 
                        accountNumberCell.textContent = accountNumber 
                        bankNameCell.textContent = bankName 
                        flagCell.textContent = flag
                        let actionCheckBox = createElement("input") 
                        actionCheckBox.type = "checkbox" 
                        actionCheckBox.setAttribute("class" , "check") 
                        let actionUrl = createElement("a") 
                        actionUrl.href = `/admin/users/${res.admin._id}` 
                        actionUrl.setAttribute("class" , "normal-link") 
                        actionUrl.textContent = " View" 
                        actionCell.append(actionCheckBox , actionUrl) 
                        tableRow.append(
                            serialNumberCell , userNameCell , emailCell , 
                            telephoneCell ,accountNameCell , bankNameCell , accountNumberCell , 
                            bankNameCell , flagCell , 
                            actionCell)
                        tableBody.append(tableRow)
                    }
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
    addEvent() {
        this.view.inputs.map(field => {
            field.addEventListener ("focus" ,  this.handleFocus)
            field.addEventListener("blur" , this.handleBlur) 
            field.addEventListener("click" , this.handleSubmit) 
            field.addEventListener("change" , this.handleSelect) 
            window.addEventListener("load" , this.handleLoad) 
        })
        deleteButton.addEventListener("click" , this.handleClick)
        blockButton.addEventListener("click" , this.handleClick)
        unBlockButton.addEventListener("click" , this.handleClick)
    }
} 

const app = new RegistrationController(RegistrationView , RegistrationModel)
