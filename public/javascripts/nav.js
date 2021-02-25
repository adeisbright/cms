let navbarToggler = document.querySelector("#b") 

let mainNav       = document.querySelector(".navigation") 
navbarToggler.addEventListener("click" , e => {
    mainNav.classList.toggle("show-big")
    
    if (navbarToggler.classList.contains("fa-bars")){
        navbarToggler.classList.remove("fa-bars")
        navbarToggler.classList.add("fa-close")
    }else if (navbarToggler.classList.contains("fa-close")){
        navbarToggler.classList.remove("fa-close")
        navbarToggler.classList.add("fa-bars")
    }     
})

