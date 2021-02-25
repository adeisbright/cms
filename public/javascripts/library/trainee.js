import {sendData , putData , getData , deleteResource ,  selector , selectAll , createElement } from "./api.js"  
//Handling of Rental Feature within the application 
let students = selectAll(".students")
let deleteButton = selector("#deleteButton") 
deleteButton.addEventListener("click" , event => { 
    console.log("Yes")
    let items = [] 
    Array.from(selectAll(".check")).map((e , i) => {
        if (e.checked){ 
            let value = students[i].getAttribute("data-identifier")
            items.push(value)
        }
    })
    console.log(items)
    if (items.length !== 0){ 
        sendData(`/trainee/delete`  , {items})
        .then(res => {
            console.log(res.message)
            // setTimeout(() => {
            //     window.location.replace("/trainee") 
            // } , 10)
        })
        .catch(err => console.error(err))
    }
} )
