const express = require("express");

const router = express.Router();

const tokens = require("../src/verifyToken");

const admin = require("../src/controllers/admin");
const user = require("../src/controllers/user");
const home = require("../src/controllers/home");
const db=require("../src/database")

//Home Routes

router.get('/',home.home);

router.get('/DeveloperUtkarsh',(req,res) =>{
    res.redirect("https://www.linkedin.com/in/seutkarsh");
});

router.get('/DeveloperShrey',(req,res) =>{
    res.redirect("https://www.linkedin.com/in/shrey-tank");
});

router.get('/login',(req,res) =>{
    res.render('login');
});

router.get('/login/forgetpassword',(req,res) =>{
    res.render('forget-password');
});

router.get('/login/forgetpassword/authencation',tokens.otpToken,(req,res) =>{
    res.header().render('otp-authentication');
});

router.get('/login/forgetpassword/changepassword',tokens.otpToken,(req,res) =>{
    res.render('change-password');
});

router.get('/logout',(req,res)=>{
    res.clearCookie("authToken");
    res.clearCookie("userToken");
    res.clearCookie("adminToken");
    res.render('index',(err)=>{
        if(err)
        {
            console.log(err);
        }
        else
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
    })
})

//User's Routes

router.get('/user',tokens.userToken,user.dashboard);

router.get('/user/books-under-me',tokens.userToken,user.books_under_me);

router.get('/user/profile',tokens.userToken,user.profile);

router.get('/user/booksavailable',tokens.userToken,user.books_available);

router.get('/user/bookrequest',tokens.userToken,(req,res) =>{
    res.render('User/user-bookrequests');
});


//'s Routes

router.get('/admin',tokens.adminToken,admin.dashboard);

router.get('/admin/attendance',tokens.adminToken,(req,res) =>{
    res.render('Admin/admin-attendance');
});

router.get('/admin/attendance/mark',tokens.adminToken,admin.mark_attendance);

router.get('/admin/attendance/view',tokens.adminToken,admin.view_attendance);

router.get('/admin/books',tokens.adminToken,(req,res) =>{
    res.render('Admin/admin-books');
});

router.get('/admin/books/addbook',tokens.adminToken,(req,res) =>{
    res.render('Admin/admin-books-add-book');
});

router.get('/admin/books/issue',tokens.adminToken,(req,res) =>{
    res.render('Admin/admin-books-issue');
});

router.get('/admin/books/return',tokens.adminToken,admin.bookreturn1);

router.get('/admin/books/updatebook',tokens.adminToken,(req,res) =>{
    res.render('Admin/admin-books-update');
});

router.get('/admin/books/view',tokens.adminToken,admin.books_view);

router.get('/admin/books/bookrequest',tokens.adminToken,admin.book_request);

router.get('/admin/member',tokens.adminToken,(req,res) =>{
    res.render('Admin/admin-member');
});

router.get('/admin/member/addmember',tokens.adminToken,(req,res) =>{
    res.render('Admin/admin-member-add');
});

router.get('/admin/member/subscriptionrenew',tokens.adminToken,(req,res) =>{
    res.render('Admin/admin-member-subscription-renew');
});

router.get('/admin/member/susbcriptionview',tokens.adminToken,admin.subs_view);

router.get('/admin/member/update',tokens.adminToken,(req,res) =>{
    res.render('Admin/admin-member-update');
});

router.get('/admin/member/view',tokens.adminToken,admin.view_members);

// router.get('*',(req,res) =>{
//     res.render('404_NotFound');
// });

module.exports = router;
