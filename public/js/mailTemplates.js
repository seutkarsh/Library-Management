


exports.myLogin= (email,password)=>{
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      
      
<style>
  
          @import url("/public/css/fonts.css");
          :root{
      --main-color:  linear-gradient(to bottom, #324c62, #283e52, #1e3142, #152533, #0c1925);;
      --color-dark: #1d2231;
      --text-grey:#8390a2;
      --bgcolor:#f1f5f9;
  }
  
  *{
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      list-style-type: none;
      text-decoration: none;
  }
  
  
  /* book issue notification */
  
  .email-book-issue{
      display: flex;
      background:var(--bgcolor);
      width: 60%;
      margin: 7rem auto;
      padding: 5rem 5rem;
      border-radius: 25px;
      box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.4);;
  
  
  
  }
  
  .email-book-issue-grid{
      display: grid;
      grid-gap: 3rem;
      margin: 0 auto;
  }
  
  .header{
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
  }
  
  .header img{
      height: 70px;
      vertical-align: top;
  
  }
  
  .header span {
      font-family: 'Yanone Kaffeesatz';
      font-size: 4rem;
      margin-left: 2rem;
      
      color:#283e52;
  
  }
  
  .content-header{
      display: flex;
      flex-direction: column;
      justify-content: center;
  }
  
  .content-header div:first-child{
      font-family: 'Baloo Bhai 2';
      text-align: center;
      font-size: 1.2rem;
  
  }
  
  .content-header div:last-child{
      font-family: 'alaska';
      letter-spacing: 1px;
      font-size: 1.5rem;
      text-align: center;
      width: 60%;
      margin: 0 auto
  }
  
  .cover-img{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
  }
  
  .cover-img{
      width: 50%;
  }
  
  .content-body{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  /* invoice */
  .invoice-grid{
      display: grid;
      grid-template-columns: repeat(2,1fr);
      grid-row: auto;
      grid-gap:2rem;
      padding: 1.5rem;
  }
  
  #invoice-header-left{
      grid-column-start: 1 ;
      grid-column-end: 2 ;
  }
  #invoice-header-right{
      grid-column-start: 2 ;
      grid-column-end: 3;
  }
  
  #invoice-bill{
      grid-column-start: 1 ;
      grid-column-end: 3;
  }
  
  #invoice-bill table,
  #invoice-bill table span{
      text-align: center;
  }
  
  
  .card{
      background: #fff;
      border-radius: 5px;
      box-shadow: 5px 5px 10px rgba(128, 128,128, 0.4);
      width: 60%;
      margin: 0 auto;
      margin-bottom: 2rem;
  }
  
  
  
  .card-header,
  .card-body{
      padding: 1rem;
  }
  
  .card-header{
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #f0f0f0;
  }
  
  .card-header button{
      background: var(--main-color);
      color: #fff;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border:1px solid var(--main-color);
  }
  
  .card-header div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--main-color);
      color: #fff;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border:1px solid var(--main-color);
  
  }
  
  .card-header div span:first-child{
      font-size: 2rem;
      margin-right: 1rem;
  }
  
  .card-header div span:last-child{
      font-size: 1.2rem;
  }
  
  
  .help{
      display:flex ;
      justify-content: center;
      margin: 1rem auto;
      width: 50%;
      font-family: 'Poppins';
  }
  
  .help img{
  margin: 1rem;
  }
  
  .following{
      font-family: 'Fredericka the Great';
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  .following img{
      height: 50px;
      margin: 1rem 1rem;
  }
  
  .footer{
      font-family: "bebas neue";
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 1px;
  }
  
  .otp{
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 2rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      padding: 1rem 4rem;
      border-radius: 50px;
      border: 1px solid #1d2231;
      background: peachpuff;
  }
      </style>
  </head>
  
  <body>
  
      <div class="email-book-issue">
          <div class="email-book-issue-grid">
              <div class="header">
                  <img src="/public/Images/logo-png.png">
                  <span>Boeken BookHouse</span>
              </div>
              <div class="content-header">
                  <div>
                      <h1>Welcome!!!</h1>
                  </div>
                  <div>
                      <p>Thanks for choosing us. Your login credentials are given below.This password is auto-generated. We strongly suggest you to change your password once you are logged in for the first time. Enjoy!!!</p>
                  </div>
  
              </div>
  
             
  
              <div class="content-body">
                  <div class="otp">
                      
                      <span>Email: ${email}</span>
                  </div>
                  <div class="otp">
                      <span>Password: ${password}</span>
                  </div>
                  <div class="cover-img">
                      <img src="https://drive.google.com/file/d/1ksVv-91SGE49GMdUrFHs3SMSLYOKQLlE/view?usp=sharing" alt="Welcome Image">
                  </div>
                  <div class="help">
                      <img src="https://img.icons8.com/fluent/48/000000/composing-mail.png" alt="">
                      <div>
                          <h3>Any Questions?</h3>
                          <p>If you need any help whatsoever or just want to chat,email us anytime <strong>bookhouseboeken@gmail.com</strong></p>
                      </div>
                  </div>
                  <div class="following">
                      <div>
                          <h3>Following Us</h3>
                      </div>
                      <div>
                          <a href=""><img src="https://img.icons8.com/fluent/96/000000/facebook-new.png" alt=""></a>
                          <a href=""><img src="https://img.icons8.com/color/96/000000/instagram-new--v2.png" alt=""></a>
                          <a href=""><img src="https://img.icons8.com/color/96/000000/twitter--v2.png" alt=""></a>
                      </div>
  
                  </div>
              </div>
              <div class="footer">
                  <h5>Copyrigth &copy; 2021 Boeken BookHouse, All rights reserved.</h5>
                  <h5>You are receiving this email because you are a registered member of Boeken BookHouse</h5>
              </div>
          </div>
      </div>
  
  </body>
  
  </html>` 
}

exports.otpcode = (otp)=>{
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
  
          @import url("/public/css/fonts.css");
          :root{
      --main-color:  linear-gradient(to bottom, #324c62, #283e52, #1e3142, #152533, #0c1925);;
      --color-dark: #1d2231;
      --text-grey:#8390a2;
      --bgcolor:#f1f5f9;
  }
  
  *{
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      list-style-type: none;
      text-decoration: none;
  }
  
  
  /* book issue notification */
  
  .email-book-issue{
      display: flex;
      background:var(--bgcolor);
      width: 60%;
      margin: 7rem auto;
      padding: 5rem 5rem;
      border-radius: 25px;
      box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.4);;
  
  
  
  }
  
  .email-book-issue-grid{
      display: grid;
      grid-gap: 3rem;
      margin: 0 auto;
  }
  
  .header{
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
  }
  
  .header img{
      height: 70px;
      vertical-align: top;
  
  }
  
  .header span {
      font-family: 'Yanone Kaffeesatz';
      font-size: 4rem;
      margin-left: 2rem;
      
      color:#283e52;
  
  }
  
  .content-header{
      display: flex;
      flex-direction: column;
      justify-content: center;
  }
  
  .content-header div:first-child{
      font-family: 'Baloo Bhai 2';
      text-align: center;
      font-size: 1.2rem;
  
  }
  
  .content-header div:last-child{
      font-family: 'alaska';
      letter-spacing: 1px;
      font-size: 1.5rem;
      text-align: center;
      width: 60%;
      margin: 0 auto
  }
  
  .cover-img{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
  }
  
  .cover-img{
      width: 50%;
  }
  
  .content-body{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  /* invoice */
  .invoice-grid{
      display: grid;
      grid-template-columns: repeat(2,1fr);
      grid-row: auto;
      grid-gap:2rem;
      padding: 1.5rem;
  }
  
  #invoice-header-left{
      grid-column-start: 1 ;
      grid-column-end: 2 ;
  }
  #invoice-header-right{
      grid-column-start: 2 ;
      grid-column-end: 3;
  }
  
  #invoice-bill{
      grid-column-start: 1 ;
      grid-column-end: 3;
  }
  
  #invoice-bill table,
  #invoice-bill table span{
      text-align: center;
  }
  
  
  .card{
      background: #fff;
      border-radius: 5px;
      box-shadow: 5px 5px 10px rgba(128, 128,128, 0.4);
      width: 60%;
      margin: 0 auto;
      margin-bottom: 2rem;
  }
  
  
  
  .card-header,
  .card-body{
      padding: 1rem;
  }
  
  .card-header{
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #f0f0f0;
  }
  
  .card-header button{
      background: var(--main-color);
      color: #fff;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border:1px solid var(--main-color);
  }
  
  .card-header div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--main-color);
      color: #fff;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border:1px solid var(--main-color);
  
  }
  
  .card-header div span:first-child{
      font-size: 2rem;
      margin-right: 1rem;
  }
  
  .card-header div span:last-child{
      font-size: 1.2rem;
  }
  
  
  .help{
      display:flex ;
      justify-content: center;
      margin: 1rem auto;
      width: 50%;
      font-family: 'Poppins';
  }
  
  .help img{
  margin: 1rem;
  }
  
  .following{
      font-family: 'Fredericka the Great';
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  .following img{
      height: 50px;
      margin: 1rem 1rem;
  }
  
  .footer{
      font-family: "bebas neue";
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 1px;
  }
  
  .otp{
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 2rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      padding: 1rem 4rem;
      border-radius: 50px;
      border: 1px solid #1d2231;
      background: peachpuff;
  }
      </style>
  </head>
  
  <body>
  
      <div class="email-book-issue">
          <div class="email-book-issue-grid">
              <div class="header">
                  <img src="/public/Images/logo-png.png">
                  <span>Boeken BookHouse</span>
              </div>
              <div class="content-header">
                  <div>
                      <h1>OTP</h1>
                  </div>
                  <div>
                      <p>A password change attemp has been made refering to your email.Use this unique OTP for verification. If it wasn't you, secure your account or contact librarian for the same.</p>
                  </div>
  
              </div>
  
             
  
              <div class="content-body">
                  <div class="otp">
                      <span>${otp}</span>
                  </div>
                  <div class="cover-img">
                      <img src="https://drive.google.com/file/d/1LOM3APJjSX7xwJyVWcR4B8Dgf8wgeaIF/view?usp=sharing" alt="OTP Image">
                  </div>
                  <div class="help">
                      <img src="https://img.icons8.com/fluent/48/000000/composing-mail.png" alt="">
                      <div>
                          <h3>Any Questions?</h3>
                          <p>If you need any help whatsoever or just want to chat,email us anytime <strong>bookhouseboeken@gmail.com</strong></p>
                      </div>
                  </div>
                  <div class="following">
                      <div>
                          <h3>Following Us</h3>
                      </div>
                      <div>
                          <a href=""><img src="https://img.icons8.com/fluent/96/000000/facebook-new.png" alt=""></a>
                          <a href=""><img src="https://img.icons8.com/color/96/000000/instagram-new--v2.png" alt=""></a>
                          <a href=""><img src="https://img.icons8.com/color/96/000000/twitter--v2.png" alt=""></a>
                      </div>
  
                  </div>
              </div>
              <div class="footer">
                  <h5>Copyrigth &copy; 2021 Boeken BookHouse, All rights reserved.</h5>
                  <h5>You are receiving this email because you are a registered member of Boeken BookHouse</h5>
              </div>
          </div>
      </div>
  
  </body>
  
  </html>`
}

exports.subscription = (name,id,contact,startdate,date,time,enddate,des,days,amount,gst,total)=>{
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  
      <style>
  
          @import url("/public/css/fonts.css");
          :root{
      --main-color:  linear-gradient(to bottom, #324c62, #283e52, #1e3142, #152533, #0c1925);;
      --color-dark: #1d2231;
      --text-grey:#8390a2;
      --bgcolor:#f1f5f9;
  }
  
  *{
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      list-style-type: none;
      text-decoration: none;
  }
  
  
  /* book issue notification */
  
  .email-book-issue{
      display: flex;
      background:var(--bgcolor);
      width: 60%;
      margin: 7rem auto;
      padding: 5rem 5rem;
      border-radius: 25px;
      box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.4);;
  
  
  
  }
  
  .email-book-issue-grid{
      display: grid;
      grid-gap: 3rem;
      margin: 0 auto;
  }
  
  .header{
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
  }
  
  .header img{
      height: 70px;
      vertical-align: top;
  
  }
  
  .header span {
      font-family: 'Yanone Kaffeesatz';
      font-size: 4rem;
      margin-left: 2rem;
      
      color:#283e52;
  
  }
  
  .content-header{
      display: flex;
      flex-direction: column;
      justify-content: center;
  }
  
  .content-header div:first-child{
      font-family: 'Baloo Bhai 2';
      text-align: center;
      font-size: 1.2rem;
  
  }
  
  .content-header div:last-child{
      font-family: 'alaska';
      letter-spacing: 1px;
      font-size: 1.5rem;
      text-align: center;
      width: 60%;
      margin: 0 auto
  }
  
  .cover-img{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
  }
  
  .cover-img{
      width: 50%;
  }
  
  .content-body{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  /* invoice */
  .invoice-grid{
      display: grid;
      grid-template-columns: repeat(2,1fr);
      grid-row: auto;
      grid-gap:2rem;
      padding: 1.5rem;
  }
  
  #invoice-header-left{
      grid-column-start: 1 ;
      grid-column-end: 2 ;
  }
  #invoice-header-right{
      grid-column-start: 2 ;
      grid-column-end: 3;
  }
  
  #invoice-bill{
      grid-column-start: 1 ;
      grid-column-end: 3;
  }
  
  #invoice-bill table,
  #invoice-bill table span{
      text-align: center;
  }
  
  
  .card{
      background: #fff;
      border-radius: 5px;
      box-shadow: 5px 5px 10px rgba(128, 128,128, 0.4);
      width: 60%;
      margin: 0 auto;
      margin-bottom: 2rem;
  }
  
  
  
  .card-header,
  .card-body{
      padding: 1rem;
  }
  
  .card-header{
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #f0f0f0;
  }
  
  .card-header button{
      background: var(--main-color);
      color: #fff;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border:1px solid var(--main-color);
  }
  
  .card-header div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--main-color);
      color: #fff;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border:1px solid var(--main-color);
  
  }
  
  .card-header div span:first-child{
      font-size: 2rem;
      margin-right: 1rem;
  }
  
  .card-header div span:last-child{
      font-size: 1.2rem;
  }
  
  
  .help{
      display:flex ;
      justify-content: center;
      margin: 1rem auto;
      width: 50%;
      font-family: 'Poppins';
  }
  
  .help img{
  margin: 1rem;
  }
  
  .following{
      font-family: 'Fredericka the Great';
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  .following img{
      height: 50px;
      margin: 1rem 1rem;
  }
  
  .footer{
      font-family: "bebas neue";
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 1px;
  }
  
  .otp{
      display: flex;
      justify-content: center;
      margin: 0 auto;
      padding: 1.5rem 4rem;
      border-radius: 50px;
      border: 1px solid #1d2231;
      background: peachpuff;
  }
      </style>
  </head>
  
  <body>
  
      <div class="email-book-issue">
          <div class="email-book-issue-grid">
              <div class="header">
                  <img src="/public/Images/logo-png.png">
                  <span>Boeken BookHouse</span>
              </div>
              <div class="content-header">
                  <div>
                      <h1>Subscription Successful!!!</h1>
                  </div>
                  <div>
                      <p>Your subscription from ${startdate} to ${enddate} has been successfully done. Enjoy all the services we have to provide. Thanks for choosing us.</p>
                  </div>
  
              </div>
  
              <div class="cover-img">
                  <img src="https://drive.google.com/file/d/14vrg0fs4YLdRoYWlfsBAqbMgbmU_yWrT/view?usp=sharing" alt="Subscription Image">
              </div>
  
              <div class="content-body">
                  <div class="card">
                      <div class="card-header">
                          <h3>Invoice</h3>
                      </div>
                      <div class="card-body">
                          <div class="invoice-grid">
                              <div id='invoice-header-left'>
                                  <strong>${name}</strong>
                                  <br />
                                  Member ID:${id}
                                  <br>
                                  Contact No.:${contact}
                                  <br>
                                  <br>
                                  <div>Starting Date</div>
                                  <strong>${startdate}</strong>
                              </div>
                              <div id='invoice-header-right'>
                                  <div>Payment Date</div>
                                  <strong>${date} - ${time}</strong>
                                  <br>
                                  <br>
                                  <br>
                                  <div>Ending Date</div>
                                  <strong>${enddate}</strong>
                              </div>
                              <div class="form-v-divider"></div>
                              <div id="invoice-bill">
                                  <table width='100%'>
                                      <thead>
                                              <td>Description</td>
                                              <td>Quantity</td>
                                              <td>Amount</td>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td>${des}</td>
                                              <td><span>${days}days of Subscription</span></td>
                                              <td><span>${amount}</span></td>
                                          </tr>
                                          <tr>
                                              <td>SGST (9%)</td>
                                              <td>&nbsp;</td>
                                              <td><span>${gst}
                                                  </span></td>
                                          </tr>
                                          <tr>
                                              <td>CGST (9%)</td>
                                              <td>&nbsp;</td>
                                              <td><span>${gst}
                                                  </span></td>
                                          </tr>
                                          <tr>
                                              <td>&nbsp;</td>
                                              <td>Total </td>
                                              <td>${total}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
  
                          </div>
  
  
                      </div>
  
  
                  </div>
                  <div class="help">
                      <img src="https://img.icons8.com/fluent/48/000000/composing-mail.png" alt="">
                      <div>
                          <h3>Any Questions?</h3>
                          <p>If you need any help whatsoever or just want to chat,email us anytime <strong>bookhouseboeken@gmail.com</strong></p>
                      </div>
                  </div>
                  <div class="following">
                      <div>
                          <h3>Following Us</h3>
                      </div>
                      <div>
                          <a href=""><img src="https://img.icons8.com/fluent/96/000000/facebook-new.png" alt=""></a>
                          <a href=""><img src="https://img.icons8.com/color/96/000000/instagram-new--v2.png" alt=""></a>
                          <a href=""><img src="https://img.icons8.com/color/96/000000/twitter--v2.png" alt=""></a>
                      </div>
  
                  </div>
              </div>
              <div class="footer">
                  <h5>Copyrigth &copy; 2021 Boeken BookHouse, All rights reserved.</h5>
                  <h5>You are receiving this email because you are a registered member of Boeken BookHouse</h5>
              </div>
          </div>
      </div>
  
  </body>
  
  </html>`
}

exports.bookIssue = (name,memberid,contact,date,time,bookid,bookname,author,genre,language,edition)=>{
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  
      <style>
  
          @import url("/public/css/fonts.css");
          :root{
      --main-color:  linear-gradient(to bottom, #324c62, #283e52, #1e3142, #152533, #0c1925);;
      --color-dark: #1d2231;
      --text-grey:#8390a2;
      --bgcolor:#f1f5f9;
  }
  
  *{
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      list-style-type: none;
      text-decoration: none;
  }
  
  
  /* book issue notification */
  
  .email-book-issue{
      display: flex;
      background:var(--bgcolor);
      width: 60%;
      margin: 7rem auto;
      padding: 5rem 5rem;
      border-radius: 25px;
      box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.4);;
  
  
  
  }
  
  .email-book-issue-grid{
      display: grid;
      grid-gap: 3rem;
      margin: 0 auto;
  }
  
  .header{
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
  }
  
  .header img{
      height: 70px;
      vertical-align: top;
  
  }
  
  .header span {
      font-family: 'Yanone Kaffeesatz';
      font-size: 4rem;
      margin-left: 2rem;
      
      color:#283e52;
  
  }
  
  .content-header{
      display: flex;
      flex-direction: column;
      justify-content: center;
  }
  
  .content-header div:first-child{
      font-family: 'Baloo Bhai 2';
      text-align: center;
      font-size: 1.2rem;
  
  }
  
  .content-header div:last-child{
      font-family: 'alaska';
      letter-spacing: 1px;
      font-size: 1.5rem;
      text-align: center;
      width: 60%;
      margin: 0 auto
  }
  
  .cover-img{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
  }
  
  .cover-img{
      width: 50%;
  }
  
  .content-body{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  /* invoice */
  .invoice-grid{
      display: grid;
      grid-template-columns: repeat(2,1fr);
      grid-row: auto;
      grid-gap:2rem;
      padding: 1.5rem;
  }
  
  #invoice-header-left{
      grid-column-start: 1 ;
      grid-column-end: 2 ;
  }
  #invoice-header-right{
      grid-column-start: 2 ;
      grid-column-end: 3;
  }
  
  #invoice-bill{
      grid-column-start: 1 ;
      grid-column-end: 3;
  }
  
  #invoice-bill table,
  #invoice-bill table span{
      text-align: center;
  }
  
  
  .card{
      background: #fff;
      border-radius: 5px;
      box-shadow: 5px 5px 10px rgba(128, 128,128, 0.4);
      width: 60%;
      margin: 0 auto;
      margin-bottom: 2rem;
  }
  
  
  
  .card-header,
  .card-body{
      padding: 1rem;
  }
  
  .card-header{
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #f0f0f0;
  }
  
  .card-header button{
      background: var(--main-color);
      color: #fff;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border:1px solid var(--main-color);
  }
  
  .card-header div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--main-color);
      color: #fff;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border:1px solid var(--main-color);
  
  }
  
  .card-header div span:first-child{
      font-size: 2rem;
      margin-right: 1rem;
  }
  
  .card-header div span:last-child{
      font-size: 1.2rem;
  }
  
  
  .help{
      display:flex ;
      justify-content: center;
      margin: 1rem auto;
      width: 50%;
      font-family: 'Poppins';
  }
  
  .help img{
  margin: 1rem;
  }
  
  .following{
      font-family: 'Fredericka the Great';
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  .following img{
      height: 50px;
      margin: 1rem 1rem;
  }
  
  .footer{
      font-family: "bebas neue";
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 1px;
  }
  
  .otp{
      display: flex;
      justify-content: center;
      margin: 0 auto;
      padding: 1.5rem 4rem;
      border-radius: 50px;
      border: 1px solid #1d2231;
      background: peachpuff;
  }
      </style>
  </head>
  
  <body>
  
      <div class="email-book-issue">
          <div class="email-book-issue-grid">
              <div class="header">
                  <img src="/public/Images/logo-png.png">
                  <span>Boeken BookHouse</span>
              </div>
              <div class="content-header">
                  <div>
                      <h1>Your Book Has Been Issued</h1>
                  </div>
                  <div>
                      <p>The book is supposed to be returned to the library in good condition without any damage to it. in
                          case of damage, a fine decided by the librarian has to be paid by you.</p>
                  </div>
  
              </div>
  
              <div class="cover-img">
                  <img src="https://drive.google.com/file/d/1JKdY1kg_ytJH8h349EjTm0RbWpuOPphd/view?usp=sharing" alt="Book Issue Image">
              </div>
  
              <div class="content-body">
                  <div class="card">
                      <div class="card-header">
                          <h3>Invoice</h3>
                      </div>
                      <div class="card-body">
                          <div class="invoice-grid">
                              <div id='invoice-header-left'>
                                  <strong>${name}</strong>
                                  <br />
                                  Member ID: ${memberid}
                                  <br>
  
                              </div>
                              <div id='invoice-header-right'>
                                  <div>Contact No</div>
                                  <strong>${contact}</strong>
                                  <br>
                                  <br>
                                  <br>
                                  <div>Issue Date</div>
                                  <strong>${date} - ${time}</strong>
                              </div>
                              <div class="form-v-divider"></div>
                              <div id="invoice-bill">
                                  Book ID:
                                  <strong>
                                      ${bookid}
                                  </strong>
                                  <br>
                                  Book Name:
                                  <strong>
                                      ${bookname}
                                  </strong>
                                  <br>
                                  Author:
                                  <strong>
                                      ${author}
                                  </strong>
                                  <br>
                                  Genre:
                                  <strong>
                                      ${genre}
                                  </strong>
                                  <br>
                                  Language:
                                  <strong>
                                      ${language}
                                  </strong>
                                  <br>
                                  Edition:
                                  <strong>
                                      ${edition}
                                  </strong>
                              </div>
  
                          </div>
                          
                      </div>
                  </div>
                  <div class="help">
                      <img src="https://img.icons8.com/fluent/48/000000/composing-mail.png" alt="">
                      <div>
                          <h3>Any Questions?</h3>
                          <p>If you need any help whatsoever or just want to chat,email us anytime <strong>bookhouseboeken@gmail.com</strong></p>
                      </div>
                  </div>
                  <div class="following">
                      <div>
                          <h3>Following Us</h3>
                      </div>
                      <div>
                          <a href=""><img src="https://img.icons8.com/fluent/96/000000/facebook-new.png" alt=""></a>
                          <a href=""><img src="https://img.icons8.com/color/96/000000/instagram-new--v2.png" alt=""></a>
                          <a href=""><img src="https://img.icons8.com/color/96/000000/twitter--v2.png" alt=""></a>
                      </div>
  
                  </div>
              </div>
              <div class="footer">
                  <h5>Copyrigth &copy; 2021 Boeken BookHouse, All rights reserved.</h5>
                  <h5>You are receiving this email because you are a registered member of Boeken BookHouse</h5>
              </div>
          </div>
      </div>
  
  </body>
  
  </html$`
}

