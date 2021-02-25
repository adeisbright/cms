"use strict"

import {selector , getData } from "./api.js" 
let content = selector("#postContent")
let id = content.getAttribute("data-identifier") 
if (selector("#deletePost") ){
    let deleteButton = selector("#deletePost") 
    deleteButton.addEventListener("click" , e => {
        e.preventDefault() 
        getData(`/posts/${id}/delete`)
        .then(res => { 
           
            location.replace("/posts")
        }).catch(err => console.error(err))
    })
}

getData(`/posts/fetch/${id}`) 
.then(res => {
    content.innerHTML = res.content
}).catch(err => console.error(err))
  