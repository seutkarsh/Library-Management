const db = require('../database');
const mail = require('../mail');
const bcrypt = require("bcryptjs");
const functions = require('../functions');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const template = require('../../public/js/mailTemplates');


dotenv.config({
    path:'./.env'
});


exports.home = async (req,res) => {
    try 
    {
        db.query("SELECT *, COUNT(*) as copies FROM book GROUP BY book_name,author,publisher,edition,language,seller ORDER BY book_id DESC limit 10",(error,results)=>{
            if(error)
            {
                console.log(error);
            }
            else
            {
                return res.render('index',{data:results});
            }
        })
    } 
    catch (error) 
    {
        console.log(error);    
    }
}

exports.login = async (req,res) => {
    
    
    try 
    {
        const{email,password}=req.body;


        if(!email || !password)
        {
            return res.status(400).render('login',{
                info: 'Provide Email and Password'
            });
        }
        else if(email==process.env.adminid && password==process.env.adminpassword)
        {
            jwt.sign({admin:"abc"},process.env.adminToken,(err,token)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.cookie('adminToken',token);
                    return res.status(400).render('Admin/admin-dashboard',(err)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            db.query('SELECT *, COUNT(*) as copies FROM book GROUP BY book_name,author,publisher,edition,language,seller ORDER BY book_id DESC limit 10',(err,results)=>{
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    db.query('SELECT * FROM member ORDER BY member_id DESC LIMIT 5;',(err,result)=>{
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                        else
                                        {
                                            db.query('SELECT * FROM member ;',(err,member)=>{
                                                if(err)
                                                {
                                                    console.log(err);
                                                }
                                                else
                                                {
                                                    db.query('SELECT * FROM book;',(err,book)=>{
                                                        if(err)
                                                        {
                                                            console.log(err);
                                                        }
                                                        else
                                                        {
                                                            db.query('select * from attendance where date= ? and out_time=?', [functions.date(), "00:00:00"], (err, attendance) => {
                                                                if (err) {
                                                                    console.log(err);
                                                                }
                                                                else {
                                                                    res.render('Admin/admin-dashboard', {
                                                                        data1: results,
                                                                        data2: result,
                                                                        members: member.length,
                                                                        books: book.length,
                                                                        present: attendance.length
                                                                    });
                                                                }
                                                            })


                                                        }
                                                    })
                                                }
                                            })
                                            
                                        }
                                    })
                                }                
                            })
                        }
                    });
                }
            })
        }
        else
        {
            db.query('select * from member where email=?',[email],(error,results)=>{
                if(error)
                {
                    console.log(error);
                }

                else
                {
                    if(results.length ==0)
                    {
                        return res.status(401).render('login',{
                            warning: "User Doesn't exist"
                        });
                    }
                    else
                    {
                        bcrypt.compare(password,results[0].password,(err,re)=>{
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                if(!re)
                                {
                                    return res.status(401).render('login',{
                                        danger: "Password is Incorrect"
                                    });
                                }
                                else
                                {
                                    const user_id=results[0].member_id;
                                    jwt.sign({user_id:results[0].member_id},process.env.userToken,(err,token)=>{
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                        else
                                        {
                                            res.cookie('userToken',token);
                                            return res.status(200).header('authToken',token).render('User/user-dashboard',(err)=>{
                                                if(err)
                                                {
                                                    console.log(err);
                                                }
                                                else
                                                {
                                                    db.query("select * from book_request where br_member_id =? ", [user_id], (error, results) => {
                                                        if (error) {
                                                            console.log(error);
                                                        }
                                                        else {
                                                            db.query('SELECT *, COUNT(*) as copies FROM book GROUP BY book_name,author,publisher,edition,language,seller ORDER BY book_id DESC limit 10', (err, result) => {
                                                                if (err) {
                                                                    console.log(err);
                                                                }
                                                                else {
                                                                    db.query('select * from book,issue_return where issue_return.ir_member_id= ? and book.book_id = issue_return.ir_book_id and receiving_date= ?', [user_id, "0000-00-00"], (error, books) => {
                                                                        if (error) {
                                                                            console.log(error);
                                                                        }
                                                                        else {
                                                                            var a;
                                                                            var fine=0;
                                                                            for (a = 0; a < books.length; a++) {
                                                                                if (books[a].return_date < functions.date()) {
                                                                                    var days = functions.difdate(functions.date(), functions.convertdate(books[0].return_date));
                                                                                    fine= fine + ( days * 10);
                                                                                }
                                                                            }
                                                                            db.query('select * from subscription where sub_member_id=? ORDER BY sub_id DESC',[user_id],(err,sub)=>{
                                                                                if(err)
                                                                                {
                                                                                    console.log(err);
                                                                                }
                                                                                else
                                                                                {
                                                                                    var end_days=functions.difdate(functions.convertdate(sub[0].ending_date),functions.date());
                                                                                    res.render('User/user-dashboard', {
                                                                                        data1: results,
                                                                                        data2: result,
                                                                                        books_under_me: books.length,
                                                                                        fine:fine,
                                                                                        days:end_days
                                                                                    });
                                                                                }
                                                                            })
                                                                            
                                                                        }
                                                                    });
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            });
                                        }
                                    })  
                                }
                            }
                        });   
                    }   
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

exports.forget_password = async (req ,res) =>{
    try
    {
        const{email}=req.body;

        if(!email)
        {
            return res.status(400).render('forget-password',{
                info: 'Provide Email'
            });
        }
        else
        {
            db.query("select * from member where email=?", [email], (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    if (result.length == 0) {
                        return res.status(401).render('forget-password', { 
                            warning: "Email not registered." 
                        });
                    }
                    else {
                        otpcode=functions.otpcode();
                        user_id=result[0].member_id;
                        jwt.sign({ otp:otpcode, user_id:result[0].member_id} ,process.env.token,(err,token)=>{
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                mail(email,"Your Secret OTP ",template.otpcode(otpcode));
                                res.cookie('authToken',token);
                                return res.status(200).render('otp-authentication');
                            }
                        })
                    }
                }
            })
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

exports.authentication = async (req ,res) =>{
    try
    {
        const{otp}=req.body;
        const token = req.cookies.authToken;
        const otpcode = req.otp.otp;

        if(!otp)
        {
            return res.status(400).render('otp-authentication',{
                info: 'Enter OTP',
                otp:otp
            });
        }
        else
        {
            if (otp!=otpcode) 
            {
                return res.status(401).render('otp-authentication', { 
                    danger: "Wrong OTP." 
                });
            }
            else 
            {
                // res.cookie('authToken',token);
                return res.status(200).render('change-password');
            }
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

exports.change_password = async (req ,res) =>{
    try
    {
        const{password,confirmpassword} = req.body;
        const token = req.cookies.authToken;
        const user_id = req.otp.user_id;

        if(!password || !confirmpassword)
        {
            return res.status(400).render('change-password',{
                info:'Fill all the details'
            });
        }
        else if(password!=confirmpassword)
        {
            return res.status(401).render('change-password',{
                warning:"Password Doesn't Match"
            });
        }
        else
        {
            let hashedpassword = await bcrypt.hash(password, 10);

            db.query('Update member set password = ? where member_id=?',[hashedpassword,user_id],(error,results)=>{
                if(error){
                    console.log(error);
                }
                else
                {
                    if(results.affectedRows==0){
                        return res.status(400).render('change-password',{
                        danger: "Something went wrong at our end. Kindly try again. If the problem persists, contact your library incharge."});
                    }
                    else{
                        res.clearCookie("authToken");
                        return res.status(200).render('login', {
                            success: 'Password Updated'
                        });
                    }
                }
                
            });
        }
    }
    catch(error)
    {
        console.log(error);
    }
}


