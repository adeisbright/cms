import {sendData , getData , selector , selectAll , createElement } from "./api.js" 

const memberCode = selector("#memberCode"),
memberName = selector("#memberName"),
productCode = selector("#productCode") ,
loanAmount      = selector("#loanAmount") , 
loanDuration    = selector("#loanDuration"),
tableResult = selector("#tableResult")

const table = createElement("table")
table.setAttribute("class" , "table table-bordered")
const tbody = createElement("tbody")

table.innerHTML = `
    <thead>
        <tr>
            <th>Period</th>
            <th>Principal Paid</th>
            <th> Interest Due</th>
            <th>Year To Date Principal  </th>
            <th>Year to Date Interest </th>
            <th>Loan Balance</th>
        </tr>
    </thead>
    ` 

memberCode.addEventListener("blur" , event => { 
    let data = {
        code : event.target.value 
    }
    sendData("/get-member-details" , data)
    .then(res => memberName.value = res.message) 
    .catch(err => console.log(err.message))
})

productCode.addEventListener("change" , event => { 
    let data = {
        code : event.target.value 
    }
    let interestRate = selector("#interestRate") 
    sendData("/get-interest-rate" , data)
    .then(res => interestRate.value = Number(res.message)) 
    .catch(err => console.log(err.message))
}) 

loanDuration.addEventListener("blur" , event => {
    if (event.target.value !== " " && loanAmount.value !== "") {
        let totalInterest = selector("#totalInterest") , 
        totalRepayable    = selector("#totalRepayable") , 
        monthlyRepayment  = selector("#monthlyRepayment")
        let loanData = {
            loanCode : productCode.value.trim() ,
            loanAmount : loanAmount.value.trim()  , 
            loanDuration : loanDuration.value.trim()  
        }
        console.log(loanData)
        sendData("/get-loan-calculator" , loanData)
       .then(res => {
           
        totalInterest.value = res.message.totalInterest
        totalRepayable.value = res.message.totalRepayable 
        monthlyRepayment.value = res.message.monthlyRepayment 
        const arrayMapper = res.message.amortizer
        arrayMapper.map((loan , i) => { 
            const { 
                principalPaid, 
                interestDue  , 
                ytdPrincipal , 
                ytdInterest , 
                loanBalance } = loan
        
            let tr  = createElement("tr")
                tr.innerHTML = 
                        `<td> ${i + 1} </td>
                        <td> ${principalPaid} </td>
                        <td> ${ interestDue} </td>
                        <td> ${ ytdPrincipal} </td>
                        <td> ${ytdInterest} </td>
                        <td> ${loanBalance} </td>
                `
            tbody.append(tr)
        })
        table.append(tbody)
        tableResult.append(table)
        console.log(tableResult)
        })  
       .catch(err => console.log(err.message))
    }
})
 
    

