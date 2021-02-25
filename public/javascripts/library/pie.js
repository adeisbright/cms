let selector = e => document.querySelector(e) 
let selectAll = e => document.querySelectorAll(e) 
let ctx = selector("canvas")

let  month = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun' , 'July' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'] 
let  income  = [4 , 12 , 9 , 13 , 5  , 10  , 7 , 11 , 4 , 8 , 13 , 9]
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: month,
        
        datasets: [{
            label: 'Number of Users',
            data: income,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ], 
            hoverBackgroundColor : '#f00' , //For each point it can be an array 
            showLine : true, // If you don;t want to show line 
            borderWidth: 1 , 
            borderAlign : "inner" , 
            hoverBorderColor : "#fa0" , 
            weight : 3
            
            /*barPercentage: 0.95,
        barThickness: 6,
        maxBarThickness:1,
        minBarLength: 2,
           */
        }]
    },
    //options should be empty if you need no grid
    options: {
        
    }
}) 
/**
 * This function deductAmount will go over an array and reduce the original amount
 */
let numbers = [20 , 40 , 50 , 300] 
function deductAmount(n , array) {
    let balance = [] 
    array.map((e , i) => { 
        if ( e > n ) {
            e = e - n ; n = 0
            balance.push({balance : e , carryOver :  0})
        }else if ( e < n ) {
            n = n - e 
            e = 0 
            balance.push({balance : e  , carryOver : n }) 
        }else if ( n === 0 ) {
            balance.push({balance : e , carryOver : 0 }) 
        }
    })
    return balance 
}