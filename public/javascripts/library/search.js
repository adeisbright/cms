import {sendData , getData , selector , putData , selectAll , createElement } from "./api.js" ; 


//Handling Search on the page 

const search = selector("#search") 
const displayResult = selector(".rere")//createElement("div") 
//displayResult.id = "myModal"
const searchContainer = createElement("ul") 
searchContainer.style.listStyle = "none"
const target = selector('.target')

const modal = selector('#myModal')
search.addEventListener("input" , e=> {
    console.log(2)
    let searchValue = selector("#search").value.trim() 
        if (searchValue !== "" || searchValue !== null){
            let queryValue = encodeURIComponent(searchValue) 
            //Get the items searched 
            // And display them within the DOM 
            // The search should be optimized to be very fast 
            
            getData(`/search?q=${queryValue}`)
            .then(res => { 
                if (res.message.length > 0){
                    if (searchContainer) {
                        searchContainer.innerHTML = ""
                    }
                    // while(e.target.parentNode.lastChild){
                    //     e.target.parentNode.lastChild.textContent = ""
                    // }
                    displayResult.parentNode.style.display = "block"
                    res.message.map(result => { 
                        console.log(result)
                        if (e.target.parentNode.lastChild.tagName === "P"){ 
                            e.target.parentNode.lastChild.remove()
                        }
                        let searchPhrase = createElement("h2")
                        searchPhrase.textContent = "Search Result"
                        let li = createElement("li") 
                        li.setAttribute("class" , "search-item")
                        let imageBox = createElement("div")
                        imageBox.setAttribute("class" , "image-box")
                        let productTitle = createElement("h2") 
                        productTitle.setAttribute("class" , "s-title")
                        let productImage = createElement("img") 
                        productImage.setAttribute("class" , "search-image")
                        productImage.src = `../products/${result.profile}`
                        imageBox.append(productImage)
                        let contentBox = createElement("div")
                        contentBox.setAttribute("class" , "content-box")
                        let productLink = createElement("a") 
                        productLink.href = `/shop/product/${result.productCode}`
                        productLink.target = "_blank" 
                        productLink.setAttribute("class" , "search-title") 
                        productLink.textContent = result.name 
                        productTitle.append(productLink)
                        contentBox.append(productTitle)
                        li.append(imageBox , contentBox) 
                        
                        searchContainer.append(li)
                        console.log(result.name)
                        //e.target.parentNode.append(searchContainer)
                        modal.style.display = 'block'
                        document.body.classList.add('modal-open')
                        target.classList.add('modal-back', 'fade', 'show')
                        displayResult.append(searchContainer)
                    })
                   
                }else {
                    let p = createElement("p") 
                    p.textContent = "No result found" 
                    displayResult.parentNode.style.display = "none"
                    if (searchContainer) {
                        searchContainer.innerHTML = ""
                    }
                    if (e.target.parentNode.lastChild.tagName !== "P") {
                        e.target.parentNode.append(p)
                    }
                        
                }
            })
            .catch(err => console.error(err))
        }
    
})  
window.addEventListener("keyup" , e => { 
    if (e.keyCode === 13  || e.key === "Enter"){
        let searchValue = selector("#search").value.trim() 
        if (searchValue !== "" || searchValue !== null){
            let queryValue = encodeURIComponent(searchValue) 
            //Get the items searched 
            // And display them within the DOM 
            // The search should be optimized to be very fast 
            getData(`/search?q=${queryValue}`)
            .then(res => { 
                if (res.message.length > 0){
                    res.message.map(result => {
                        console.log(result.name)
                    })
                }
            })
            .catch(err => console.error(err))
        }
    }
})
