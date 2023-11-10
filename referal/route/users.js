const express = require("express");
const route = express.Router();
const users = require("../models/users"); 

const bcrypt=require("bcrypt")

const sender=require("./Email");





//login for user
route.post("/login",async(req,res)=>{
    try {
        const data=req.body;
        const user_id=await users.findOne({email:data.email});
        if(!user_id){
            res.json({mes:"user not found"});
        }
        else{
            const pass=await bcrypt.compare(data.password,user_id.password)
            if(pass)
            {
                res.json({
                    mess:"login successful",
                    user:user_id
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

// sign up for new user
route.post("/newUser_signup", async (req, res) => {
    try {
        const data = req.body;
        
        const findUser=await users.findOne({email:data.email})

        if(!findUser){
        
        const allData = await users.find();
        const newUser_ref_id = allData.length !== 0 ? allData[allData.length - 1].ref_id + 1 : 99;
        const pass = await bcrypt.hash(data.password,7)
        
        const newUser = new users({
            userName: data.userName,
            email: data.email,
            password: pass,
            ref_id: newUser_ref_id,
            ref_user_ids: []
        });

        await newUser.save(); // Save the new user to the database

        
        
        res.json({
            mes:"signup successfull",
            newUser:newUser
        });
    }
    else{
        res.json({
            mes:"email already exsist"
        })
    }
    } catch (err) {
        res.json({ error: err.message }); 
    }
});
// signup for new user referd by someone
route.post("/ref_add", async (req, res) => {
    try {
        const data = req.body;
        const ref_by = req.query.ref_by;

        const findUser=await users.findOne({email:data.email})

        if(!findUser){
        const allData = await users.find();
        const pass = await bcrypt.hash(data.password,7)
        
        const newUser_ref_id = allData.length !== 0 ? allData[allData.length - 1].ref_id + 1 : 99;

        const newUser = new users({
            userName: data.userName,
            email: data.email,
            password: pass,
            ref_id: newUser_ref_id,
            ref_by: ref_by,
            ref_user_ids: []
        });
        await newUser.save();
        console.log(newUser._id)
        const result = await users.updateOne(
            { _id: ref_by },
            {
                $push: { ref_user_ids: newUser._id },
                $inc :{ref_id:-1}
            }
        );

        const referal_id=await users.findOne({_id:ref_by});
        if(referal_id.ref_id==1)
        {
            sender(referal_id.email);
        }
        res.json({
            mes:"signup successful",
            newUser:newUser
        })
    }
    else{
        res.json({
            mes:"email already exsist"
        })
    }
    } catch (err) {
        res.json({ error: err.message }); // Send the error message in the response
    }
});



route.get("/leaderboard",async(req,res)=>{
    try{
    const data=await users.find();
    const sorted=data.sort((a, b) => a.ref_by - b.ref_by);
    console.log("Saved")
    res.json({data:sorted})
    }
    catch(err){
        res.json({err:err.message})
    }
    
})


module.exports = route;
