const User = require('../models/user');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../configuration');

signToken = user =>{
       return JWT.sign({
                        iss: 'akhil',
                        sub: user.id,
                        iat: new Date().getTime(),
                        exp: new Date().setDate(new Date().getDate()+1)
                },JWT_SECRET);
}

module.exports={

        signin : async (req,res,next)=>{
                const role = req.user.role;
                const token=signToken(req.user);  
                res.status(200).json({token,role});
        },

        signup :async (req,res,next)=>{
                const name = req.body.name;
                const password = req.body.password;
                const email = req.body.email;
                const foundUser = await User.findOne({"local.email":email});
                if(foundUser)
                        return res.status(403).send("User with this name already exists");
                var newUser = new User({
                        name,
                        method:"local",
                        role:"user",
                        local: {email, password}
                });
                await newUser.save();    
                res.status(200).json({message : "called"});
        },

        secret: async (req,res,next)=>{
                res.status(200).json({message : "called secret"});
        }
};