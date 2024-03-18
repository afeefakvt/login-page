var express=require("express");
var router=express.Router();

const credential={
    email:"admin@gmail.com",
    password:"123",
}
//login rout
const message='Invalid entry'

router.post('/login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user=req.body.email;
    
        res.redirect('/route/dashboard');
        // res.end("login successful...!");
        req.session.login=true

    }else{
       res.render('base',{ title: "invalid", msg:"invalid entry...!"})
    }
});
//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{title:'Dashboard'})
    }else{
        res.send("unauthorised user")
    }
})
//route for logout
router.get('/logout',(req,res)=>{
    
    
    req.session.destroy(function(err){

        if(err){
            console.log(err);
            res.send("Error")
        }else{
           res.redirect("/")
        }
    })
   
});


module.exports=router;