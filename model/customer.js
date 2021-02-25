const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const CustomerSchema = new Schema({
    name : String , 
    contactPerson : String , 
    password : String , 
    email : String , 
    profile : String ,
    phoneNumber : String , 
    dateAdded : {
        type : Date , 
        default : Date.now()
    } ,  
    age : Number , 
    address : {
        country : String , 
        state : String , 
        province : String , 
        street : String , 
        zipCode : String
    } ,
    customerCode : String, 
    category : [{
        type : Schema.Types.ObjectId , 
        ref : "customercategory" , 
        _id : false 
    }]
}) 

CustomerSchema.index({email : 1 , userName : 1})
//The model 
module.exports = mongoose.model('customer' , CustomerSchema) 

//The account details for admins may not be necessary