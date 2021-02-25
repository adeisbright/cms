let selecto =    e => document.querySelector(e) 
let selectAll = e => document.querySelectorAll(e) 

let tab    = Array.from(selectAll(".tab-trigger"))  , 
tabContents = Array.from(selectAll(".tab-content")) 
tabContents.filter((e , i) => i !== 0).map(e => e.style.display = "none")

tab.map((link , i) => { 
    link.addEventListener("click" , event => {
       tabContents.map(e => e.style.display = "none")
       tab.map(e => e.classList.remove("active-button"))
       tabContents[i].style.display = "block" 
    //    tabLinks.map( n => n.classList.remove("active")) 
       link.classList.toggle("active-button")
    //    event.target.classList.add("active")
    }) 
    
})