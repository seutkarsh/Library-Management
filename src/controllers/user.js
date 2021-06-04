const db = require('../database');
const mail = require('../mail');
const file = require('../files');
const bcrypt = require("bcryptjs");
const functions = require('../functions');


exports.book_request = async (req, res) => {
    try {
        const user_id=req.user.user_id;
        const { bookname, bookauthor, bookpublisher, bookedition, booklanguage, bookdescription } = req.body;

        if (!bookname || !bookauthor || !bookpublisher || !bookedition || !booklanguage || !bookdescription) {
            return res.status(400).render('User/user-bookrequests', {
                info: 'Please fill all the details'
            });
        }
        else {
            db.query('insert into book_request set ?', {
                br_member_id: user_id,
                name: bookname,
                author: bookauthor,
                publisher: bookpublisher,
                language: booklanguage,
                date: functions.date(),
                edition: bookedition,
                description: bookdescription,
                response_by_admin: "Pending"
            }, (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(results);
                    if (results.length == 0) {
                        return res.status(400).render('User/user-bookrequests', {
                            danger: "Something went wrong at our end.Request doesn't get generated. Kindly try after some time."
                        });
                    }
                    else {
                        return res.render('User/user-bookrequests', {
                            success: 'Request Send :)'
                        });
                    }

                }
            }
            );

        }

    }
    catch (error) {
        console.log(error);

    }
}

exports.update_password = async (req, res) => {
    try {
        const user_id=req.user.user_id;
        const { currentpassword, newpassword, confirmnewpassword } = req.body;

        if (!currentpassword || !newpassword || !confirmnewpassword) {
            return res.status(400).render('User/user-profile', {
                info: 'Please fill all the details'
            }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            return res.render('User/user-profile', {
                                name: results[0].first_name + " " + results[0].last_name,
                                gurdianname: results[0].gurdians_name,
                                email: results[0].email,
                                gender: results[0].gender,
                                dob: functions.convertdate(results[0].dob),
                                contact: results[0].contact,
                                emergencycontact: results[0].emergency_contact,
                                peradd: results[0].permanent_address,
                                tempadd: results[0].local_address,
                                image: `/uploads/${results[0].profile_pic}`
                            });
                        }
                    })
                }
            }
            );
        }
        else {
            db.query('select * from member where member_id = ?', [user_id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    bcrypt.compare(currentpassword, result[0].password, async (err, re) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (!re) {
                                return res.status(401).render('User/user-profile', {
                                danger: "Current Password is wrong"
                                }, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                                            if (error) {
                                                console.log(error);
                                            }
                                            else {
                                                return res.render('User/user-profile', {
                                                    name: results[0].first_name + " " + results[0].last_name,
                                                    gurdianname: results[0].gurdians_name,
                                                    email: results[0].email,
                                                    gender: results[0].gender,
                                                    dob: functions.convertdate(results[0].dob),
                                                    contact: results[0].contact,
                                                    emergencycontact: results[0].emergency_contact,
                                                    peradd: results[0].permanent_address,
                                                    tempadd: results[0].local_address,
                                                    image: `/uploads/${results[0].profile_pic}`
                                                });
                                            }
                                        })
                                    }
                                }
                                );
                            }
                            else {
                                if (newpassword != confirmnewpassword) {
                                    return res.status(400).render('User/user-profile', {
                                        warning: "Password doesn't Match"
                                    }, (err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    return res.render('User/user-profile', {
                                                        name: results[0].first_name + " " + results[0].last_name,
                                                        gurdianname: results[0].gurdians_name,
                                                        email: results[0].email,
                                                        gender: results[0].gender,
                                                        dob: functions.convertdate(results[0].dob),
                                                        contact: results[0].contact,
                                                        emergencycontact: results[0].emergency_contact,
                                                        peradd: results[0].permanent_address,
                                                        tempadd: results[0].local_address,
                                                        image: `/uploads/${results[0].profile_pic}`
                                                    });
                                                }
                                            })
                                        }
                                    }
                                    );
                                }
                                else {
                                    let hashedpassword = await bcrypt.hash(newpassword, 10);
                                    db.query('Update member set password = ? where member_id=?', [hashedpassword, user_id], (error, results) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            if (results.affectedRows == 0) {
                                                return res.status(400).render('User/user-profile', {
                                                    danger: "Something went wrong at our end. Password Doesn't Updated. Kindly try after some time."
                                                }, (err) => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    else {
                                                        db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                                                            if (error) {
                                                                console.log(error);
                                                            }
                                                            else {
                                                                return res.render('User/user-profile', {
                                                                    name: results[0].first_name + " " + results[0].last_name,
                                                                    gurdianname: results[0].gurdians_name,
                                                                    email: results[0].email,
                                                                    gender: results[0].gender,
                                                                    dob: functions.convertdate(results[0].dob),
                                                                    contact: results[0].contact,
                                                                    emergencycontact: results[0].emergency_contact,
                                                                    peradd: results[0].permanent_address,
                                                                    tempadd: results[0].local_address,
                                                                    image: `/uploads/${results[0].profile_pic}`
                                                                });
                                                            }
                                                        })
                                                    }
                                                }
                                                );
                                            }
                                            else {
                                                mail(result[0].email, "Password Update", "Your Password Has been Updated Successfully")
                                                return res.status(200).render('User/user-profile', {
                                                    success: 'Password Updated'
                                                }, (err) => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    else {
                                                        db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                                                            if (error) {
                                                                console.log(error);
                                                            }
                                                            else {
                                                                return res.render('User/user-profile', {
                                                                    name: results[0].first_name + " " + results[0].last_name,
                                                                    gurdianname: results[0].gurdians_name,
                                                                    email: results[0].email,
                                                                    gender: results[0].gender,
                                                                    dob: functions.convertdate(results[0].dob),
                                                                    contact: results[0].contact,
                                                                    emergencycontact: results[0].emergency_contact,
                                                                    peradd: results[0].permanent_address,
                                                                    tempadd: results[0].local_address,
                                                                    image: `/uploads/${results[0].profile_pic}`
                                                                });
                                                            }
                                                        })
                                                    }
                                                }
                                                );
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });
        }
    }
    catch (error) {
        console.log(error)
    }
}

exports.change_image = async (req, res) => {
    try {
        const user_id=req.user.user_id;
        file.upload(req, res, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                const image = req.file;

                if (!image) {
                    return res.status(400).render('User/user-profile', {
                        info: 'Please select an Image',
                        props: 'block'
                    }, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    return res.render('User/user-profile', {
                                        name: results[0].first_name + " " + results[0].last_name,
                                        gurdianname: results[0].gurdians_name,
                                        email: results[0].email,
                                        gender: results[0].gender,
                                        dob: functions.convertdate(results[0].dob),
                                        contact: results[0].contact,
                                        emergencycontact: results[0].emergency_contact,
                                        peradd: results[0].permanent_address,
                                        tempadd: results[0].local_address,
                                        image: `/uploads/${results[0].profile_pic}`
                                    });
                                }
                            })
                        }
                    }
                    );
                }
                else {
                    db.query('Update member set profile_pic = ? where member_id=?', [image.filename, user_id], (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            if (results.affectedRows == 0) {
                                return res.status(400).render('User/user-profile', {
                                    danger: "Something went at our end. Image Doesn't Updated. Kindly try after some time.",
                                    props: 'block'
                                }, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                                            if (error) {
                                                console.log(error);
                                            }
                                            else {
                                                return res.render('User/user-profile', {
                                                    name: results[0].first_name + " " + results[0].last_name,
                                                    gurdianname: results[0].gurdians_name,
                                                    email: results[0].email,
                                                    gender: results[0].gender,
                                                    dob: functions.convertdate(results[0].dob),
                                                    contact: results[0].contact,
                                                    emergencycontact: results[0].emergency_contact,
                                                    peradd: results[0].permanent_address,
                                                    tempadd: results[0].local_address,
                                                    image: `/uploads/${results[0].profile_pic}`
                                                });
                                            }
                                        })
                                    }
                                }
                                );
                            }
                            else {
                                return res.status(200).render('User/user-profile', (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                                            if (error) {
                                                console.log(error);
                                            }
                                            else {
                                                return res.render('User/user-profile', {
                                                    name: results[0].first_name + " " + results[0].last_name,
                                                    gurdianname: results[0].gurdians_name,
                                                    email: results[0].email,
                                                    gender: results[0].gender,
                                                    dob: functions.convertdate(results[0].dob),
                                                    contact: results[0].contact,
                                                    emergencycontact: results[0].emergency_contact,
                                                    peradd: results[0].permanent_address,
                                                    tempadd: results[0].local_address,
                                                    image: `/uploads/${results[0].profile_pic}`
                                                });
                                            }
                                        })
                                    }
                                });
                            }
                        }
                    });
                }

            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

exports.remove_image = async (req, res) => {
    try {
        const user_id=req.user.user_id;
        db.query('Update member set profile_pic = ? where member_id=?', ["image.png", user_id], (error, results) => {
            if (error) {
                console.log(error);
            }
            else {
                if (results.affectedRows == 0) {
                    return res.status(400).render('User/user-profile', (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    return res.render('User/user-profile', {
                                        name: results[0].first_name + " " + results[0].last_name,
                                        gurdianname: results[0].gurdians_name,
                                        email: results[0].email,
                                        gender: results[0].gender,
                                        dob: functions.convertdate(results[0].dob),
                                        contact: results[0].contact,
                                        emergencycontact: results[0].emergency_contact,
                                        peradd: results[0].permanent_address,
                                        tempadd: results[0].local_address,
                                        image: `/uploads/${results[0].profile_pic}`
                                    });
                                }
                            })
                        }
                    });
                }
                else {
                    return res.status(200).render('User/user-profile', (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    return res.render('User/user-profile', {
                                        name: results[0].first_name + " " + results[0].last_name,
                                        gurdianname: results[0].gurdians_name,
                                        email: results[0].email,
                                        gender: results[0].gender,
                                        dob: functions.convertdate(results[0].dob),
                                        contact: results[0].contact,
                                        emergencycontact: results[0].emergency_contact,
                                        peradd: results[0].permanent_address,
                                        tempadd: results[0].local_address,
                                        image: `/uploads/${results[0].profile_pic}`
                                    });
                                }
                            })
                        }
                    });
                }
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

exports.profile = async (req, res) => {
    try {
        const user_id=req.user.user_id;
        db.query('select * from member where member_id= ? ', [user_id], (error, results) => {
            if (error) {
                console.log(error);
            }
            else {
                return res.render('User/user-profile', {
                    name: results[0].first_name + " " + results[0].last_name,
                    gurdianname: results[0].gurdians_name,
                    email: results[0].email,
                    gender: results[0].gender,
                    dob: functions.convertdate(results[0].dob),
                    contact: results[0].contact,
                    emergencycontact: results[0].emergency_contact,
                    peradd: results[0].permanent_address,
                    tempadd: results[0].local_address,
                    image: `/uploads/${results[0].profile_pic}`
                });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

exports.dashboard = async (req, res) => {
    try {
        const user_id=req.user.user_id;
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
    catch (error) {
        console.log(error);
    }
}

exports.books_under_me = async (req, res) => {
    try {
        const user_id=req.user.user_id;
        db.query('select * from book,issue_return where issue_return.ir_member_id= ? and book.book_id = issue_return.ir_book_id and receiving_date= ?', [user_id, "0000-00-00"], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                var a;
                for (a = 0; a < result.length; a++) {
                    var fine;
                    if (result[a].return_date < functions.date()) {
                        var days = functions.difdate(functions.date(), functions.convertdate(result[0].return_date));
                        fine[0] = days * 10;
                        result[a].fine = fine;
                    }
                    result[a].return_date=new Date(result[a].return_date).toLocaleDateString();

                }
                return res.status(200).render('User/user-books-under-me', { data: result });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}


exports.books_available = async (req, res) => {
    try {
        db.query('SELECT *, COUNT(*) as copies FROM book GROUP BY book_name,author,publisher,edition,language,seller', (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render('User/user-books-available', {
                    data: results
                });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}
