const TestPost   = require("../model/testPost") 
const Post   = require("../model/post") 
const Admin   = require("../model/admin")  

const FileHandler = require("../controller/file") 
const bcrypt    = require('bcryptjs') 
const CustomerCategory   = require("../model/customercategory") 
const Customer  = require("../model/customer")  
const CodeGenerator = require("./codeGenerator")  

class EmployeeApp { 
    getCustomerCategory = async (req , res) => {
        try { 
            const [admin , categories ] = await Promise.all([
                Admin.findOne({email : req.session.acefricaBlogAdmin}).lean()  , 
                CustomerCategory.find({}).lean() , 
            ])
            res.render("customers-cat" , {
                admin : admin , 
                title : "Celchin Customers" , 
                categories : categories , 
            })
        }catch(error){
            res.json({ 
                message : error.message
            })
        }
    } 
    createCustomerCategory = async (req , res) => {
        try { 
            const {title, description} = req.body 
            let admin = await Admin.findOne({email :  req.session.acefricaBlogAdmin}) 
            //Check if the category does not exist
            let category = await new CustomerCategory({
                title : title , 
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
    getCustomers = async (req , res) => {
        try { 
            const [admin , categories , customers] = await Promise.all([
                Admin.findOne({email : req.session.acefricaBlogAdmin}).lean()  , 
                CustomerCategory.find({}).lean() , 
                Customer.find({}).lean()
            ])
            res.render("customers" , {
                admin : admin , 
                title : "Customers" , 
                categories : categories , 
                customers : customers
            })
        }catch(error){
            res.json({ 
                message : error.message
            })
        }
    } 
    addCustomers = async (req , res) => {
        try {
            // let admin = await Admin.findOne({email : req.session.celchin_admin}) 
            let {name , contactPerson ,  email , phone , category} = req.body 
            let hashPassword = await bcrypt.hash(phone , 10) 
            let allUsers = await Customer.find({}) 
            let customerCode = CodeGenerator(allUsers , "0000000001" , "code" , 1 , 10)
            await new Customer({
                name : name , 
                contactPerson : contactPerson , 
                email : email , 
                phoneNumber : phone , 
                password : hashPassword , 
                category : [category] , 
                customerCode : customerCode
            }).save()
            .then(success => {
                res.redirect(req.url)
            }).catch(err => new Error("Could not save this record"))
        }catch(error){
            res.json({
                message : error.message
            })
        }
    } 
    deleteCustomer = async (req , res) => {
        try { 
            const {items} = req.body   
            await Customer.deleteMany({_id : {$in : items}})
            res.json({
                message : "This item was deleted successfully"
            })
        }catch(error){
            console.log(error)
            res.json({
                message : error.message
            })
        }
    } 
    editCustomer = async (req , res) => {
        try {
            const {items} = req.body  
            let count = items.length 
           
            while ( count > 0){
                for( let item of items){ 
                    const {name , id , email , mobile} = item
                    // let inquire   =  await Inquire.findById(id)
                    await Customer.findByIdAndUpdate(id, {
                       name : name , 
                       email : email , 
                       phoneNumber : mobile
                    } , {new : true , useFindAndModify : false})
                    count -= 1
                }
            }
            res.json({
                message : "Update was successful"
            })
        }catch(error){
            res.json({
                message : error.message
            })
        }
    }  
}

module.exports = new EmployeeApp()