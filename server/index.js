const { request, response } = require('express');
const express = require('express');
const app = express();
const mysql = require("mysql");
const {hashing, hashCompare} = require('./hsh.js');
const { encrypt , decrypt} = require('./encryption');
const dotenv = require("dotenv");
dotenv.config({path: "../client/.env"});

const db = mysql.createConnection({
    user:process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD_KEY,
    database: process.env.DATABASE_NAME
});
app.listen(process.env.DATABASE_PORT, () => console.log('listning on 3001'));

app.use(express.static('C:/Users/prati/OneDrive/Documents/password manager UI/website/client'));

app.use(express.json({limit: '1mb'}));

app.post('/registration',(request,response) => {
    const firstName = request.body.firstNameValue;
    const lastName = request.body.lastNameValue;
    const emailId = request.body.EmailValue;
    const password = request.body.passwordValue
    const bcryptPassword = hashing(password);
    bcryptPassword.then(hasedPassword => {
        
        db.query("INSERT INTO users (Firstname, LastName, EmailID, password) VALUES (?,?,?,?);", 
        [firstName, lastName, emailId, hasedPassword], (error, result) => {
            if(result) {
                response.json({success:'true'});
            }
            else if(error){
                 response.json({success:'false'});
            }
            
        });
    });
   
});

app.post('/login', (request, response) =>{
    const loginEmail = request.body.InputEmailValue;
    const loginPassword = request.body.InputPasswordValue;
    db.query("SELECT * FROM users WHERE emailId = ?;", loginEmail, (error,result) =>{
        if(result.length > 0){
            const fn = result[0].FirstName;
            const ln = result[0].LastName;
            const em = result[0].EmailID;
            hashCompare(loginPassword, result[0].Password).then(result => {

                if(result){ 
                    response.json({
                        status: 'successfull',
                        firstName: fn,
                        lastName: ln,
                        emailId: em
                    });
                }
                else{
                    response.json({status: 'failed'});
                }
            });

        }else{
            response.json({status: 'notAvailabe'});
      
        }
        

    });
});


app.post("/UserDetails", (request,response) =>{
    const webName = request.body.webName;
    const email = request.body.emailId;
    const pass = request.body.pass;
    const emailFk = request.body.emailFk;
    
    db.query("SELECT * FROM users WHERE EmailID = ?;", [emailFk], (error,result) => {
        if(error){
            console.log(error)
        }else{
            const encryptPass = encrypt(pass, result[0].Password);
            db.query("INSERT INTO usersdetails(websiteName, Email, Password,UserEmailFK,iv) VALUES (?,?,?,?,?);", 
            [webName,email,encryptPass.encryptedData ,emailFk, encryptPass.iv], (err, res) => {
                if(err){
                    response.json({stats : "404"});
                    console.log(err);
                }else if(res) {
                    response.json({stats :  "success"});
                }
            });
        }
    }); 
});



// Table data
app.post("/getData", (request, response) => {
    const emailFk = request.body.emailIdFK;
    db.query("SELECT * FROM usersdetails WHERE UserEmailFK = ?;", emailFk, (err, res)=>{
        if(err){
            response.json({
                status: "False"
            });
        }
        else if(res){
            response.json({
                status: "True",
                response: res,
                pass: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            });
        }
    });
});


app.post("/decrypt", (request, response) => {
    const encryptedPass = request.body.passwordArray[request.body.index];
    db.query("SELECT * FROM usersdetails WHERE Password = ?;", [encryptedPass], (err,res) => {
        if(res){
            const iv = res[0].iv;
            db.query("SELECT * FROM users WHERE EmailID = ?;", [request.body.emailIdFK],(err, result) => {
                const hasedPass = result[0].Password; 
                response.json ({ res : decrypt(encryptedPass, iv, hasedPass)});
            });
        }
    });
});




app.post("/delete", (request, response) => {
    const encryptedPass = request.body.passwordArray[request.body.index];
    db.query("DELETE FROM usersdetails WHERE Password = ?;" , encryptedPass, (err,res) => {
        if(err) console.log(err);
        else if(res)response.json({status: "success"});
    })
});