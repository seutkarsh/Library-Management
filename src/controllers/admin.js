const db = require('../database');
const mail = require('../mail');
const file = require('../files');
const bcrypt = require("bcryptjs");
const functions = require('../functions');
const template = require('../../public/js/mailTemplates');


let user_id = null;
let book_id = null;

exports.add_member = async (req, res) => {
    try {
        const { firstname, lastname, gurdianname, dob, email, gender, permanentaddress, temperoryaddress, contactno, emergencycontactno } = req.body;
        if (!firstname || !lastname || !gurdianname || !dob || !email || !gender || !permanentaddress || !temperoryaddress || !contactno || !emergencycontactno) {
            return res.status(400).render('Admin/admin-member-add', {
                info: "Fill All the details"
            });
        }
        db.query("Select * from member where email = ? and first_name = ? and last_name = ? and gurdians_name = ?", [email, firstname, lastname, gurdianname], async (error, results) => {
            if (error) {
                console.log(error);
            }
            else {
                if (results.length > 0) {
                    // add alert
                    return res.render('Admin/admin-member-subscription-renew', {
                        warning: 'Member already Exists'
                    });
                }
                else {
                    if (contactno.length != 10 || emergencycontactno.length != 10) {
                        return res.render('Admin/admin-member-add', {
                            warning: 'Provide valid Contact Numbers'
                        });
                    }

                    var password = functions.genPass();
                    let hashedpassword = await bcrypt.hash(password, 10);

                    mail(email, "Your Login Details", template.myLogin(email, password))

                    db.query('insert into member set ?', {
                        first_name: firstname,
                        last_name: lastname,
                        gurdians_name: gurdianname,
                        dob: dob,
                        gender: gender,
                        permanent_address: permanentaddress,
                        local_address: temperoryaddress,
                        contact: contactno,
                        emergency_contact: emergencycontactno,
                        email: email,
                        password: hashedpassword,
                        profile_pic: "image.png"
                    }, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            //Show alert

                            db.query('select member_id from member where email=?',[email],(err,result)=>{
                                if(err)
                                {
                                    console.log(err)
                                }
                                else{
                                    return res.render('Admin/admin-member-subscription-renew', {
                                        success: 'User Registered', id:result[0].member_id
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
    catch (error) {
        console.log(error);
    }
}

exports.updatemember1 = async (req, res) => {

    try {
        const { memberid } = req.body;

        if (!memberid) {
            return res.render('Admin/admin-member-update', {
                info: 'Fill Member ID first'
            });
        }
        else {
            db.query('select * from member where member_id=?', [memberid], async (error, result) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (result.length == 0) {
                        return res.render('Admin/admin-member-update', {
                            warning: 'Invalid Member ID'
                        });
                    }
                    else {
                        user_id = memberid;
                        var male; var female; var other;
                        if (result[0].gender == "male") { male = "checked"; }
                        else if (result[0].gender == "female") { female = "checked"; }
                        else { other = "checked"; }
                        return res.render('Admin/admin-member-update', {
                            success: 'member Found',
                            props: 'visible',
                            firstname: result[0].first_name,
                            lastname: result[0].last_name,
                            gurdianname: result[0].gurdians_name,
                            dob: functions.convertdate(result[0].dob),
                            male: male,
                            female: female,
                            other: other,
                            peradd: result[0].permanent_address,
                            tempadd: result[0].local_address,
                            contact: result[0].contact,
                            emergencycontact: result[0].emergency_contact,
                            email: result[0].email
                        });
                    }

                }
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}

exports.updatemember2 = async (req, res) => {


    try {
        const { firstname, lastname, gurdianname, dob, gender, peradd, tempadd, contactno, emergencycontactno, email } = req.body;

        db.query('Update member set first_name = ? , last_name = ? , gurdians_name = ? , dob = ? , gender = ? , permanent_address = ? , local_address = ? , contact = ? , emergency_contact = ? , email = ? where member_id=?', [firstname, lastname, gurdianname, dob, gender, peradd, tempadd, contactno, emergencycontactno, email, user_id], async (err, result) => {
            if (err) {
                console.log(err);
            }

            if (result.affectedRows == 0) {
                return res.status(400).render('Admin/admin-member-update', {
                    danger: "something went wrong at our end. Details Doesn't Updated. Kindly try after some time.",
                    props: 'grid',
                    firstname: firstname,
                    lastname: lastname,
                    gurdianname: gurdianname,
                    dob: dob,
                    gender: gender,
                    peraddr: peradd,
                    tempadd: tempadd,
                    contact: contactno,
                    emergencycontact: emergencycontactno,
                    email: email
                });
            }
            else {
                user_id = null
                return res.status(200).render('Admin/admin-member-update', {
                    success: 'Detils Updated'
                });
            }
        }
        );

    }
    catch (error) {
        console.log(error);
    }
}

exports.subscription = async (req, res) => {
    try {
        const { memberid, startdate, days } = req.body;

        if (!memberid || !startdate || !days) {
            return res.render('Admin/admin-member-subscription-renew', {
                info: 'Fill all details'
            });
        }
        else {
            db.query('select * from member where member_id=?', [memberid], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length == 0) {
                        return res.render('Admin/admin-member-subscription-renew', {
                            warning: 'Invalid Member ID'
                        });
                    }
                    else {
                        db.query("select * from subscription where sub_member_id=? ", [memberid], (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                if (result.length == 0) {
                                    var price;

                                    if (days == "30") { price = 1000 }
                                    else if (days == "90") { price = 2800 }
                                    else { price = 5500 }

                                    var duration = parseInt(days);

                                    db.query('insert into subscription set ?', {
                                        sub_member_id: memberid,
                                        sub_date: functions.date(),
                                        starting_date: startdate,
                                        ending_date: functions.adddate(startdate, duration),
                                        duration: duration,
                                        amount: price
                                    }, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            db.query('select * from member where member_id=?', [memberid], async (er, re) => {
                                                if (er) {
                                                    console.log(er);
                                                }
                                                else {
                                                    var des;
                                                    if (duration == 30) { des = "Monthly"; }
                                                    else if (duration == 90) { des = "Quarterly"; }
                                                    else { des = "Half_Yearly"; }

                                                    mail(results[0].email, "Your Subscription Invoice", template.bookIssue(
                                                        re[0].first_name + " " + re[0].last_name,
                                                        memberid,
                                                        re[0].contact,
                                                        startdate,
                                                        functions.date(),
                                                        functions.time(),
                                                        functions.adddate(startdate, duration),
                                                        des,
                                                        duration,
                                                        price,
                                                        (0.09 * price),
                                                        (price + (0.09 * price) * 2)
                                                    ));

                                                    return res.render('Admin/admin-member-subscription-renew', {
                                                        success: 'Subscription Updated',
                                                        props: 'block',
                                                        id: memberid,
                                                        name: re[0].first_name + " " + re[0].last_name,
                                                        contact: re[0].contact,
                                                        date: functions.date(),
                                                        time: functions.time(),
                                                        startdate: startdate,
                                                        enddate: functions.adddate(startdate, duration),
                                                        des: des,
                                                        days: duration,
                                                        amount: price,
                                                        gst: (0.09 * price),
                                                        total: (price + (0.09 * price) * 2)
                                                    });
                                                }
                                            });
                                        }
                                    }
                                    );
                                }
                                else {
                                    db.query("select * from subscription where sub_member_id=? and ending_date < ?", [memberid, startdate], (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (result.length == 0) {
                                                return res.render('Admin/admin-member-subscription-renew', {
                                                    danger: 'Previous Subscription didnt ended',
                                                    props: 'none',
                                                });
                                            }
                                            else {
                                                var price;

                                                if (days == "30") { price = 1000 }
                                                else if (days == "90") { price = 2800 }
                                                else { price = 5500 }

                                                var duration = parseInt(days);

                                                db.query('insert into subscription set ?', {
                                                    sub_member_id: memberid,
                                                    sub_date: functions.date(),
                                                    starting_date: startdate,
                                                    ending_date: functions.adddate(startdate, duration),
                                                    duration: duration,
                                                    amount: price
                                                }, (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    else {
                                                        db.query('select * from member where member_id=?', [memberid], async (er, re) => {
                                                            if (er) {
                                                                console.log(er);
                                                            }
                                                            else {
                                                                var des;
                                                                if (duration == 30) { des = "Monthly"; }
                                                                else if (duration == 90) { des = "Quarterly"; }
                                                                else { des = "Half_Yearly"; }

                                                                mail(results[0].email, "Your Subscription Invoice", template.bookIssue(
                                                                    re[0].first_name + " " + re[0].last_name,
                                                                    memberid,
                                                                    re[0].contact,
                                                                    startdate,
                                                                    functions.date(),
                                                                    functions.time(),
                                                                    functions.adddate(startdate, duration),
                                                                    des,
                                                                    duration,
                                                                    price,
                                                                    gst,
                                                                    total
                                                                ));

                                                                return res.render('Admin/admin-member-subscription-renew', {
                                                                    success: 'Subscription Updated',
                                                                    props: 'block',
                                                                    id: memberid,
                                                                    name: re[0].first_name + " " + re[0].last_name,
                                                                    contact: re[0].contact,
                                                                    date: functions.date(),
                                                                    time: functions.time(),
                                                                    startdate: startdate,
                                                                    enddate: functions.adddate(startdate, duration),
                                                                    des: des,
                                                                    days: duration,
                                                                    amount: price,
                                                                    gst: (0.09 * price),
                                                                    total: (price + (0.09 * price) * 2)
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    });

                                }
                            }
                        })
                    }
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

exports.addnewbook = async (req, res) => {
    try {

        file.upload(req, res, (error) => {
            if (error) {
                res.render('Admin/admin-books-add-book', {
                    danger: error
                });
            }
            else {
                const { bookname, author, publisher, edition, language, noofpages, genre, purchasedate, price, seller, description } = req.body;

                const image = req.file;
                const copies = req.body.copies;
                var i;
                for (i = 0; i < copies; i++) {
                    if (!bookname || !author || !publisher || !edition || !language || !noofpages || !genre || !purchasedate || !price || !seller || !image || !description) {
                        return res.render('Admin/admin-books-add-book', {
                            info: 'Please Fill all the details'
                        });
                    }
                    else {
                        db.query('insert into book set ?', {
                            book_name: bookname,
                            author: author,
                            publisher: publisher,
                            edition: edition,
                            language: language,
                            genre: genre,
                            no_of_pages: noofpages,
                            price: price,
                            purchase_date: purchasedate,
                            seller: seller,
                            description: description,
                            cover_pic: image.filename
                        }, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                return res.render('Admin/admin-books-add-book', {
                                    success: 'Book Added Successfully!!!'
                                });
                            }
                        }
                        );
                    }
                }
            }
        });

    }
    catch (error) {
        console.log(error);
    }
}

exports.updatebook1 = async (req, res) => {

    try {
        const { bookid } = req.body;

        if (!bookid) {
            return res.render('Admin/admin-books-update', {
                info: 'Fill Book ID first'
            });
        }
        else {
            db.query('select * from book where book_id=?', [bookid], async (error, result) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (result.length == 0) {
                        return res.render('Admin/admin-books-update', {
                            warning: 'Invalid Book ID'
                        });
                    }
                    else {
                        book_id = bookid;
                        return res.render('Admin/admin-books-update', {
                            success: 'Book Found',
                            props: 'grid',
                            bookname: result[0].book_name,
                            author: result[0].author,
                            publisher: result[0].publisher,
                            edition: result[0].edition,
                            noofpages: result[0].no_of_pages,
                            genre: result[0].genre,
                            language: result[0].language,
                            purchasedate: functions.convertdate(result[0].purchase_date),
                            price: result[0].price,
                            seller: result[0].seller,
                            description: result[0].description,
                        });
                    }
                }
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}

exports.updatebook2 = async (req, res) => {

    try {
        const { bookname, author, publisher, edition, noofpages, genre, language, purchasedate, price, seller, description } = req.body;

        db.query('Update book set book_name = ? , author = ? , publisher = ? , edition = ? , language = ? , genre = ? , no_of_pages = ? , price = ? , purchase_date = ? , seller = ? , description = ?  where book_id=?', [bookname, author, publisher, edition, language, genre, noofpages, price, purchasedate, seller, description, book_id], async (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.affectedRows == 0) {
                return res.status(400).render('Admin/admin-books-update', {
                    danger: 'Something went worng at our end.',
                    props: 'grid',
                    bookname: bookname,
                    author: author,
                    publisher: publisher,
                    edition: edition,
                    noofpages: noofpages,
                    genre: genre,
                    language: language,
                    purchasedate: purchasedate,
                    price: price,
                    seller: seller,
                    description: description
                });
            }
            else {
                book_id = null;
                return res.status(200).render('Admin/admin-books-update', {
                    success: 'Detils Updated'
                });
            }
        }
        );

    }
    catch (error) {
        console.log(error);
    }
}

exports.bookissue = async (req, res) => {

    try {
        const { memberid, bookid } = req.body;

        if (!memberid || !bookid) {
            return res.render('Admin/admin-books-issue', {
                info: 'Fill all the details'
            });
        }

        db.query('select * from member , book where member.member_id = ? AND book.book_id = ?', [memberid, bookid], async (error, results) => {

            if (error) {
                console.log(error);
            }

            else if (results.length == 0) {
                return res.render('Admin/admin-books-issue', {
                    warning: "Either Member Or Book Doesn't exists!!!"
                })
            }
            else {
                db.query("select * from issue_return where ir_book_id=? and receiving_date =? ", [bookid, "0000-00-00"], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (result.length > 0) {
                            return res.render('Admin/admin-books-issue', {
                                danger: "Book Already Issued!!!"
                            })
                        }
                        else {
                            db.query('insert into issue_return set ?', {
                                ir_book_id: bookid,
                                ir_member_id: memberid,
                                issue_date: functions.date(),
                                return_date: functions.adddate(functions.date(), 15),
                                fine: 0.0
                            }, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    mail(results[0].email, "Book Issue Receipt ", template.bookIssue(
                                        results[0].first_name + " " + results[0].last_name,
                                        memberid,
                                        results[0].contact,
                                        functions.date(),
                                        functions.time(),
                                        bookid,
                                        results[0].book_name,
                                        results[0].author,
                                        results[0].genre,
                                        results[0].language,
                                        results[0].edition
                                    ));

                                    return res.render('Admin/admin-books-issue', {
                                        success: "Details Matched",
                                        props: "grid",
                                        memberid: memberid,
                                        name: results[0].first_name + " " + results[0].last_name,
                                        gurdianname: results[0].gurdians_name,
                                        contact: results[0].contact,
                                        date: functions.date(),
                                        time: functions.time(),
                                        bookid: bookid,
                                        bookname: results[0].book_name,
                                        author: results[0].author,
                                        genre: results[0].genre,
                                        language: results[0].language,
                                        edition: results[0].edition
                                    });
                                }
                            }
                            );
                        }

                    }
                })
            }

        });

    }
    catch (error) {
        console.log(error);
    }

}

exports.bookreturn1 = async (req, res) => {
    try {
        db.query('select issue_return.*,book_name,first_name,last_name from issue_return,book,member where issue_return.receiving_date= ? and issue_return.ir_book_id=book.book_id and issue_return.ir_member_id=member.member_id', ["0000-00-00"], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                var a;
                var fine = 0;

                for (a = 0; a < result.length; a++) {
                    if (functions.convertdate(result[a].return_date) < functions.date()) {
                        var days = functions.difdate(functions.date(), functions.convertdate(result[a].return_date));
                        fine = (days * 10);
                        console.log(fine)
                    }
                    result[a].issue_date = new Date(result[a].issue_date).toLocaleDateString();
                    result[a].return_date = new Date(result[a].return_date).toLocaleDateString();
                    result[a].fine = fine;
                }
                res.render('Admin/admin-books-return', {
                    data: result
                });
            }
        })
    }
    catch (error) {
        console.log(error);
    }

}

exports.bookreturn = async (req, res) => {
    try {
        const irid = req.params.ir_id;
        db.query('select * from issue_return where ir_id=?', [irid], (err, resultss) => {
            if (err) {
                console.log(err);
            }
            else {
                var fine = 0;
                if (functions.convertdate(resultss[0].return_date) < functions.date()) {
                    var days = functions.difdate(functions.date(), functions.convertdate(resultss[0].return_date));
                    fine = (days * 10);
                }
                db.query('Update issue_return set fine=?, receiving_date=? where ir_id=?', [fine, functions.date(), irid], (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.render('Admin/admin-books-return', (err) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                db.query('select issue_return.*,book_name,first_name,last_name from issue_return,book,member where issue_return.receiving_date= ? and issue_return.ir_book_id=book.book_id and issue_return.ir_member_id=member.member_id', ["0000-00-00"], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        var a;
                                        var fine = 0;

                                        for (a = 0; a < result.length; a++) {
                                            if (functions.convertdate(result[a].return_date) < functions.date()) {
                                                var days = functions.difdate(functions.date(), functions.convertdate(result[a].return_date));
                                                fine = (days * 10);
                                            }
                                            result[a].issue_date = new Date(result[a].issue_date).toLocaleDateString();
                                            result[a].return_date = new Date(result[a].return_date).toLocaleDateString();
                                            result[a].fine = fine;
                                        }
                                        res.render('Admin/admin-books-return', {
                                            data: result
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

exports.view_members = async (req, res) => {
    try {
        db.query('select * from member', (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                var a;
                for (a = 0; a < result.length; a++) {
                    result[a].dob = new Date(result[a].dob).toLocaleDateString();
                }
                return res.render('Admin/admin-member-view-list', { data: result });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

exports.book_request = async (req, res) => {
    try {

        db.query('select * from book_request,member where book_request.br_member_id=member.member_id and response_by_admin=?', ["Pending"], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.render('Admin/admin-books-bookrequests', { data: result });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

exports.dashboard = async (req, res) => {
    try {
        db.query('SELECT *, COUNT(*) as copies FROM book GROUP BY book_name,author,publisher,edition,language,seller ORDER BY book_id DESC limit 10', (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                db.query('SELECT * FROM member ORDER BY member_id DESC LIMIT 10;', (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        db.query('SELECT * FROM member ;', (err, member) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                db.query('SELECT * FROM book;', (err, book) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
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
    catch (error) {
        console.log(error);
    }
}

exports.subs_view = async (req, res) => {
    try {
        db.query('select * from subscription,member where subscription.sub_member_id = member.member_id ORDER BY sub_id DESC', (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                var a;
                for (a = 0; a < results.length; a++) {
                    if (results[a].ending_date < functions.date()) {
                        results[a].color = "red";
                        results[a].status = "inactive";
                    }
                    else {
                        results[a].color = "green";
                        results[a].status = "active";
                    }
                    results[a].sub_date = new Date(results[a].sub_date).toLocaleDateString();
                    results[a].starting_date = new Date(results[a].starting_date).toLocaleDateString();
                    results[a].ending_date = new Date(results[a].ending_date).toLocaleDateString();
                }

                res.render('Admin/admin-member-subscription-view', {
                    data: results
                });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

exports.books_view = async (req, res) => {
    try {
        db.query('SELECT *, COUNT(*) as copies FROM book GROUP BY book_name,author,publisher,edition,language,seller', (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render('Admin/admin-books-view-list', {
                    data: results
                });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

exports.mark_attendance = async (req, res) => {
    try {
        db.query("select * from member where member_id NOT IN (select member_id from attendance where date = ? and out_time= ? ) ", [functions.date(), "00:00:00"], (err, result2) => {
            if (err) {
                console.log(err);
            }
            else {
                db.query('select * from attendance,member where member.member_id=attendance.member_id and date=? and out_time=?', [functions.date(), "00:00:00"], (err, result1) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        
                        res.render('Admin/admin-attendance-mark', {
                            data1: result1,
                            data2: result2
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

exports.view_attendance = async (req, res) => {
    try {
        db.query('select * from attendance,member where member.member_id=attendance.member_id', (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                for (a = 0; a < result.length; a++) {
                    result[a].date = new Date(result[a].date).toLocaleDateString();
                }
                res.render('Admin/admin-attendance-view', {
                    data: result
                });
            }
        })

    }
    catch (error) {
        console.log(error);
    }
}

exports.in_time = async (req, res) => {
    try {
        const memberid = req.params.member_id;
        db.query('insert into attendance set ?',
            {
                member_id: memberid,
                date: functions.date(),
                in_time: functions.time()
            }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.affectedRows != 0) {
                        res.render('Admin/admin-attendance-mark', (err) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                db.query("select * from member where member_id NOT IN (select member_id from attendance where date = ? and out_time= ? ) ", [functions.date(), "00:00:00"], (err, result2) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        db.query('select * from attendance,member where member.member_id=attendance.member_id and date=? and out_time=?', [functions.date(), "00:00:00"], (err, result1) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                res.render('Admin/admin-attendance-mark', {
                                                    data1: result1,
                                                    data2: result2
                                                });
                                            }
                                        })
                                    }
                                })
                            }

                        })
                    }
                }
            })
    }
    catch (error) {
        console.log(error);
    }
}

exports.out_time = async (req, res) => {
    try {
        const memberid = req.params.member_id;
        db.query('Update attendance set out_time=? where member_id =? and date= ? and out_time=?', [functions.time(), memberid, functions.date(), "00:00:00"], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.affectedRows != 0) {
                    res.render('Admin/admin-attendance-mark', (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            db.query("select * from member where member_id NOT IN (select member_id from attendance where date = ? and out_time= ? ) ", [functions.date(), "00:00:00"], (err, result2) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    db.query('select * from attendance,member where member.member_id=attendance.member_id and date=? and out_time=?', [functions.date(), "00:00:00"], (err, result1) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {

                                            res.render('Admin/admin-attendance-mark', {
                                                data1: result1,
                                                data2: result2
                                            });
                                        }
                                    })
                                }
                            })
                        }

                    })
                }
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

exports.book_request_responce1 = async (req, res) => {
    try {
        const brid = req.params.br_id;
        db.query('update book_request set response_by_admin=? where br_id= ?', ["Accepted", brid], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render('Admin/admin-books-bookrequests', (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        db.query('select * from book_request,member where book_request.br_member_id=member.member_id and response_by_admin=?', ["Pending"], (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                return res.render('Admin/admin-books-bookrequests', { data: result });
                            }
                        })
                    }
                })
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

exports.book_request_responce2 = async (req, res) => {
    try {
        const brid = req.params.br_id;
        db.query('update book_request set response_by_admin=? where br_id= ?', ["Declined", brid], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render('Admin/admin-books-bookrequests', (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        db.query('select * from book_request,member where book_request.br_member_id=member.member_id and response_by_admin=?', ["Pending"], (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                return res.render('Admin/admin-books-bookrequests', { data: result });
                            }
                        })
                    }
                })
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}