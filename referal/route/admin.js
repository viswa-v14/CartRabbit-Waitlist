const express=require("express");
const route=express.Router();


const admin=require("../models/admin")
const users = require("../models/users"); 


const bcrypt=require("bcrypt")

//admin sign up

route.post("/signup",async(req,res)=>{
    try {
        const data=req.body;
        const findUser= await admin.findOne({adminEmail:data.email});
        if(findUser)
        {
            res.json({
                mes:"email already exsist"
            })
        }
        else{
            const pass=await bcrypt.hash(data.password,7);
            const newAdmin=await admin.create({
                adminName:data.name,
                adminEmail:data.email,
                adminPassword:pass
            })
            res.json({
                mes:"signup successfull",
                newAdmin:newAdmin
            })
        }
    } catch (error) {
        res.json({err:error.message})
    }
    
    
})


route.post("/login",async(req,res)=>{
    try {
        const data=req.body;
        const admin_id=await admin.findOne({adminEmail:data.email});
        if(!admin_id){
            res.json({mes:"admin not found"});
        }
        else{
            const pass=await bcrypt.compare(data.password,admin_id.adminPassword)
            if(pass)
            {
                res.json({
                    mess:"login successful",
                    admin:admin_id
                })
            }
            else{
                res.json({mes:"password wrong"});
            }
        }
    } catch (error) {
        res.json({err:error.message})
    }
})
//admin leader board
route.get("/leaderboard",async(req,res)=>{
    try{
    const data=await users.find();
    const sorted=data.sort((a, b) => a.ref_by - b.ref_by);
    res.json(sorted)
    }
    catch(err){
        res.json({err:err.message})
    }

})

//admin del the person

route.delete("/del",async(req,res)=>{
    try {
        const del=await users.deleteOne({_id:req.query.id})
        res.json({
            mes:del
        })
    } catch (error) {
        res.json({err:error.message})
    }
})

module.exports=route;