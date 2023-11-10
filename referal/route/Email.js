const express=require("express");
const app=express();

const nodemailer=require("nodemailer");
require('dotenv').config();



const sender = function (email) {
    try {
        const emailConfig = {
            service: "Gmail", // e.g., 'Gmail'
            auth: {
              user: process.env.myEmail,
              pass: process.env.myPass
            }
          };
    
          const transporter = nodemailer.createTransport(emailConfig);
         
          const to=email
    
          const subject="Coupon Code - CARTRABBIT"
    
          const text="Purchase your new product using this coupon code - JDF9-8DFF-N43G-FSJN"
    
          const mailOptions = {
            from: emailConfig.auth.user,
            to,
            subject,
            text
          };
    
    const datas=transporter.sendMail(mailOptions);

    return datas;
    } catch (error) {
        return error.message;
    }
    
  };

  module.exports=sender