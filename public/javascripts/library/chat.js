import {validateMobile , validateEmail , validateFullName , } from "./validate.js" 
import {sendData , putData , getData , selector , selectAll , createElement } from "./api.js" 

String.prototype.count = function(text){
    let words = this.split(" ").filter(e => e.length > 0) 
    return (() => {
        return words.filter(word => word.trim().toLowerCase().includes(text.toLowerCase())).length
    })()
}

class ChatModel {
    constructor(){
        this.validValue = {}
    }
} 
const Model  = { 
    validValue : {}
}
class ChatView {
    constructor(){
        this.inputs = Array.from(selectAll(".form-control"))
    }
}

class ChatController {
    constructor(){
        this.view = new ChatView() 
        this.addEvent()
    }
    handleBlur(event){
        if (event.target.id === "fullName") {
            if (validateFullName(event.target.value).value){
                Model.validValue[`${event.target.id}`] = event.target.value
                console.log(event.target.value)
            }
        } 
        if (event.target.id === "email") {
            if (validateEmail(event.target.value).value){
                Model.validValue[`${event.target.id}`] = event.target.value
                console.log(event.target.value)
            }
        } 
        if (event.target.id === "question") {
            Model.validValue[`${event.target.id}`] = event.target.value
            console.log(event.target.value)
        } 
    }
    handleSubmit(event){
        event.preventDefault()
        if (event.target.id === "message") {
            let customer = Model.validValue
            socket.emit("submit" , customer) 
        }
    }
    addEvent(){
        this.view.inputs.map((input , i) => {
            input.addEventListener("blur" , this.handleBlur) 
            selector("button").addEventListener("click" , this.handleSubmit)
        })
    }
} 
new ChatController()