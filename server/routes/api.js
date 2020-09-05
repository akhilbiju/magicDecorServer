const express = require('express');
const router = require('express-promise-router')();
const app=express();
const User = require('../../models/user');
const userController = require('../../controllers/user');
const adminController = require('../../controllers/admin');
const passport = require('passport');
const passportconfig = require('../../passport');


router.get('/', (req,res)=>{
    res.send("Running fine");
});

router.post('/login', passport.authenticate('local',{session : false}), userController.signin);

router.post('/signup', userController.signup);

router.get('/secret', passport.authenticate('jwt',{session : false}),userController.secret);

router.get('/admin/getstats', passport.authenticate('jwt',{session : false}),adminController.getStats);

module.exports = router;