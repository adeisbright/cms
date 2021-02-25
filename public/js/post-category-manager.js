
import {sendData , getData , selectAll } from "./api.js"  

class RegistrationController {
    constructor() {
        this.view = Array.from(selectAll(".category"))
        this.addEvent() 
    }
    handleClick(event) { 
       
        event.preventDefault()
        let {target} = event 
        let {classList} = target 
        console.log(classList.contains("fa-upload"))
        if (classList.contains("category-delete")){ 
            //let categoryIdentifier = Array.from(selectAll(".categoryRow")) //
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            } 
            const categoryName = target.getAttribute("data-name")
            const deleteUrl = `http://localhost:5000/categories/${categoryName}?delete=true`
            getData(deleteUrl)
                .then(res => {
                    console.log(res.message)
                    target.parentNode.parentNode.remove()
                    // setTimeout(() => {
                    //     window.location.replace(location.href) 
                    // } , 500)
                })
                .catch(err => console.error(err))
        } 
        if (classList.contains("category-edit") && !classList.contains("fa-upload")){ 
            classList.add("fa-upload")
            let cellNumber = Array.from(selectAll(".category-edit")).findIndex(n => n == target) 
            let desc =  Array.from(selectAll(".cat-description"))[cellNumber]
            let name = Array.from(selectAll(".cat-name"))[cellNumber] 
           
            name.contentEditable = true 
            name.focus()
            desc.contentEditable = true 
            name.addEventListener("blur" , e => {
                desc.focus()
            }) 
            return  //This makes the next if statement not to be checked. If it is checked it will make fa-upload not to appear
        }
        if (classList.contains("fa-upload")){ 
            console.log("hi")
            const categoryName = target.getAttribute("data-name")
            const editUrl = `http://localhost:5000/categories/${categoryName}`  
            classList.add("fa-upload")
            let cellNumber = Array.from(selectAll(".category-edit")).findIndex(n => n == target) 
            let desc =  Array.from(selectAll(".cat-description"))[cellNumber].textContent
            let name = Array.from(selectAll(".cat-name"))[cellNumber].textContent 
            console.log(name)
            sendData(editUrl , {
                name : name , 
                description : desc
            })
            .then(res => {
                    classList.remove("fa-upload")
                })
                .catch(err => console.error(err))
        }
        
        
    }
    addEvent() {
        this.view.map(button => {
            button.addEventListener("click" , this.handleClick)
        }) 
    }
} 
new RegistrationController()
