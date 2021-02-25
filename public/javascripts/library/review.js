import {sendData , getData , selector , putData , selectAll , createElement } from "./api.js" ;  
/*
 * @description Creates a new element of tag {tag} and attaches it to parent 
 * with the given text
 * @param {String} parent The parent element within the DOM
 * @param {String} tag 
 * @param {String} text 
 * @return {String} parent
*/
const createAndAttach = (parent , tag , text) => {
    let element = createElement(tag) 
    element.textContent = text 
    parent.append(element) 
    return parent
} 

let socket = io("/reviews")     
let root = selector("#root") 
let reviewContainer = createElement("ul")
reviewContainer.setAttribute("class" , "list-unstyled")
socket.on("sendReviews" , data => {
    if (data.length === 0){
        if (!reviewContainer.firstChild){
            createAndAttach(reviewContainer , "li" , "No reviews yet") 
            root.append(reviewContainer)
        }
    }else {
        while(reviewContainer.firstChild){
            reviewContainer.firstChild.remove()
        }
        data.map(testimony => {
            const {name , review ,ratings , dateCreated} = testimony 
            let li = createElement("li") 
            let hr = createElement("hr")
            createAndAttach(li , "h2" , name) 
            createAndAttach(li , "p" , review) 
            createAndAttach(li , "p" , dateCreated)
            createAndAttach(li , "strong" , ratings) 
            reviewContainer.append(li , hr)
        })
        root.append(reviewContainer)
        console.log(data)
    }
})

selector("#submit").addEventListener("click" , event => {
    event.preventDefault()
    if (Array.from(selectAll(".rf")).every(input => input.value !== "")){ 
        let data = {
            name : selector("#name").value.trim() ,
            review : selector("#review").value.trim() , 
            ratings : Number(selector("#rating").value.trim())
        }
        socket.emit("submit" , data) 
    }
    socket.on("printReviews" , data => {
        while(reviewContainer.firstChild){
            reviewContainer.firstChild.remove()
        }
        data.map(testimony => {
            const {name , review ,ratings , dateCreated} = testimony 
            let li = createElement("li") 
            let hr = createElement("hr")
            createAndAttach(li , "h2" , name) 
            createAndAttach(li , "p" , review) 
            createAndAttach(li , "p" , dateCreated)
            createAndAttach(li , "strong" , ratings) 
            reviewContainer.append(li , hr)
        })
        root.append(reviewContainer)
        console.log(data)
    })
})


// let app = selector("#chatApp")
//     app.setAttribute("class" , "fixed") 
//     let header = createElement("em")  , 
//     chatForm   = createElement("form") ,
//     chatInput  = createElement("input") , 
//     sendChat   = createElement("button")  , 
//     messages   = createElement("ul") , 
//     message    = createElement("li") 
//     header.textContent = "What do you want to say ?"  
//     chatInput.type = "text" 
//     sendChat.type = "submit" 
//     sendChat.textContent = "Send" 
//     sendChat.setAttribute("class" , "send-button")
//     chatForm.append(chatInput , sendChat)
//     let socket = io("/chat")  
//     .addEventListener("click" , e=> {
//         e.preventDefault() 
//         socket.emit("chat message" , chatInput.value) 
//         chatInput.value = '' 
//         return false 
//     }) 
//     socket.on("chat message" , function(msg){
//         message.textContent = msg 
//         messages.append(message)
//     })
//     app.append(header , messages , chatForm)
     
    /*let chatBox = createElement("div") , 
    header      = createElement("h1")
    chatForm   = createElement("form") ,
    chatInput  = createElement("input") , 
    sendChat   = createElement("button")  , 
    messages   = createElement("ul") ,
    message    = createElement("li") 
    header.textContent = "What do you want to say ?"  
    chatInput.type = "text" 
    sendChat.type = "submit" 
    sendChat.textContent = "Send" 
    chatBox.innerHTML = `
        <ul id="messages"></ul> 
        <p>Who be the man</p>
        <form class="form-inline chat-for">
            <div class="input-group>
                <button type="submit" class="input-group-append btn btn-primary">
                <i class="fab fa-facebook input-group-text"></button>
                <input type="text" name="chat-field" class="form-control" plaholder="Type your message">
            </div>
        </form>
    `
    chatBox.setAttribute("class" , "interview-box") 
    selector("body").append(chatBox)
})*
let trigger = selector("#interview") , 
userName = selector(".userName").id 
let socket = io() 
trigger.addEventListener("click" , event => { 
    let header = createElement("em")  , 
    app = selector("#app")
    chatForm   = createElement("form") ,
    chatInput  = createElement("input") , 
    sendChat   = createElement("button")  , 
    messages   = createElement("ul") ,
    message    = createElement("li") 
    header.textContent = "What do you want to say ?"  
    chatInput.type = "text" 
    chatInput.placeholder = "Welcome to the interview , type your response"
    sendChat.type = "submit" 
    sendChat.textContent = "Send" 
    sendChat.setAttribute("class" , "send-button") 

    chatForm.setAttribute("class" , "chat-form")
    chatForm.append(chatInput , sendChat)
    
    /*selector("body").innerHTML = "" 
    selector("body").style.background = "gray"
    *
    app.append(chatForm)
    app.setAttribute("class" , "interview-box")
    event.preventDefault() 
    socket.emit("chat message" , userName)
    */