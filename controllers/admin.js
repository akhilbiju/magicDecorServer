const User = require('../models/user');
const Layout = require('../models/layout');
const object = require('../models/object');
const Repo = require('../models/repo');
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
        getStats: async (req,res,next)=>{
                const role = req.user.role;
                if(role!="admin")
                   return  res.status(401).json({message : "You are not an admin to access this API"});
                const users = await User.count({});
                const layouts = await Layout.count({});
                const objects = await object.count({});
                const repos = await Repo.count({});
                res.status(200).json({users,layouts,objects,repos});
        }
};