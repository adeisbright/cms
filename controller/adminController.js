const TestPost   = require("../model/testPost") 
const Post   = require("../model/post") 
const Admin   = require("../model/admin")  
const Category   = require("../model/category") 
const FileHandler = require("../controller/file") 
const bcrypt    = require('bcryptjs') 
const Customercategory   = require("../model/customercategory") 
const Customer  = require("../model/customer") 
class App { 
    getLogin = async (req , res) => {
        try { 
            if (req.session.acefricaBlogAdmin){
                let {acefricaBlogAdmin} = req.session 
                let isAdmin = await Admin.findOne({email : acefricaBlogAdmin}) 
                if (isAdmin){ 
                   res.redirect("/dashboard")
                }else {
                    res.render("new-login" , { 
                        title : "ACE AFRICA: login" , 
                        appUser : "ADELEKE" , 
                        metaDescription : "ACE AFRICA makes learning of digital skills and participating in the digital economy simple" , 
                        metaKeyword : "Digital Skills , Digital Economy , Soft skills , Outsourcing , Quality Jobs"
                    })
                }
            }else {
                res.render("new-login" , { 
                    title : "ACE AFRICA: login" , 
                    appUser : "ADELEKE" , 
                    metaDescription : "ACE AFRICA makes learning of digital skills and participating in the digital economy simple" , 
                    metaKeyword : "Digital Skills , Digital Economy , Soft skills , Outsourcing , Quality Jobs"
                })
            }
        }catch(error){
            res.json({message : error.message})
        }
    } 
    handleLogin = async (req , res , next) => {
        try { 
            const {email , password} = req.body
            const isAdmin = await Admin.findOne(
                    { email : email})
            if(isAdmin){
                let verifyPassword = await bcrypt.compare(password , isAdmin.password)
                if (verifyPassword){ 
                        req.session.acefricaBlogAdmin = email
                        res.redirect(`/dashboard`)
                }else {
                    res.render('new-login' , {error : "Invalid Credentials Provided"}) 
                }
            }else {
                res.render('new-login' , {error : "Invalid Credentials Provided"}) 
            }
           
        }catch(error) {
            res.json({message : error.message})
        }
    } 
    getAdminRegistration = async (req , res) => {
        try {
            res.render("admin-registration" , {
                metaDescription : "A basic investment application" , 
                metaKeyword : "Investment , Cash money , Make money"
            })
        }catch(error){
            res.json({message : error.message})
        }
    }
    handleRegister = async (req , res) => { 
        try {
            const {
                email , password
            } = req.body.data 
            let findAdmin = await Admin.find({ 
                $or : [{email : email}]
                }) 
            if(findAdmin.length == 0){ 
                let pass = await bcrypt.hash(password , 10)   
                let admin = await new Admin({
                    email : email , 
                    password : pass , 
                    role : "author"
                }) 
                let saveAdmin = await admin.save() 
                if (saveAdmin) { 
                    req.session.acefricaBlogAdmin = email
                    res.json({
                        message : `Hello your registration was successful. You will be redirected to the dashboard in 5s` , 
                        isRegistered : true
                    })
                }else {
                    throw new Error("Error while saving your data")
                }
            }else {
                res.json({
                    message : "The credentials you provided already exist. Try using a new email"
                }) 
            } 
            
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    handleLogout = (req ,res) => {
        delete  req.session.acefricaBlogAdmin
        res.redirect("/login")
    }
    getAdmin = async (req , res) => {
        try {
          res.render("dashboard" , {
              title : "Admin Portal" , 
              admin : true
        })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
     // Administrator Management 
    getAllAdmin = async(req , res) => {
        try { 
            let admins = await Admin.find({}) 
            let admin = await Admin.findOne({email :  req.session.acefricaBlogAdmin})
            res.render("admins" , {
                admins : admins , 
                admin :admin, 
                title : "Admins" 
            })
        }catch(error){
            res.json({message : error.message})
        }
    } 
     // This will delete the admins added to the user collection 
     // Only admin with such priviledge should be able to perform this operation
    deleteAdmin = async (req , res) => {
         try { 
             if(req.session.userName){ 
                 const admin = await Admin.findOne({userName : req.session.userName}) 
                 if (admin){
                     //Get the body of the post 
                     let admins = req.body.usersToDelete 
                     console.log(req.body)
                     if (admins.length > 1 && admin.role === "Admin"){ 
                         let deleteAdmins = await Admin.deleteMany({email : { $in : admins}}) 
                         res.json({message : "I deleted it "})
                     }else if (admins.length === 1  && admin.role === "Admin"){ 
                         const [admins ] = req.body.usersToDelete 
                         await Admin.deleteOne({email : admins}) 
                         res.json({message : "I deleted it "})
                     }else {
                         res.json({message : "No argument provided or you need admin right to do this"})
                     }
                 }else {
                     res.json({message : "Invalid User"})
                 }
             }else {
                 res.json({message : "Session Expired"})
             }
         }catch(error){
             res.json({message : "An error occured"})
         }
    } 
    addNewAdmin = async (req , res) => {
        try {
            if(req.session.userName){ 
                const admin = await Admin.findOne({userName : req.session.userName}) 
                if (admin){ 
                    const {userName , role , email , password , telephone} = req.body.adminData 
                    console.log(userName , role , email , password , telephone)
                    let everyAdmin  = await Admin.find({})
                    let code = "G" + AccountNumberGenerator(everyAdmin,  "001" ,  "adminCode" , 1 , 3 ) 
                    let admins = await Admin.find(
                        { $or : [{userName : userName} ,
                        {email : email}, 
                        {phoneNumber : telephone}
                    ]}) 
                    
                    if (admins.length === 0 && admin.role === "Admin"){
                        let encryptPassword = await bcrypt.hash(password , 10) 
                        let newAdmin = await new Admin({
                            userName : userName , 
                            password : encryptPassword , 
                            email : email ,
                            role : role , 
                            phoneNumber : telephone ,
                            adminCode : code
                        }) 
                        let saveAdmin = await newAdmin.save() 
                        if (saveAdmin){  
                            res.json({
                                message : "The admin was added" , 
                                admin : saveAdmin 
                            }) 
                        }else {
                            throw new Error("Problem with database")
                        }
       
                    }else {
                        res.json({
                            message : "Admin already exist or you lack the power to create one"
                        })
                    }
                  
                }else {
                    res.json({message : "Your login credentials are invalid"}) 
                }
            }else{
                res.json({message : "Your session Expired"})
            }

        }catch(error){
            res.json({message : error.message})
        }
    } 
    //Viewing Single Admin 
    getSingleAdmin = async (req, res, next) => {
        if(req.session.userName){
            try{
                const admin = await Admin.findOne({userName : req.session.userName})
                const singleAdmin = await Admin.findOne({_id : req.params.adminID})
                if(singleAdmin){ 
                    res.render("single-admin", 
                    {
                        admin : admin, 
                        singleAdmin : singleAdmin, 
                       page : singleAdmin.userName, 
                       success : req.flash('success')})
                }else{
                    throw{
                        message : "Params not found."
                    }
                }
            }catch(err){
                res.send(err)
            }
        }else{
            res.redirect(303, '/admin')
        }
    } 
    getAdminSetting = async(req , res) => {
        try { 
            const admin = await Admin.findOne({email :  req.session.acefricaBlogAdmin})
            res.render("settings" , {
                admin : admin , 
                title : "Admin Settings" 
            })
        }catch(error){
            res.redirect(303 , "/admin")
        }
    } 
    
    updateAdminInformation = async (req , res) => {
        try{
            if( req.session.acefricaBlogAdmin){
                const admin = await Admin.findOne({email :  req.session.acefricaBlogAdmin}) 
                if (admin){
                    const {fullName , email , userName , bio} = req.body.data 
                    let existingAdmin = await Admin.find(
                        { $or : [{userName : userName} ,
                        {email : email}, 
                        {name : fullName}
                    ]}) 
                    if (existingAdmin.length === 1 && existingAdmin[0].email === admin.email){
                        await Admin.findByIdAndUpdate(admin._id , {
                            email : email , 
                            name : fullName , 
                            userName : userName , 
                            bio : bio
                        } , {
                            new : true ,
                            useFindAndModify : false
                        }) 
                        res.json({message : "Your detail was updated"})
                    }else {
                        res.json({message : "An admin exist with this record"})
                    }
                }else {
                    res.json({message : "Access Right is lacking"})
                }
            }else {
                res.json({message : "You have no access right"})
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    
    checkPassword = async (req , res) => {
        try {
            if(req.session.userName){
                const admin = await Admin.findOne({userName : req.session.userName}) 
                if (admin){
                    const {password} = req.body.data 
                    let isPassCorrect = await bcrypt.compare(password , admin.password) 
                    if (isPassCorrect){
                        res.json({
                            message : true
                        })
                    }else {
                        res.json({
                            message : false
                        })
                    }
                }else {
                    res.json({
                        message : false
                    })
                }
            }else {
                res.json({
                    message : false
                })
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    resetPassword = async (req , res) => {
        try{
            if(req.session.userName){
                const admin = await Admin.findOne({userName : req.session.userName}) 
                if (admin){
                    const {password , confirmPassword} = req.body.data 
                    if (password === confirmPassword){ 
                        let encryptPassword = await bcrypt.hash(password , 10) 
                        await Admin.findByIdAndUpdate(admin._id , {
                            password : encryptPassword
                        } , {
                            new : true ,
                            useFindAndModify : false
                        }) 
                        res.json({message : "Your password was updated"})
                    }else {
                        res.json({message : "Password does not match"})
                    }
                }else {
                    res.json({message : "Access Right is lacking"})
                }
            }else {
                res.json({message : "You have no access right"})
            }
        }catch(error){
            res.json({
                message : "A disturbing error occured"
            })
        }
    }
    handleUpdateAvatar = async (req , res) => {
        try {
            if ( req.session.acefricaBlogAdmin){
                let admin = await Admin.findOne({email :  req.session.acefricaBlogAdmin}) 
                if (req.file && admin){  
                    FileHandler.deleteFile(`./public/avatars/${admin.profile}`) 
                    let date = new Date().getDate()
                    let fileName =   `${ req.session.acefricaBlogAdmin}-${date}-${req.file.originalname}`  
                    // Update the admin information  as regards profile 
                    let updateAvatar = await Admin.findByIdAndUpdate(admin._id , {
                        profile : fileName
                    } , {
                        new : true , 
                        useFindAndModify : false
                    })
                    if ( updateAvatar) {
                        //Now move the file from the temporary location to the location for storing such files 
                        FileHandler.createDirectory("./public/avatars")  
                        FileHandler.moveFile(fileName , "./public/uploads" , "./public/avatars") 
                        res.redirect("/settings")
                    }else {
                        res.send("Something bad happened while saving your image on the system")
                    }
                }else {
                    res.send("Please , attach a file")
                }
            }else {
                res.redirect(303 , "/login")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getCategories = async(req , res) => {
        try { 
            //lean makes mongoose to return plain JSON objects instead of mongoose Documents 
            // Mongoose Documents are heavier than Plain Old Javascripts Object 
            // lean will make it impossible for you get access to virtuals , getters , setters , etc 
            // that enables tracking. It is good for end points like find()  that do not modify the state of the db
            // let [category , admin] = await Promise.all([
            //      Category.find({}).lean().select({_id : 0})  ,
            //      Admin.findOne({email :  req.session.acefricaBlogAdmin}).lean()
            // ])
            let categories = await Category.find({})//.lean().select({_id : 0}) 
            let admin = await Admin.findOne({email :  req.session.acefricaBlogAdmin})//.lean()
            res.render("pages" , {
                pages: categories , 
                admin :admin ,  
                title : "pages" 
            })
        }catch(error){
            res.json({message : error.message})
        }
    } 
    createCategory = async (req ,res) => {
        try { 
            const {name , description} = req.body 
            let admin = await Admin.findOne({email :  req.session.acefricaBlogAdmin}) 
            //Check if the category does not exist
            let category = await new Category({
                name : name , 
                description: description , 
                addedBy :admin._id , 
            }) 
            let saveCategory = await category.save() 
            if (saveCategory){
                res.redirect(req.url)
            }else {
                throw new Error()
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    deletePostCategory = async (req , res) => {
        try { 
            if (req.query) {
                const categoryName = req.params.categoryName 
                const shouldDelete = req.query.delete 
                if (shouldDelete === "true"){
                    let n = await Category.findOne({name : {$in : categoryName}}) 
                    await n.deleteOne()
                    // await Category.findOneAndRemove({name : {$in : categoryName}} , {useFindAndModify : false})
                    res.json({
                        message : "This category has been removed"
                    })
                }
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    updatePostCategory = async (req , res) => {
        try { 
            let category = await Category.finOne({name : req.params.categoryName})  
            const {name ,description} = req.body 
            if (category) {
                await Category.findByIdAndUpdate(category._id , {
                    name : name , 
                    description: description  , 
                } , {new : true , useFindAndModify : false}) 
                res.json({
                    message : "We are about to start handling the case "
                })
            }else {
                throw new Error()
            }
            
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getCreatePost =  async (req , res) => {
        try { 
            const [posts , categories , admin] = await Promise.all([
                Post.find({}).sort({dateCreated : -1}).lean()  , 
                Category.find({}).lean().select({_id : 1 , name : 1}) , 
                Admin.findOne({email :  req.session.acefricaBlogAdmin}).lean().select({_id : 1})
            ])
            res.render("posts" , {
                title : "Add a new post" , 
                admin :  admin, 
                posts : posts , 
                categories : categories 
            }) 
          }catch(error){
              res.json({
                  message : error.message
              })
          }
    }
    handleCreatePost = async (req ,res) => {
        try {
            const { title , content , author , description , keywords , tags , category} = req.body.data  
            //Query and Ensure the post is unique before proceeding to creating the post 
            const isNotUniquePost = await Post.findOne({title : title}) 
            if (!isNotUniquePost){
                await new Post({
                    title : title , 
                    content : content , 
                    author : author , 
                    category : category , 
                    seoDescription : description , 
                    seoKeywords : keywords , 
                    tags : tags  , 
                    status : "d"
                }).save()
                .then(success => {
                    res.json({
                        message : `your post was saved to the database`
                    })
                }).catch(err => {
                    throw new Error("Could not save to the database" + " " + err)
                })
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
    fetchPost = async (req , res) => {
        try { 
            let post = await Post.findById(req.params.id) 
            res.json(post) 
           
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    getSinglePost = async (req , res) => {
        try { 
            let post = await  Post.findOne({title : req.params.title}).populate("author" , "name").populate("category" , "name" )//.lean().select({_id : 0}) 
            //console.log(post.getPost())
            res.render("single-post" , {
                appUser : "anonymous" , 
                metaDescription : `hello` , 
                metaKeyword : "Investment , Cash money , Make money" , 
                post : post
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
    updateAndPublishPost = async (req ,res) => {
        try {
            if ( req.session.acefricaBlogAdmin){
                let post = await Post.findOne({title : req.params.title})
                if (req.file && post){  
                    FileHandler.deleteFile(`./public/posts/${post.featureImage}`) 
                    let date = new Date().getDate()
                    let fileName =   `${ req.session.acefricaBlogAdmin}-${date}-${req.file.originalname}`  
                    // Update the admin information  as regards profile 
                    let updateAvatar = await Post.findByIdAndUpdate(post._id , {
                        featureImage : fileName , 
                        status : "p" 
                    } , {
                        new : true , 
                        useFindAndModify : false
                    })
                    if ( updateAvatar) {
                        //Now move the file from the temporary location to the location for storing such files 
                        FileHandler.createDirectory("./public/posts")  
                        FileHandler.moveFile(fileName , "./public/uploads" , "./public/posts") 
                        res.redirect(req.url)
                    }else {
                        res.send("Something bad happened while saving your image on the system")
                    }
                }else {
                    res.send("Please , attach a file")
                }
            }else {
                res.redirect(303 , "/login")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    deletePost = async (req , res) => {
        try { 
            if (req.params.id) {
                if (true){
                    let n = await Post.findByIdAndDelete(req.params.id) 
                    await n.deleteOne()
                    res.json({
                        message : "The post was deleleted"
                    })
                }
            }else {
                throw new Error("Properly formatted reqeuest")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    createCustomerCategory = async (req , res) => {

    }
    getCustomerCategories = async (req ,res) => {

    }
    getCustomerCategory = async (req ,res) => {

    } 
    updateCustomerCategory = async (req , res) => {

    }
    deleteCustomerCategory = async (req , res) => {

    }
    addCustomer = async (req , res) => {

    }
    getBigjaraPortal = async (req , res) => {
      try {
          res.render("adminpanel" , {
              title : "Bigjara Blog : Admin Portal"
          })
      }catch(error){
          res.json({
              message : error.message
          })
      }
    } 
    checkIfLogin = async (req , res  , next) => {
        try { 
            
            if (req.session.acefricaBlogAdmin){
                let {acefricaBlogAdmin} = req.session 
                let isAdmin = await Admin.findOne({email : acefricaBlogAdmin}) 
                if (isAdmin){ 
                    if (req.url === "/login") res.redirect("/dashboard")
                    next()
                }else {
                    res.redirect("/login")
                }
            }else {
                res.redirect("/login")
            }
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }
}
module.exports = new App() 