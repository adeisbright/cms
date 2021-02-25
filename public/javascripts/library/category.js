import {validateMobile , validateEmail , validatePassword ,
     verifyPassword, validateName, validateUserName ,
     validateFullName ,  validateAccountNumber} from "./validate.js" 
import {sendData , getData ,deleteResource ,  selector , selectAll , createElement } from "./api.js"  

let modalContent = Array.from(selectAll(".model")) 
modalContent.map(contents => contents.style.display = "none")
let modalTriggers = Array.from(selectAll(".modal-trigger")) 
modalTriggers.map((trigger , i) => {
    trigger.addEventListener("click" , e => {
        console.log("Yes")
        modalContent[i].classList.toggle("activated")
    })
})