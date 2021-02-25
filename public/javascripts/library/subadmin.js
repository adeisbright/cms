import {validateMobile , validateEmail , validatePassword ,
     verifyPassword, validateName, validateUserName ,
     validateFullName ,  validateAccountNumber} from "./validate.js" 
import {sendData , getData ,deleteResource ,  selector , selectAll , createElement } from "./api.js"  

/**
 * Ensure that the username , email , phone number , account name , account number , 
 * bitcoin wallet is unique. Send request to the server while registration is ongion
 */
let adminIdentifier = Array.from(selectAll(".email"))
let tableBody = selector("tbody") 
const RegistrationModel = {
    validFormValue : {}
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
                    let email = adminIdentifier[i].getAttribute("data-identifier")
                    usersToDelete.push(email)
                }
            }) 
            sendData(`/admin/delete-admin`  , {usersToDelete})
            .then(res => {
                console.log(res)
                Array.from(selectAll(".check")).map((e , i) => {
                    if (e.checked){ 
                        e.parentNode.parentNode.remove() 
                    }
                }) 
            })
            .catch(err => console.error(err))
            //console.log(usersToDelete)
            //event.target.parentNode.append(p)  
        }
    }
    
    handleSelect(event) {
        if (event.target.id === "role") {
            event.target.value = event.target.value 
            event.target.classList.add("is-valid")
            RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
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
        
    }
    
    handleSubmit(event) { 
		if (event.target.id === "submitButton") {   
            event.target.style.background = "#339"
            let inputIDS = ["role" , "userName" , "email" , "password" , "telephone"]
            event.preventDefault() 
            let loader = createElement("p") 
            let serverMessage = createElement("h4")
            let allInput = Array.from(selectAll(".form-control")).filter(e => inputIDS.includes(e.id)) 
            if (allInput.every(e => e.classList.contains("is-valid"))){ 
                if (event.target.parentNode.parentNode.firstChild.tagName === "P"){
                    event.target.parentNode.parentNode.firstChild.remove()
                }
                let adminData = RegistrationModel.validFormValue 
                // console.log(adminData)
                serverMessage.textContent = "Processing the information..." 
                loader.classList.add("loader") 
                let parentElement =  event.target.parentNode.parentNode
                parentElement.innerHTML = ""
                parentElement.append(loader , serverMessage)
                sendData("/admin/settings/subadmin" , {adminData})
                .then(res => {
                    // if (event.target.parentNode.parentNode.firstChild.tagName === "P"){
                    //     event.target.parentNode.parentNode.firstChild.remove()
                    // }
                    loader.style.display = "none"
                    serverMessage.textContent = res.message
                    let backButton = createElement("a") 
                    backButton.classList.add("backbutton")
                    backButton.href = "/admins/settings/subadmin"
                    backButton.textContent = "Go back"
                    parent.append(backButton)
                    // let firstChild = event.target.parentNode.parentNode.firstChild 
                    // event.target.parentNode.parentNode.insertBefore(serverMessage , firstChild) 
                    if (res.admin){ 
                        const { userName , email , phoneNumber , role } = res.admin
                        let tableRow = createElement("tr") 
                        let serialNumberCell = createElement("td") 
                        let userNameCell   = createElement("td") 
                        let emailCell      = createElement("td") 
                        let telephoneCell  = createElement("td")
                        let roleCell  = createElement("td") 
                        let actionCell     = createElement("td")
                        serialNumberCell.textContent = Number(tableBody.lastChild.firstChild.textContent) + 1 
                        userNameCell.textContent = userName 
                        emailCell.textContent    = email 
                        telephoneCell.textContent = phoneNumber  
                        roleCell.textContent = role
                        let actionCheckBox = createElement("input") 
                        actionCheckBox.type = "checkbox" 
                        actionCheckBox.setAttribute("class" , "check") 
                        let actionUrl = createElement("a") 
                        actionUrl.href = `/admin/subadmin/${res.admin._id}` 
                        actionUrl.setAttribute("class" , "normal-link") 
                        actionUrl.textContent = " View" 
                        actionCell.append(actionCheckBox , actionUrl) 
                        tableRow.append(serialNumberCell , userNameCell , emailCell , telephoneCell , roleCell, actionCell)
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
    }
} 

const app = new RegistrationController(RegistrationView , RegistrationModel)
