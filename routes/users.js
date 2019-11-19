const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../schema/Users');
const { RegisterValidation , LoginValidation } = require('../schema/Validation');


//POST HANDLER REGISTER

router.post('/register' , async (req,res) => {
    const {error} = RegisterValidation(req.body); 
    
    if(error) return res.status(400).send(error);
    

    const emailExist = await User.findOne({email: req.body.email});

    if(emailExist) return res.status(400).send({ message: "Email already exists" });

    //HASH THE PASSWORD

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        permission : req.body.permission,
        password: hash
    })
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (error) {
        res.status(400).send(err);
    }
})


//POST HANDLER FOR LOGIN

router.post('/login' , async (req,res) => {

    //Login Validation
    const {error} = LoginValidation(req.body); 
    if(error) return res.status(400).send(error);

    //Checking if e-mail doesnt exist
    const user = await User.findOne({email: req.body.email});
    if(!user ) return res.status(400).send({ message: "Email does not exist" });
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send({ message: "Password is incorrect" });

    //Create and assign token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token' , token).send(token)

    res.send("Logged In")
    
})


module.exports = router;