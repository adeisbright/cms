import {validateMobile , validateEmail , validatePassword ,
    verifyPassword, validateName, validateUserName ,
    validateFullName ,  validateAccountNumber} from "./validate.js" 
import {sendData , putData , getData , selector , selectAll , createElement } from "./api.js" 
// The model for configuring our site application 
const Model = {
    countries : [{
        name : "Nigeria" , 
        states : [{
            name  : "Abia" , 
            province : ["Aba" , "Umuahia" , "Bende"]
        } , {
                name  : "Lagos" , 
                province : ["Ikeja" , "Ketu" , "Lekki"]
            }
        ]
    } , {
        name : "Ghana" , 
        states : [{
            name : "Accra" , 
            province : ["Mensah" , "Akwaba"]
        }]
    } , {
        name : "Benin Republic" , 
        states : [{
            name : "Porto Norvo" , 
            province : ["Zakas" , "Sokro"]
        }]
    }
] , 
    bankNames : [
        "First Bank" , "Access Bank" ,"Access Diamond Bank" , 
        "UBA" , "FCMB" , "Sterling Bank"  , "Zenith Bank" , "Fidelity Bank" , 
        "GTB" , "Union Bank" , "Citibank" , "Ecobank" , "Heritage Bank" , 
        "Keystone Bank" , "Polaris Bank" , "Stanbic IBTC" , "Standard Chartered" ,
        , "Unity Bank" , "Wema Bank" , "SunTrust Bank" , "Titan Trust" , 
        "Providus Bank" , "Jaiz Bank" ,"Globus Bank"
        ] ,
    validFormValue : {}
} 
// The view for our site configuration 
class RegistrationView  { 
    constructor() {
        this.select = selector("#stateR") 
        this.inputs = Array.from(this.getElements(".form-control"))
        this.selects = Array.from(this.getElements("select"))
        this.submitButton = selector("#submit") 
    } 
    createElement(tag){
		return document.createElement(tag)  
	}
	getElement(target) {
		return document.querySelector(target) 
    } 
	getElements(target) {
		return document.querySelectorAll(target) 
	} 
} 
/**
 * The controller uses the idea of single source of truth for countries , states , province  , and dial code
 */
class Controller { 
    constructor(){
        this.view = new RegistrationView()
        this.socket = io("/admin/settings/site-configuration")  
        this.addEvent()
    }
    handleFocus(e){
        if (e.target.id === "bankName"){ 
            while(e.target.firstChild){
                e.target.firstChild.remove()
            }
            Model.bankNames.sort((a , b) => a.localeCompare(b)).map(bank => {
                let option = createElement("option") 
                option.value = bank
                option.textContent = bank
                e.target.append(option) 
            })
        }
        if (e.target.id === "country"){
            while(e.target.firstChild){
                e.target.firstChild.remove()
            }
            Model.countries.sort((a , b) => a.name.localeCompare(b.name)).map((country , index) => {
                let option = createElement("option") 
                option.value = country.name 
                option.textContent = country.name
                e.target.append(option) 
            })
        }
        if (e.target.id === "state"){
            while(e.target.firstChild){
                e.target.firstChild.remove()
            }
            console.log(e.target.value)
            let indexOfCountry = Model.countries.findIndex(country => country.name === selector("#country").value) 
            Model.countries[indexOfCountry].states.sort((a , b) => a.name.localeCompare(b.name)).map((state , index) => {
                let option = createElement("option") 
                option.value = state.name 
                option.textContent = state.name
                e.target.append(option) 
            })
        }
        if (e.target.id === "province"){
            while(e.target.firstChild){
                e.target.firstChild.remove()
            }
            console.log(e.target.value)
            let indexOfCountry = Model.countries.findIndex(country => country.name === selector("#country").value) 
            let indexOfState   = Model.countries[indexOfCountry].states.findIndex(state => state.name === selector("#state").value)
            Model.countries[indexOfCountry].states[indexOfState].province.sort((a , b) => a.localeCompare(b)).map((province , index) => {
                let option = createElement("option") 
                option.value = province  
                option.textContent = province
                e.target.append(option) 
            })
        }
    } 
    handleChange(event) {
        if (event.target.tagName === "SELECT") {
            event.target.value = event.target.value 
            Model.validFormValue[`${event.target.id}`] = event.target.value 
            console.log(event.target.value) 
            if (event.target.id === "country"){
                let indexOfSelection = Model.countries.findIndex(country => country.name === event.target.value) 
                selector("#state").firstChild.remove() 
                let option = createElement("option") 
                option.textContent = Model.countries[indexOfSelection].states[0].name
                option.value = Model.countries[indexOfSelection].states[0].name
                selector("#state").append(option)
                selector("#state").value = Model.countries[indexOfSelection].states[0].name
            }
            if (event.target.id === "state"){
                let indexOfCountry = Model.countries.findIndex(country => country.name === selector("#country").value) 
                let indexOfState   = Model.countries[indexOfCountry].states.findIndex(state => state.name === event.target.value)
                console.log(Model.countries[indexOfCountry].states[indexOfState].province[0])
                Model.countries[indexOfCountry].states[indexOfState].province[0] 
                selector("#province").firstChild.remove() 
                let option = createElement("option") 
                option.textContent = Model.countries[indexOfCountry].states[indexOfState].province[0]
                option.value = Model.countries[indexOfCountry].states[indexOfState].province[0]
                selector("#province").append(option)
                selector("#province").value = Model.countries[indexOfCountry].states[indexOfState].province[0]
                
            }
        }
    }
    // handleSubmit(event){
    //     event.preventDefault() 
    //     let formFields = Array.from(selectAll(".form-control"))
    //     let configurationData = {}
    //     if (formFields.every(input => input.value !== null && input.value !== "" && event.target.id === "submit")){
    //         formFields.map(field => {
    //             configurationData[`${[field.id]}`] = field.value
    //         })
    //         console.log(configurationData)
    //     }
    // }
    addEvent(){
        this.view.selects.map(select =>{
            select.addEventListener("focus" , this.handleFocus)
            select.addEventListener("change" , this.handleChange)
        })
        
    }
} 
new Controller
//The controller for everything 