let selector = e => document.querySelector(e)  
let selectAll = e => document.querySelectorAll(e)
let createElement = e => document.createElement(e) 
let header = selector(header) 
let main = selector(main) 
let footer = selector(footer) 
window.addEventListener("load" , e => {
    header.style.display = "none"
    main.style.display = "none"
    footer.style.display = "none"
})