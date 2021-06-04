const convertdate = function convertdate(x) {
    var date = new Date(x).toLocaleDateString();
    var newdate = date.split("/")
    if (newdate[1] < 10) {
        newdate[1] = '0' + newdate[1];
    }
    if (newdate[0] < 10) {
        newdate[0] = '0' + newdate[0];
    }
    var dat = newdate[2] + "-" + newdate[1] + "-" + newdate[0]
    return dat
}

const date = function date() {
    var today = new Date();
    var date;

    if (today.getMonth() < 10) {

        if (today.getDate() <10)
        {
            date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
        }
        else{
            date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
    }
        }
    else{
        if (today.getDate() <10)
        {
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate();
        }
        else{
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    }
    }
        
    return date;
}

const time = function time() {
    var today = new Date();
    var date = today.getHours() + ':' + (today.getMinutes()) + ':' + today.getSeconds();
    return date;
}

const adddate = function adddate(date, day) {
    var d = new Date(date);
    d.setDate(d.getDate() + day);
    var date;

    if(d.getMonth()<10)
    {
        if(d.getDate() <10){
            date = d.getFullYear() + '-0' + (d.getMonth() + 1) + '-0' + d.getDate();
        }
        else{
            date = d.getFullYear() + '-0' + (d.getMonth() + 1) + '-' + d.getDate();
        }
    }
    else
    {
        if(d.getDate() <10){
            date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-0' + d.getDate();
        }
        else{
            date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        } 
    }
    return date;
}

const difdate = function difdate(date1, date2) {
    var d1 = new Date(date1);
    var d2 = new Date(date2);
    var diff = (d1 - d2) / (1000 * 3600 * 24);
    return diff;
}

const genPass = function genPass() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }

    return pass;
}

const otpcode = function otpcode() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

exports.date = date;
exports.time = time;
exports.adddate = adddate;
exports.difdate = difdate;
exports.genPass = genPass;
exports.otpcode = otpcode;
exports.convertdate = convertdate;