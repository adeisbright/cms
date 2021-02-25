const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
const CategorySchema = new Schema({
    title : String , 
    description : String , 
    addedBy : {
        type : Schema.Types.ObjectId , 
        ref : "admin"
    } , 
    dateCreated : {
        type : Date , 
        default : Date.now()
    }
}) 

CategorySchema.index({title : 1})
//The model 
module.exports = mongoose.model('customercategory' , CategorySchema) 

//The account details for admins may not be necessary