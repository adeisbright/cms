let selector = e => document.querySelector(e) 
let selectAll = e => document.querySelectorAll(e)
 
let closeIcons = Array.from(selectAll(".remove-father")) 
if (closeIcons){
    closeIcons.map(icon  => {
        icon.addEventListener("click" , event => {
            let target = event.target 
            target.parentNode.style.display = "none"
        })
    })
}