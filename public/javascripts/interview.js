let selector = e => document.querySelector(e) , 
selectAll = e => document.querySelectorAll(e) , 
createElement = e => document.createElement(e)
let body = selector("body")

//Now , create a namespace 
let socket = io("/chat") 
socket.on("welcome" , data => {
    if (body.firstChild.tagName !== "H1"){
        let h1 = createElement("h1")
        h1.textContent = data.message
        body.insertBefore(h1 , body.firstChild)
    }
    //create the ui features for the chat box 
})
// The elements are now globally available  , let us listen to conversation from the socket 
let app = selector("body") , 
chatForm   = createElement("form") ,
chatInput  = createElement("input") , 
sendChat   = createElement("button")  , 
messages   = createElement("ul") 

// header.textContent = "What do you want to say ?"  
chatInput.type = "text" 
chatInput.placeholder = "What do you want to buy ?"
sendChat.type = "submit" 
sendChat.textContent = "Send" 
sendChat.setAttribute("class" , "send-button") 
// app.append(header)
messages.id = "messages"
// let userName = selector(".userName").id   
chatForm.setAttribute("class" , "chat-form")
// chatForm.style.position = "fixed" 
// chatForm.style.bottom = "0"
// chatForm.style.right = "0"
// chatForm.style.width = "100%"
// chatInput.style.width = "90%"
chatForm.append(chatInput , sendChat)
app.style.background = "#ece5dd"
app.append( chatForm)

// Listening to input and submit event 
chatInput.addEventListener("input" , e => {
    socket.emit("typing" , "User is typing")
    
})
socket.on("type" , data => {
    body.firstChild.textContent = data
}) 
chatInput.addEventListener("blur" , e => {
    // socket.emit("typing" , "User is typing")
    body.firstChild.textContent = ""
})

//Listen to the type
sendChat.addEventListener("click" , event => {
    event.preventDefault() 
    body.firstChild.textContent = ""
    message    = createElement("li") 
    message.textContent = chatInput.value 
    messages.append(message) 
    chatInput.value = ""  
    app.append(messages)
    socket.emit("messaging" , {message : chatInput.value })
    socket.on("responding" , data => {
        // message    = createElement("li") 
        // message.textContent = data.message 
        // messages.append(message) 
        // app.append(messages) 
        console.log(data)
    })
}) 
// socket.on("pass" , data => {
//     console.log("The room was was created" + data)
// })
socket.on("all" , data => {
    console.log(data)
})
let sendMessage = selector("#sendName") 
sendMessage.addEventListener("click" , event => {
    event.preventDefault() 
    // Open a new dialog window 
    socket.emit("set-name" , {name : selector("#name").value})
    socket.on("name-set" , message=> {
        let newWindow = document.createElement("h2") 
        newWindow.textContent = message
        selector("#original").remove() 
        body.insertBefore(newWindow , body.firstChild)
    })
    socket.on("pass" , data => console.log(data))
})
socket.on("easy" , data => console.log(data))
socket.on("onlyroom" , data => console.log(data)) 
socket.on("allmembers" , data => console.log(data))

socket.on("privated" , data => console.log(data))
socket.on("allmembers" , data => console.log(data))
socket.on("inname" , data => console.log(data))
socket.on("bigger" , data => console.log(data))








window.addEventListener("load" , event => {
    if (window.localStorage){
        if (localStorage.name){
            selector("#register").style.display = "none" 
        }else {
            console.log("Hello")
            // socket.on("welcome" , data => {
            //     let form = createElement("div")
            //     form.innerHTML = `
            //     <div class="container"> 
            //         <div class="row justify-content-center">
            //             <div class="col-md-3">
            //                 <form class="form-horizontal" method="post" id="register"> 
            //                     <label for="fullname">Full Name</label>
            //                     <input class="form-control" type="text" name="fullame" id="fullName">
            //                     <label for="email">Email </label>
            //                     <input class="form-control mb-3" type="email" name="email" id="email">
            //                     <button class="btn btn-primary btn-lg" type="submit" id="message">Message</button>
            //                 </form>
            //             </div>
            //         </div>
            //     </div>
            //     `
            //     if (selector("body").firstChild.tagName !== "DIV") {
            //         selector("body").insertBefore(form , selector("body").firstChild)
            //     }
            // })
        }
    }
})
// socket.emit("confirm" , userName) 
// // socket.on("welcome" , data => {
// //     header.textContent = data
// // })


// socket.on("reply" , data => {
//     selector("#register").style.display = "none" 
//     localStorage.name = data.name
//     let header = createElement("h2")  , 
//     app = selector("body")
//     chatForm   = createElement("form") ,
//     chatInput  = createElement("input") , 
//     sendChat   = createElement("button")  , 
//     messages   = createElement("ul") ,
//     message    = createElement("li") 
//     header.textContent = "What do you want to say ?"  
//     chatInput.type = "text" 
//     chatInput.placeholder = "Welcome to the interview , type your response"
//     sendChat.type = "submit" 
//     sendChat.textContent = "Send" 
//     sendChat.setAttribute("class" , "send-button") 
//     app.append(header)
//     messages.id = "messages"
//     let userName = selector(".userName").id   
//     chatForm.setAttribute("class" , "chat-form")
//     chatForm.append(chatInput , sendChat)
//     app.style.background = "#ece5dd"
//     app.append( chatForm) 

//     sendChat.addEventListener("click" , event => {
//         event.preventDefault() 
//         let li = createElement("li")
//         li.textContent = chatInput.value 
//         messages.append(li) 
//         chatInput.value = ""
//     }) 

// })
    
// if (name){
//     selector("#register").style.display = "none"
// }
// socket.on("message" , data => { 
//     message.textContent = data 
//     messages.append(message) 
//     app.append(messages)
// }) 


