let tester = document.querySelector("#tester") 
tester.addEventListener("mouseover" , e => {
    document.querySelector(".sticky").classList.toggle("c") 
    console.log("Yes")
})