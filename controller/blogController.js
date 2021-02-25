const Post   = require("../model/post") 
const Admin   = require("../model/admin")  
const Category   = require("../model/category") 
const Customercategory   = require("../model/customercategory") 
const Customer  = require("../model/customer") 
const RemoveTags = require("../controller/removeHTML")
class App {

    getHome = async (req , res) => {
        try {
            let posts = await Post.find({status : {"$nin" : "d"}}).sort({dateCreated : -1}).populate("author").populate("category") 
            let categories = await Category.find({}) 
            let canLogin 
            if (req.session.customerEmail){
                canLogin = false
            }
            res.render("home" , {
                title : "Bigjara Blogging Software" , 
                posts : posts , 
                categories : categories , 
                canLogin : canLogin
            }) 
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    //Need to take cognizance of pagination as the posts will be huge
    getPost = async (req , res) => {
        try {  
            let title = req.params.post.replace(/\-/g , " ")
            let posted = await Post.findOne({title : title}) 
            if (!posted) {
                res.json({m : "Does not exist"}) 
                return 
            } 
            let [post , categories] = await Promise.all([
                Post.findOne({title :title}).lean().populate("author").populate("category") ,
                Category.find({}).lean().select({description : 0}) 
            ])
            // let post = await Post.findOne({title :title}).populate("author").populate("category") 
            // let categories = await Category.find({}) 
            // Check if the user ip address was collected 
            let {views} = post 
            let isSeen  = views.find(ip => ip.ip === String(req.ip))
            if (!isSeen){  
                let region = "Nigeria" 
                let date = Date.now()
                views.push({
                    ip : req.ip , 
                    region : region , 
                    dateArrived : date 
                }) 
                await Post.findByIdAndUpdate(post._id , {
                    views : views
                } , {
                    new : true , 
                    useFindAndModify : false
                })
            }
            res.render("blog-post" , { 
                title : `${post.title}` , 
                metaDescription : `${post.seoDescription}` , 
                metaKeyword : `${post.seoKeywords}`, 
                post : post ,  
                categories : categories
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    addComment = async (req , res) => {
        try {  
            let title = req.params.post.replace(/\-/g , " ")
            let posted = await Post.findOne({title : title})
            if (!posted) {
                res.json({m : "Does not exist"}) 
                return 
            } 
            let post  = await Post.findOne({title :title}).lean() 
            // Check if the user ip address was collected 
            let {comment} = post 
            if (!req.session.customerEmail){
                comment.push({
                    body : req.body.content , 
                    date : new Date()
                }) 
            }
            await Post.findByIdAndUpdate(post._id , {
                comment : comment
            } , {
                new : true , 
                useFindAndModify : false
            })
            res.redirect(req.url)
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    updatePost = async (req ,res) => { 
        try { 
            let {id} = req.body
            let post = await Post.findById(id).populate("author").populate("category")  
            let {likers} = post 
            let isSeen  = likers.find(ip => ip.ip === String(req.ip)) 
            //console.log(req.ip , isSeen) 
            
            if (!isSeen){   
                console.log("Yes")
                let region = "Nigeria" 
                let date = Date.now()
                likers.push({
                    ip : req.ip , 
                    region : region , 
                    dateArrived : date 
                }) 
                await Post.findByIdAndUpdate(post._id , {
                    likers : likers
                } , {
                    new : true , 
                    useFindAndModify : false
                })
            }
            res.json({
                message : post.likers.length
            })

        }catch(error){
            res.json({message : error.message})
        }
    } 
    getUserLogin = async (req , res) => {
        try {
            res.render("customer-login")
        }catch(error){
            res.json({
                m : error.message
            })
        }
    }
    handleUserLogin = async (req , res) => {

    }
    getRegistration = async (req , res) => {
        try {
            res.render("user-registration")
        }catch(error){
            res.json({
                m : error.message
            })
        }
    }
    handleRegistration = async (req , res) => {

    } 
    getUserDashboard = async (req , res) => {

    } 
    getCategory = async (req , res) => {
        try {
            res.send("Category not yet implemented")
        }catch(error){
            res.send("Wahala dey")
        }
    }
}
module.exports = new App()