const mongoose     = require("mongoose") 
const Schema   = mongoose.Schema 
const postSchema = new Schema({ 
    title : String , 
    content : String , 
    date : {
        type : Date , 
        default  : Date.now()
    } , 
    author : String , 
    seoDescription : String , 
    seoKeywords : String , 
    tags : [] , 
    catogory : String
})   

module.exports = mongoose.model("testPost" , postSchema)