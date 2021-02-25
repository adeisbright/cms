"use strict"
import {validateName , validateEmail , validateFullName , 
     validateMobile , validatePassword ,
     validateUserName ,  verifyPassword} from "./validate.js" 
import {selector , selectAll , createElement , sendData , getData } from "./api.js"  
 
class ValidateRegistration {
    constructor () {
        this.inputs = Array.from(selectAll("input")).filter(e => e.id !== "course") 
        this.addEvent() 
    } 
    handleBlur(event){
        let target = event.target 
        let classList = target.classList 
        let nextSibling = target.nextElementSibling
        let parent = target.parentNode 
        let parentSibling = parent.nextElementSibling
        let grandParent = parent.parentNode
        try { 
            switch(target.id){
                case "email" : 
                    if (validateEmail(target.value.trim()).value !== null) {
                        classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                        classList.add("border-good-color")
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                    }else {
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                        let msg = createElement("p") 
                        msg.className = "label"
                        let sibling = target.nextElementSibling
                        msg.textContent = `${target.value} is not a valid email` 
                        classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                        classList.add("border-error-color") 
                        parent.insertBefore(msg ,  sibling)
                    }
                   break;
                case "password" : 
                    if (validatePassword(target.value.trim()).value !== null) {
                        classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                        classList.add("border-good-color")
                        if(parentSibling.tagName === "P") parentSibling.remove() 
                    }else {
                        if(parentSibling.tagName === "P") parentSibling.remove() 
                        let msg = createElement("p") 
                        msg.className = "label"
                        let sibling = parent.nextElementSibling
                        msg.textContent = `Password must be 8 characters and above` 
                        classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                        classList.add("border-error-color") 
                        grandParent.insertBefore(msg ,  sibling)
                    }
                   break;
                case "confirmPassword" : 
                if (target.value === selector("#password").value && target.value !== "") {
                    classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                    classList.add("border-good-color")
                    if(parentSibling.tagName === "P") parentSibling.remove() 
                }else {
                    if(parentSibling.tagName === "P") parentSibling.remove() 
                    let msg = createElement("p") 
                    msg.className = "label"
                    let sibling = parent.nextElementSibling
                    msg.textContent = `Password does not match` 
                    classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                    classList.add("border-error-color") 
                    grandParent.insertBefore(msg ,  sibling)
                }
                   break;
                default : 
                  throw new Error() 
            }
            
        }catch(error){
            const errorConfig = {
                name : error.name ,
                msg  : error.message
            }
            console.error(errorConfig)
        }
        
    } 
    handleClick(event){
        let target = event.target 
        let classList = target.classList
        if (classList.contains("revealPass")){ 
            let sibling = target.previousElementSibling
            sibling.type = sibling.type === "text" ? "password" : "text" 
            classList.toggle("fa-eye") 
            classList.toggle("fa-low-vision") 
        }
    }
    
    handleSubmit(event){ 
        event.preventDefault()
        if (event.target.type === "submit"){  
            let data = {}
            let controls = Array.from(selectAll(".validate"))
            if (controls.every(e => e.classList.contains("border-good-color"))){  
                controls.map(e => {
                    data[`${e.id}`] = e.value 
                })
                
                let sibling = event.target.nextElementSibling
                    sibling.textContent  = "" 
                    let msg = createElement("p")  
                    let div = createElement("div")
                    div.className = "loader" 
                    let span = createElement("span")
                    span.textContent = "...Processing"
                    span.className = "label"
                    sibling.append(div , span)  
                console.log(data)
                sendData("/blog-admin/register" , {data})
                .then(res => {
                    
                    let sibling = event.target.nextElementSibling 
                    sibling.textContent = res.message 
                    if (res.isRegistered){
                        setTimeout(() => { 
                            location.replace("/dashboard")
                        } , 5000)
                    }
                })
                .catch(err => {
                    console.error(err)
                })
            }else {
                let sibling = event.target.nextElementSibling 
                sibling.textContent  = ""
                let msg = createElement("p") 
                let div = createElement("div") 
                            
                div.className = "loader" 
                let span = createElement("span") 
                span.textContent = "You provided incorrect details , try again ..." 
                span.className = "label"
                sibling.append(div , span) 
            }
          
       }
        
    }
    addEvent(){
        this.inputs.map(input => {
            input.addEventListener("blur" , this.handleBlur)
            input.addEventListener("click" , this.handleSubmit) 
            input.addEventListener("change" , this.handleChange)
        })
        Array.from(selectAll("i.fa")).map(icon => icon.addEventListener("click" , this.handleClick)) 
    }
} 
new ValidateRegistration() 

