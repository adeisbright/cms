
let selector = e => document.querySelector(e) 

const iDChange = selector("#iDPicture")
const paymentChange = selector("#paymentPicture")

iDChange.addEventListener('change' , showImage) 
paymentChange.addEventListener('change' , showImagePayment)

function showImage() {
	let files = this.files[0]  
    let acceptedFile = ["image/jpeg" , "image/jpg" , "image/png" , "image/gif"] 
    let divisor = 1024*1024
    let size = Number(files.size)/divisor
	let type = files.type 
	console.log(type)
	if (acceptedFile.includes(type)  && size  < 10) {
		let reader = new FileReader() 
		reader.onload = function(event) {
			selector(".hideID").style.display = "none"
			selector(".removeID").style.display = "block"
			let img = new Image() 
			img.onload = function() {
				selector("#displayIdCard").append(img)
			}
			img.src = event.target.result 
			img.style.width = '150px'
			img.style.height = '150px'
			img.id = "previewImage"
		}
		reader.onerror = function(event) {
			selector("#displayIdCard").textContent = "An error just occured"
		}
		reader.readAsDataURL(files) 
	}else{
		event.preventDefault() 
      	selector("#displayIdCard").textContent = "File size too large or not supported."
	}
} 

function showImagePayment() {
	let files = this.files[0]  
    let acceptedFile = ["image/jpeg" , "image/jpg" , "image/png" , "image/gif"] 
    let divisor = 1024*1024
    let size = Number(files.size)/divisor
	let type = files.type 
	console.log(type)
	if (acceptedFile.includes(type)  && size  < 10) {
		let reader = new FileReader() 
		reader.onload = function(event) {
			selector(".hidePayment").style.display = "none"
			selector(".removePayment").style.display = "block"
			let img = new Image() 
			img.onload = function() {
				selector("#displayPayment").append(img)
			}
			img.src = event.target.result 
			img.style.width = '150px'
			img.style.height = '150px'
			img.id = "previewImage2"
		}
		reader.onerror = function(event) {
			selector("#displayPayment").textContent = "An error just occured"
		}
		reader.readAsDataURL(files) 
	}else{
		event.preventDefault() 
      	selector("#displayPayment").textContent = "File size too large or not supported."
	}
}

let resetImage = selector("#removeID")

resetImage.addEventListener('click' , event => {
	event.preventDefault()
	let picture = selector("#iDPicture")
	let displayImage = selector("#previewImage")
	let hide = selector(".hideID")
	if(picture.value){
		picture.value = ""
		displayImage.parentNode.removeChild(displayImage)
		hide.style.display = "block"
	}
	selector(".removeID").style.display = "none"
})

let resetImagePayment = selector("#removePayment")

resetImagePayment.addEventListener('click' , event => {
	event.preventDefault()
	let picture = selector("#paymentPicture")
	let displayImage = selector("#previewImage2")
	let hide = selector(".hidePayment")
	if(picture.value){
		picture.value = ""
		displayImage.parentNode.removeChild(displayImage)
		hide.style.display = "block"
	}
	selector(".removePayment").style.display = "none"
})

 