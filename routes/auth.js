const express = require("express");

const admin = require("../src/controllers/admin");
const user = require("../src/controllers/user");
const home = require("../src/controllers/home");

const tokens = require("../src/verifyToken");

const router = express.Router();

//Routes for Home pages
router.post('/login',home.login);
router.post('/forget_password',home.forget_password);
router.post('/authentication',tokens.otpToken,home.authentication);
router.post('/change_password',tokens.otpToken,home.change_password);

//Routes for user's pages
router.post('/book_request',tokens.userToken,user.book_request);
router.post('/update_password',tokens.userToken,user.update_password);
router.post('/change_image',tokens.userToken,user.change_image);
router.post('/remove_image',tokens.userToken,user.remove_image);

//Routes for admin's pages
router.post('/add_member',tokens.adminToken,admin.add_member);
router.post('/updatemember1',tokens.adminToken,admin.updatemember1);
router.post('/updatemember2',tokens.adminToken,admin.updatemember2);
router.post('/subscription',tokens.adminToken,admin.subscription);
router.post('/addnewbook',tokens.adminToken,admin.addnewbook);
router.post('/updatebook1',tokens.adminToken,admin.updatebook1);
router.post('/updatebook2',tokens.adminToken,admin.updatebook2);
router.post('/bookissue',tokens.adminToken,admin.bookissue);
router.get('/bookreturn/:ir_id',tokens.adminToken,admin.bookreturn);
router.get('/in_time/:member_id',tokens.adminToken,admin.in_time);
router.get('/out_time/:member_id',admin.out_time);
router.get('/book_request_responce1/:br_id',tokens.adminToken,admin.book_request_responce1);
router.get('/book_request_responce2/:br_id',tokens.adminToken,admin.book_request_responce2);



module.exports = router;