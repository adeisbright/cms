import {sendData , getData , selector , selectAll , createElement } from "./api.js" 
let invest = selector("#investNow") 
let amount = selector("#amount") 
if (amount){  
    let lastAmount = Number(amount.getAttribute("data-amount"))
    amount.addEventListener("blur" , event => {
        let val = event.target.value.trim() 
        let p = createElement("p") 
        if (lastAmount){
            if (!(val.trim().match(/^\d+$/) && Number(val) >= lastAmount && Number(val) <= 200000 )){ 
                p.textContent = `***You can only provide help within the range of ${lastAmount.toLocaleString()} - 200,000 or recommit 100% of your last commit`
                if ( selector("#trigger").previousSibling.tagName === "P") {
                    selector("#trigger").previousSibling.remove()    
                }
                event.target.parentNode.insertBefore(p , selector("#trigger"))
            }
        }else {
            if (!(val.trim().match(/^\d+$/) && Number(val) >= 5000 && Number(val) <= 200000 )){ 
                p.textContent = "***You can only provide help within the range of 5,000 - 200,000 or recommit 100% of your last commit"
                if ( selector("#trigger").previousSibling.tagName === "P") {
                    selector("#trigger").previousSibling.remove()    
                }
                event.target.parentNode.insertBefore(p , selector("#trigger"))
            }
        }
    })
    invest.addEventListener("click" , event => {
        let val = amount.value.trim()
        let p = createElement("p")
        if (lastAmount){
            if ((val.trim().match(/^\d+$/) && Number(val) >= lastAmount && Number(val) <= 200000 )){ 
                if(confirm(`You will be required to make payment within 24 hours once matched. If you fail to make payment , your account will be deactivated. Do you still wish to proceed ?`)){
                    selector("form").submit()
                }else {
                    alert("Oops! You cancelled your request. Make up your mind today and start enjoying GIIN")
                }
            }else {
                p.textContent = "***You can only provide help within the range of 5,000 - 200,000 or recommit 100% of your last commit"
                if ( selector("#trigger").previousSibling.tagName === "P") selector("#trigger").previousSibling.remove()    
                amount.parentNode.insertBefore(p , selector("#trigger"))
            }
        }else {
            if ((val.trim().match(/^\d+$/) && Number(val) >= 5000 && Number(val) <= 200000 )){ 
                if(confirm(`You will be required to make payment within 24 hours once matched. If you fail to make payment , your account will be deactivated. Do you still wish to proceed ?`)){
                    selector("form").submit()
                }else {
                    alert("Oops! You cancelled your request. Make up your mind today and start enjoying GIIN")
                }
            }else {
                p.textContent = "***You can only provide help within the range of 5,000 - 200,000 or recommit 100% of your last commit"
                if ( selector("#trigger").previousSibling.tagName === "P") selector("#trigger").previousSibling.remove()    
                amount.parentNode.insertBefore(p , selector("#trigger"))
            }
        }
    })
} 
let withdrawButton = selector("#withdrawNow") 
   
if (withdrawButton){
    withdrawButton.addEventListener("click" , e =>{
        e.preventDefault() 
        let amount = Number(e.target.getAttribute("data-amount"))
        if (confirm(`Are you sure you want to withdraw the sum ${amount.toLocaleString() + ".00"} from your GIIN account`)){ 
           getData(`${e.target.getAttribute("href")}`) 
            .then(res => {
                // Show the details of who the user was matched to
                let serverMessage = createElement("p") 
                serverMessage.textContent = res.message 
                e.target.parentNode.replaceChild( serverMessage  , e.target) 
                //Redirect the user to the dashboard after 2seconds
                setTimeout(() => {
                    window.location.replace("/dashboard") 
                } , 2000)

            }).catch(err => console.log(err.message))
        }
    })
}
let referralButton = selector("#referralButton") 
   
if (referralButton){
    referralButton.addEventListener("click" , e =>{
        e.preventDefault() 
        let amount = selector("#bonusAmount").textContent.trim()
        if (confirm(`Are you sure you want to withdraw the sum ${amount.toLocaleString() + ".00"} from your referral bonus account ? `)){ 
           getData(`${e.target.getAttribute("href")}`) 
            .then(res => {
                // Show the details of who the user was matched to
                let serverMessage = createElement("p") 
                serverMessage.textContent = res.message 
                e.target.parentNode.replaceChild( serverMessage  , e.target) 
                //Redirect the user to the dashboard after 2seconds
                setTimeout(() => {
                    window.location.replace("/dashboard") 
                } , 2000)

            }).catch(err => console.log(err.message))
        }
    })
}