
const mongoose=require("mongoose")

const admin=mongoose.Schema({
    adminName:{
        type:String,
        required:true
    },
    adminEmail:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }
})



const adminInfo=mongoose.model("adminInfo",admin);

module.exports=adminInfo;