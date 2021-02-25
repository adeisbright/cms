//import readXlsxFile from 'read-excel-file' 
//<script src="https://unpkg.com/read-excel-file@4.x/bundle/read-excel-file.min.js"></script>
//https://cdnjs.com/libraries/Chart.js
import {sendData} from "./api.js"
//Handling only one excel file
var input = document.getElementById('file')
			input.addEventListener('change', function() {
               
			  readXlsxFile(input.files[0], { dateFormat: 'MM/DD/YY' }).then(function(data) { 
                let students  = data.filter((f , i , a) => a.indexOf(f) !== 0)
                let userRecords  = data 
                console.log(students) 
                sendData("/excel" , {names : students} )
                .then(res => console.log(res)) 
                .catch(err => console.log(err))
			  }, function (error) {
			  	console.error(error)
			  	alert("Error while parsing Excel file. See console output for the error stack trace.")
			  })
			})