let selector = e => document.querySelector(e) 
let selectAll = e => document.querySelectorAll(e) 
let ctx = Array.from(selectAll("canvas"))
let progress = selector("#progress")
let  users = ['Customer', 'Employee', 'Supplier', 'Government', 'Community', 'International'] 
let  data  = [4 , 12 , 9 , 13 , 5  , 10 ]
ctx.map(e => { 
 e.getContext("2d")
 
var myChart = new Chart(e, {
    type: 'pie',
    data: {
        labels: users,
        datasets: [{
            label: 'Number of Users',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
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
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        } , 
        tooltips : {
            mode : "nearest" //"point"
        } , 
        legend : { 
            display : false , 
            position : "top" , 
            align : "left" , 
            labels : {
                fontColor : "#339" , 
                /*boxWidth : 20 , 
                fontSize : "14px" , 
                fontFamily : "Helvetica , sans-serif" , 
                padding : 10
                */
            }
        } , 
        animation: {
            duration: 20  , // general animation time 
            easing : "easeInOutBounce" , 
            onProgress : function(animation) {
                progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps
            }
        },
        hover: {
            animationDuration: 10 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 10 ,// animation duration after a resize
        //events : ["click" , "touchstart"  , "touchmove"]
        //If you don't need a bezier curve then use the follwing 
        elements: {
            line: {
                tension: 0 // disables bezier curves
            }
        } ,
        //To disable line drawing , comment out the code below 
        data: {
            datasets: [{
                showLine: false // disable for a single dataset
            }]
        },
            showLines: false // disable for all datasets
        , 
        /*layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
        */
       title : {
           display : true , 
           text : "Chart of Graphs" , 
           /*position : "bottom" , 
           padding : "10" , 
           fontFamily : "Helvetica , sans-serif" , 
           fontStyle : "italic" , 
           fontSize : "16px"*/
       }
    }
})

})