const express = require('express');
const router = express.Router();
const passport= require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');



//Register
router.post('/register', (req,res,next)=>{
   let newUser =new User({
       name: req.body.name,
       email: req.body.email,
       username: req.body.username,
       password: req.body.password
   });


   


   User.addUser(newUser, (err,user)=>{
       if(err){
           res.json({success: false,msg:'Faild to register'});
       }else{console.log('save')
        res.json({success: true,msg:'User registered'});
       }
   });



});
//Add Parks to Registering
router.post('/details', (req, res, next)=>{
    let newUser1 =new User1({
        city: req.body.city,
        street: req.body.street,
        number: req.body.number,
        MaxWeight: req.body.MaxWeight,
        MaxHeight: req.body.MaxHeight,
        Category: req.body.Category,
        OpenHours: req.body.OpenHours,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        
    });
 
 
    
 
 
    User1.addUser(newUser1, (err,detail)=>{
        if(err){
            res.json({success: false,msg:'Faild to request'});
        }else{console.log('save')
         res.json({success: true,msg:'Request sent'});
        }
    });
});

//Authenticate
router.post('/authenticate' , (req, res, next)=>{console.log('uygjfghh')
    const email = req.body.email;
    const password = req.body.password; 
 

    User.getUserByEmail(email, (err,user)=>{
        if(err) throw err;console.log(user)
        if(!user){
            return res.json({success: false,msg: "User not found"});
        
        }


        User.comparePassword(password,user.password, (err,isMatch)=>{console.log('backend')
            if(err)throw err;console.log(isMatch)
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret,{
                    expiresIn:604800 // 1 week

                });


                res.json({
                    success:true,
                    token: 'JWT' +token,
                    user:{
                        id: user._id,
                        name: user.name,
                        username:user.username,
                        email:user.email
                    }
                });
            }else{
                return res.json({success: false,msg: "Wrong password"});
            }
        });
    });

});


//Profile
router.get('/profile' ,passport.authenticate('jwt',{session:false}), (req, res, next)=>{console.log()
   res.json({user: req.user});
});




module.exports = router;

