const { ObjectID } = require("bson")
const mongoose     = require("mongoose") 
const Post = require("./post")
const Schema   = mongoose.Schema 
const categorySchema = new Schema({ 
    name: String , 
    description : String , 
    profile : String , 
    addedBy : {
        type : Schema.Types.ObjectId , 
        ref : "admin"
    } 
})   

categorySchema.index({name : 1}) 
//Add hooks 
//This will always run before the document is saved to the database 
categorySchema.pre("save" , function(){
    console.log(this + "was saved")
} ) 

//Query Middleware
// categorySchema.pre("remove" , {query:true , document : false} ,async function(){
//     console.log("It was removed")
//     await this.model('post').deleteMany({ category: this._id });
    
// } ) 

//Document Middleware 

//This refers to the document - Whenever we remove a category , every post that references it will be removed
categorySchema.pre("deleteOne" ,{ document: true, query: false }, async function(next){
    await Post.deleteMany({ category: this._id });
    next()
} )
module.exports = mongoose.model("category" , categorySchema)