import {sendData , getData , selector , selectAll , createElement } from "./api.js"  
let investButton = selector("#invest") 
investButton.addEventListener("click" , e => {
    e.preventDefault() 
    let n  = createElement("p") 
    n.textContent = "Loading Creditor ....."
    e.target.parentNode.parentNode.append(n)
    sendData("/dashboard/invest" , {amount : selector("#amount").value.trim()})
    .then(res => { 
        console.log(res)
       /* n.remove() 
        let title = createElement("h4") 
        title.textContent = "Make Payment to the user below" 
        e.target.parentNode.parentNode.append(title)
        res.accounts.map((account , i) => {
            let accountBox = createElement("div") 
            accountBox.setAttribute("class" , "mb-3 account-box")
            for (let i of Object.keys(account)){
                let voidKeys = ["dateJoined" , "approved" , "password" , 
                    "giinToken" , "dateAdded" , "accountCode" ,"bitcoinWallet" ,   "__v" , 
                    "referers" , "_id" , "role" , "adminFirstName" , "adminLastName"
                ] 
                if (!voidKeys.includes(i)){
                    let p = createElement("p") 
                    p.textContent = `${i.toUpperCase()} :  ${account[i]}`
                    accountBox.append(p)
                }  
            }
            let p = createElement("p") 
            p.textContent = `Amount :  ${res.amounts[i]}` 
            accountBox.append(p)
            e.target.parentNode.parentNode.append(accountBox)
       
        })
        */
    }).catch(err => console.log(err))
})