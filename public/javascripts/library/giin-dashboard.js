import {sendData , getData , selector , putData , selectAll , createElement } from "./api.js" ;
let popForm = Array.from(selectAll(".popForm")) || null 
let trigger = Array.from(selectAll(".popTrigger")) || null 
let red = Array.from(selectAll(".red")) || null  
let balanceTime = selector(".balanceTime") || null 
if (balanceTime){  
    let now = Number(selector(".activationEnd") .id) - Number(selector(".presentTime") .id) , 
    days    = Math.floor(now/(1000*60*60*24)) , 
    hours   = Math.floor((now%(1000*60*60*24))/(1000*60*60)) ,
    minutes = Math.floor((now%(1000*60*60))/(1000*60)) ,
    seconds = Math.floor((now%(1000*60))/(1000)) 

    //This function should be a module that can be shared across different codes
    let examCountDown = (area ,   hrs , mins ,secs) => {
        let timerId = setInterval(() => {  
            if (days ===0 && hrs === 0 && mins == 0 && secs == 0) {
                area.innerHTML = `<strong class="mr-3">PENDING ACTIVATION`
                if (red) {
                    red.style.background = "green" 
                    red.style.padding = ".5rem" 
                    red.style.borderRadius = ".25rem"
                }
                clearInterval(timerId) 
                return   
            }
            //selector(text).textContent = "Remaining Time" 
            let daysLeft = String(days).length === 1 ? `0${days}` : days , 
            hoursLeft = String(hrs).length === 1 ? `0${hrs}` : hrs , 
            minutesLeft = String(mins).length === 1 ? `0${mins}` : mins ,
            secondsLeft = String(secs).length === 1 ? `0${secs}` : secs 
            // h = hrs > 1 ? `hrs` : hr ,
            // m = mins > 1 ? "mins" : "min"  , 
            // s = secs > 1 ? "secs" : "sec"
            area.innerHTML = `<strong class="mr-3">TIME LEFT: </strong>  ${hoursLeft}h : ${minutesLeft}m: ${secondsLeft}s` 

            if ( secs == 0 && mins > 1) { 
                mins-- 
                secs = 59
            }
            if ( secs == 0 && mins === 1) { 
                mins = 0 
                secs = 0
            }
            if ( mins === 0 && hrs !== 0 ) {
                hrs--
                secs = 0 
                mins = 0
            }
            if (hrs === 0 && mins == 0 && secs == 0) {
                area.innerHTML = `<strong class="mr-3">PENDING ACTIVATION`
                if (red) {
                    red.style.background = "green" 
                    red.style.padding = ".5rem" 
                    red.style.borderRadius = ".25rem"
                }
                clearInterval(timerId) 
                return   
            }
            secs-- 
        } , 1000)
    }
    examCountDown(balanceTime ,  hours ,minutes,seconds)       

}

if (trigger) { 
    popForm.map(e => e.style.display = "none") 
    trigger.map((e , i) => {
        e.addEventListener("click" , event => {
            popForm[i].style.display = "block" 
            e.style.display = "none"
        }) 
        let pops = Array.from(selectAll(".p")) 
        let forms = Array.from(selectAll(".btn-submit")) 
        let preview  = Array.from(selectAll(".image-preview")) 
        let validChecker 
        let pictureChange = pops[i]  
        pictureChange.addEventListener('change' , showImage) 
        function showImage() {
            let files = this.files[0]  
            let acceptedFile = ["image/jpeg" , "image/jpg" , "image/png" , "image/gif"] 
            let divisor = 1024*1024
            let size = Number(files.size)/divisor
            let type = files.type 
           
            if (!(acceptedFile.includes(type)  && size  < 10)) {
                event.preventDefault() 
                validChecker = false
                preview[i].textContent = "File size too large or not supported."
            }
        } 
        forms[i].addEventListener("click" , e => {
            if (validChecker === false){
                event.preventDefault()
            }
        })
    }) 
}
if (red) { 
    red.map(e => { 
        e.style.background = "rgb(233, 98, 7)" 
        e.style.padding = ".5rem" 
        e.style.borderRadius = ".25rem"
    })   
}

// Time tracker for the transactions 
let transactions= selector(".transactions") || null 
if (transactions){
    let remainingTime = Array.from(selectAll(".remainingTime")) , 
    currentTime       = Array.from(selectAll(".currentTime")) ,
    deadlineTime      = Array.from(selectAll(".endTime"))
    remainingTime.map((e , i) => {
        let now = Number(deadlineTime[i].id) - Number(currentTime[i].id) , 
        days = Math.floor(now/(1000*60*60*24)) , 
        hours = Math.floor((now%(1000*60*60*24))/(1000*60*60)) ,
        minutes = Math.floor((now%(1000*60*60))/(1000*60)) ,
        seconds = Math.floor((now%(1000*60))/(1000)) 
        let examCountDown = (area ,  hrs , mins ,secs) => {
            let timerId = setInterval(() => {  
                // if (currentTime > deadlineTime) {
                //     area.innerHTML = `<strong class="mr-3">Transaction is pending. Contact admin for help` 
                //     clearInterval(timerId) 
                //     return
                // }
                if (hrs === 0 && mins == 0 && secs == 0) {
                   area.innerHTML = `<strong class="mr-3">Transaction is pending. Contact admin for help` 
                   clearInterval(timerId) 
                   return
                }
                //selector(text).textContent = "Remaining Time" 
                let hoursLeft = String(hrs).length === 1 ? `0${hrs}` : hrs , 
                minutesLeft = String(mins).length === 1 ? `0${mins}` : mins ,
                secondsLeft = String(secs).length === 1 ? `0${secs}` : secs 
                // h = hrs > 1 ? `hrs` : hr ,
                // m = mins > 1 ? "mins" : "min"  , 
                // s = secs > 1 ? "secs" : "sec"
                area.innerHTML = `<strong class="mr-3">TIME LEFT : </strong> ${hoursLeft}h : ${minutesLeft}m: ${secondsLeft}s` 
    
                if ( secs == 0 && mins !== 0) {
                    mins-- 
                    secs = 59
                }
                if ( mins === 0  ) {
                    hrs--
                    secs = 59 
                    mins = 59
                }
                if (hrs === 0 && mins == 0 && secs == 0) {
                    area.innerHTML = `<strong class="mr-3">Transaction is pending. Contact admin for help`
                    clearInterval(timerId) 
                    return   
                }
                secs-- 
            } , 1000)
        }
        examCountDown(e , hours ,minutes,seconds) 
    })
} 

// Time tracker for receiving payments
let mymoney = selector(".mymoney") || null 
if (mymoney){
    let remainingTime = Array.from(selectAll(".balanceTimer")) , 
    currentTime       = Array.from(selectAll(".presentTime")) ,
    deadlineTime      = Array.from(selectAll(".expire"))
    remainingTime.map((e , i) => {
        let now = Number(deadlineTime[i].id) - Number(currentTime[i].id) , 
        days = Math.floor(now/(1000*60*60*24)) , 
        hours = Math.floor((now%(1000*60*60*24))/(1000*60*60)) ,
        minutes = Math.floor((now%(1000*60*60))/(1000*60)) ,
        seconds = Math.floor((now%(1000*60))/(1000)) 
        let examCountDown = (area ,  hrs , mins ,secs) => {
            let timerId = setInterval(() => {  
                // if (hrs < 0 || mins == 0|| secs == 0) {
                //     area.innerHTML = `<strong class="mr-3">Transaction is pending. Contact admin for help` 
                //     clearInterval(timerId) 
                //     return
                // }
                if (hrs === 0 && mins == 0 && secs == 0) {
                   area.innerHTML = `<strong class="mr-3">Transaction is pending. Contact admin for help` 
                   clearInterval(timerId) 
                   return
                }
                //selector(text).textContent = "Remaining Time" 
                let hoursLeft = String(hrs).length === 1 ? `0${hrs}` : hrs , 
                minutesLeft = String(mins).length === 1 ? `0${mins}` : mins ,
                secondsLeft = String(secs).length === 1 ? `0${secs}` : secs 
                // h = hrs > 1 ? `hrs` : hr ,
                // m = mins > 1 ? "mins" : "min"  , 
                // s = secs > 1 ? "secs" : "sec"
                area.innerHTML = `<strong class="mr-3">TIME LEFT : </strong> ${hoursLeft}h : ${minutesLeft}m: ${secondsLeft}s` 
    
                if ( secs == 0 && mins !== 0) {
                    mins-- 
                    secs = 59
                }
                if ( mins === 0  ) {
                    hrs--
                    secs = 59 
                    mins = 59
                }
                if (hrs === 0 && mins == 0 && secs == 0) {
                    area.innerHTML = `<strong class="mr-3">Transaction is pending. Contact admin for help`
                    clearInterval(timerId) 
                    return   
                }
                secs-- 
            } , 1000)
        }
        examCountDown(e , hours ,minutes,seconds) 
    })
} 
// Time tracker for when an investment is completed and awaiting withdrawal
let investmentEnd     = Array.from(selectAll(".investmentEnd")) , 
    currentTime       = Array.from(selectAll(".currentTime")) ,
    displayTime      = Array.from(selectAll(".displayTime")) 
if (investmentEnd){  
    displayTime.map((e , i) => {
        console.log("jisos")
        let now = Number(investmentEnd[i].id) - Number(currentTime[i].id) , 
        days = Math.floor(now/(1000*60*60*24)) , 
        hours = Math.floor((now%(1000*60*60*24))/(1000*60*60)) ,
        minutes = Math.floor((now%(1000*60*60))/(1000*60)) ,
        seconds = Math.floor((now%(1000*60))/(1000)) 

       //This function should be a module that can be shared across different codes
        let examCountDown = (area , days ,  hrs , mins ,secs) => {
            let timerId = setInterval(() => {  
                if (days ===0 && hrs === 0 && mins == 0 && secs == 0) {
                    area.innerHTML = `<strong class="mr-3">You can now withdraw your cash`
                    if (red) {
                        red.style.background = "green" 
                        red.style.padding = ".5rem" 
                        red.style.borderRadius = ".25rem"
                    }
                    clearInterval(timerId) 
                   return   
                }
                //selector(text).textContent = "Remaining Time" 
                let daysLeft = String(days).length === 1 ? `0${days}` : days , 
                hoursLeft = String(hrs).length === 1 ? `0${hrs}` : hrs , 
                minutesLeft = String(mins).length === 1 ? `0${mins}` : mins ,
                secondsLeft = String(secs).length === 1 ? `0${secs}` : secs 
                area.innerHTML = `<strong class="mr-3">WITHDRAW IN: </strong> ${daysLeft}d :${hoursLeft}h : ${minutesLeft}m: ${secondsLeft}s` 

                if ( secs == 0 && mins > 1) { 
                   mins-- 
                   secs = 59
                }
                if ( secs == 0 && mins === 1) { 
                   mins = 0 
                   secs = 0
                }
                if ( mins === 0 && hrs !== 0 ) {
                  hrs--
                  secs = 0 
                  mins = 0
                }
                if (days === 0 && hrs === 0 && mins == 0 && secs == 0) {
                    area.innerHTML = `<strong class="mr-3">You can now withdraw your cash`
                    if (red) {
                       red.style.background = "green" 
                       red.style.padding = ".5rem" 
                       red.style.borderRadius = ".25rem"
                    }
                   clearInterval(timerId) 
                   return   
                }
                secs-- 
            } , 1000)
        }
        examCountDown(e, days ,  hours ,minutes,seconds) 
    })
} 
let activates = Array.from(selectAll(".activate")) ,
supports      = Array.from(selectAll(".support")) ,
flags         = Array.from(selectAll(".flag"))
if (activates || supports || flags){  
    activates.map((activate , i) => {
        activate.addEventListener("click" , event => {
            let transactionCode  = [event.target.getAttribute("data-activate")]  
            console.log(transactionCode)
            sendData(`/user/transactions`  , {transactionCode}) 
            .then(res => {
                location.replace("/dashboard")  
                // console.log(res)
            })
            .catch(err => console.error(err)) 
        })
    })
    supports.map((support , i) => {
        support.addEventListener("click" , event => {
            location.replace("/support/message")  
        })
    })
    flags.map((flag , i) => {
        flag.addEventListener("click" , event => {
            let usersToDelete  = [event.target.getAttribute("data-activate")]  
            putData(`/user/transactions/${usersToDelete[0]}`  , {usersToDelete})
            .then(res => {
                location.replace("/dashboard")  
             })
            .catch(err => console.error(err))
        })
    }) 
}

   