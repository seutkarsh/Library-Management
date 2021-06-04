const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({
    path:'./.env'
});

exports.userToken = (req,res,next) =>{
    const token = req.cookies.userToken;
    if(!token)
    {
        res.render('login',{warning: "Unauthorized User"})
    }
    else{
        try {
            const verifyToken = jwt.verify(token,process.env.userToken);
            req.user=verifyToken;
            next();
            
        } catch (error) {
            res.render('login',{warning: "Unauthorized User"})
        }
        
    }
}

exports.adminToken = (req,res,next) =>{ 
    const token = req.cookies.adminToken;
    if(!token)
    {
        res.render('login',{warning: "Unauthorized User"})
    }
    else{
        try {
            const verifyToken = jwt.verify(token,process.env.adminToken);
            req.admin=verifyToken;
            next();
            
        } catch (error) {
            res.render('login',{warning: "Unauthorized User"})
        }
        
    }
}

exports.otpToken = (req,res,next) =>{ 
    const token = req.cookies.authToken;
    if(!token)
    {
        //alert
        res.render('login',{danger: "Unauthorized User"})
    }
    else{
        try {
            const verifyToken = jwt.verify(token,process.env.token);
            req.otp=verifyToken;
            next();
            
        } catch (error) {
            res.render('login',{danger: "Unauthorized User"})
        }
        
    }
}


