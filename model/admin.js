const mongoose     = require("mongoose") 
const Schema   = mongoose.Schema 
const adminSchema = new Schema({ 
    userName : String , 
    name : String , 
    password : String , 
    email : String , 
    profile : String ,
    role : String ,
    addedBy : String , 
    phoneNumber : String , 
    dateAdded : {
        type : Date , 
        default : Date.now()
    } ,  
    dateOfBirth: Date , 
    address : {
        country : String , 
        state : String , 
        province : String , 
        street : String , 
        zipCode : String
    } ,
    adminCode : String,
    bio : String
})   

module.exports = mongoose.model("admin" , adminSchema)