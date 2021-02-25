import {sendData , getData , selectAll , selector , createElement} from "./api.js"  

const handleLikeClick = (target  , data , url , responseArea) => {
    target.addEventListener("click" , e => { 
        e.preventDefault() 
        sendData(url , {id : data}) 
        .then(res => responseArea.textContent = res.message) 
        .catch(err => console.error(err))
    })
} 
let pattern = /((%20)+)|(\/)/g 
/**
 * 
 * @param {*} str 
 */
const getPostTitle = str => {
    let marker = str.split("").lastIndexOf("/") 
    return str.substring(marker , str.length).trim()
}

let theUrL = "/post/update"
let likeTarget = selector("#liker")  , 
likeData = likeTarget.getAttribute("data-liker") , 
likeUrl = getPostTitle(location.pathname).replace(pattern , " ")  , 
whereToPasteResponse = selector("#likeValue") 
console.log(likeData)

handleLikeClick(likeTarget , likeData , theUrL , whereToPasteResponse)
