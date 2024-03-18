const express=require('express');
const app = express();
const path=require('path');
const bodyparser=require("body-parser");
const session=require("express-session");
const {v4:uuidv4}=require("uuid");
const nocache = require('nocache')

const router=require('./router');

const port=process.env.PORT||3000;

//serializing form data
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))





app.use(nocache());

app.set('view engine','ejs');   
//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

//session

app.use(session({
    //we can use uuid to make secret string
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use('/route',router); //middleware to add all routers to server
///route is the name of te router.we use/route/login to access it

//home route

app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{ title :req.session.user});
    }else{
        
        res.render('base',{title:"login"})
    }
   
})


app.listen(port,()=>{console.log("listening to the server on http://localhost:3000")});