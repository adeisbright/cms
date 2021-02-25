const mongoose     = require("mongoose") 
const Schema   = mongoose.Schema 
const postSchema = new Schema({ 
    title : String , 
    content : String , 
    category : {
        type : Schema.Types.ObjectId , 
        ref : "category"
    } , 
    status : "String" , 
    dateCreated : {
        type : Date , 
        default  : Date.now()
    } , 
    author : {
        type : Schema.Types.ObjectId , 
        ref : "admin"
    } , 
    seoDescription : String , 
    seoKeywords : String , 
    tags : [] , 
    uploads : [] ,
    featureImage : String  , 
    comment : [
        {
            date : Date ,  
            body : String , 
            commentBy : {
                type : Schema.Types.ObjectId , 
                ref : "customer"
            } , 
            replies : [
                { 
                   name : String , 
                   email : String , 
                   date : Date  , 
                   repliedBy : {
                    type : Schema.Types.ObjectId , 
                    ref : "customer"
                   }
                }
            ]
        }
    ] , 
    likers : [
        {
            ip : String , 
            region : String , 
            dateArrived : Date , 
            dateLeft : Date
        }
    ] , 
    views : [
        {
            ip : String , 
            region : String , 
            dateArrived : Date , 
            dateLeft : Date
        }
    ]
})   


postSchema.index({title : 1 , author : 1 , category  : 1 , dateCreated : -1}) 
//Working with document methods 
postSchema.methods.getPost = function(){ 
    const data = {
        title : this.title , 
        category : this.category
    }
    return data 
} 
//Working with middleware 
postSchema.pre("save" , function(){
    console.log("It was saved")
})

//Using virtuals - Document properties that you can get and set without persisting to the DB

postSchema.virtual("url").get(function() {
    return `/posts/${this.title}`
})

module.exports = mongoose.model("post" , postSchema)