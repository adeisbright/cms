"use strict"

import {selector , selectAll , createElement , sendData , getData } from "./api.js" 

//document.designMode = "on" 
let buttons = Array.from(selectAll(".editor-icons button")) , 
savePost    = selector("#save")  , 
postTitle   = selector("#title") , 
postContent = selector("#content") ,
postDescription = selector("#description") , 
postKeywords = selector("#keywords") , 
postTags    = selector("#tags") , 
postCategory = selector("#category")  , 
visualButton = selector("#visual")  ,   
textButton   = selector("#text")
 
//save a post
savePost.addEventListener("click" , event => {
    let {target} = event   
    event.preventDefault() 
    let fields = Array.from(selectAll(".wa")) 
    if (fields.every(field => field.value !== "") && content.innerHTML.length > 0){ 
      let data = {
          title : postTitle.value.trim() , 
          content : postContent.innerHTML , 
          author : postTitle.getAttribute("data-author") ,  
          description : postDescription.value.trim() ,
          keywords : postKeywords.value.trim() , 
          category : postCategory.value , 
          tags     : postTags.value.trim().split(",")
      } 
      console.log(data) 
      let parent = target.parentNode 
     
      // I will be uploading both data and files in this section --- Need to use formData
      sendData("/posts" , {data}) 
      .then(res => {
        if (parent.lastChild.tagName === "P") parent.lastChild.remove() 
        let msg = createElement("p") 
        msg.textContent = res.message
        parent.append(msg)
        setTimeout(() => {
          location.replace("/posts")
        } , 4000)
        // Return a message as an alert within the current view that the post was uploaded 
        // Then display the list of all available posts 
        // Hide the alert after 5s or allow the user to hide it 
      }).catch(err => console.error(err)) 
    }else {
      let parent = target.parentNode 
      if (parent.lastChild.tagName === "P") parent.lastChild.remove() 
      let msg = createElement("p") 
      msg.textContent = "Very Bad" 
      parent.append(msg)
    }
})



// Listening to click on an editable icon 
// Look for a way to pass the command when a button is clicked without the use of switch
let commands = [
    "bold" , "italic" , "delete" , "indent" , "justifyCenter" , "insertImage" , 
    "jusfityFull" , "justifyLeft" , "justifyRight" , "removeFormat" , 
    "selectAll" , "strikeThrough" , "subscript" , "superscript" , "underline" , 
   "insertOrderedList" , "insertUnorderedList" , "insertParagraph" , 
    "createLink" , "fontName" , "fontSize" , "foreColor" , "heading" , "hiliteColor" , 
    "insertHorizontalRule" , "insertBrOnReturn" , "insertHTML" , "outdent" , "unlink" ,
    "styleWithCSS"
]


/**
 * @description executeCommand executes a command on any particular target
 * @param {Object} target 
 * @param {Object} commands 
 */
const  executeCommand = (target , commands) => {
    if (commands.includes(target.id)){ 
        return document.execCommand(target.id)
    } 
    return false
}

buttons.map(button => { 
    button.addEventListener("click" , event => { 
        event.preventDefault()
        //let  { target} = event 
        switch(button.id){
            case "createLink" : 
              let headings = selector("#link") 
              let hrefInput = selector("#linkHref")
              headings.style.display = "block" 
              //You need to grab the element that was selected because by the time you start typeing 
              // the selection will be lost
              hrefInput.addEventListener("blur" , e => { 
                console.log(hrefInput.value)
                document.execCommand("createLink" , false , hrefInput.value) 
                hrefInput.value = ""
                headings.style.display = "none"
              })
              break ; 
            case "fontName" : 
              let fonts = selector("#fonts") 
              fonts.style.display = "block" 
              fonts.addEventListener("change" , e => { 
                document.execCommand("fontName" , false , fonts.value) 
                fonts.style.display = "none"
              })
              break ; 
            case "fontSize" : 
              let size = selector("#size") 
              size.style.display = "block" 
              size.addEventListener("change" , e => { 
                document.execCommand("fontSize" , false , size.value) 
                size.style.display = "none"
              })
              break ;
            case "fillTrigger" : 
              let fill = selector("#fill") 
              fill.style.display = "block" 
              fill.addEventListener("change" , e => { 
                document.execCommand("hiliteColor" , false , fill.value) 
                fill.style.display = "none"
              })
              break ; 
            case "colorTrigger" : 
              let color = selector("#color") 
              color.style.display = "block" 
              color.addEventListener("change" , e => { 
                document.execCommand("foreColor" , false , color.value) 
                color.style.display = "none"
              })
              break ; 
            default : 
              executeCommand(button , commands)
        }   
    })
})  


//let content = postContent.innerHTML 
textButton.addEventListener("click" , event => { 
    event.preventDefault() 
    let content = postContent.innerHTML 
    postContent.textContent = content
}) 
visualButton.addEventListener("click" , event => { 
    event.preventDefault()  
    let content = postContent.textContent
    postContent.innerHTML = content
}) 


