const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config')
const verifyToken = require('./verifyToken')

router.post('/signup', async (req, res, next) => {
    
    const { username, email, password } = req.body
        // console.log(username, email, password);
        const user = new User({
        username,
        email,
        password
    })
    
    user.password = await user.encryptPass(user.password);
    await user.save();

    //podria ir lo exportado en config.secret
    const token = jwt.sign({id: user._id}, process.env.SECRET,{
        expiresIn: 60 * 60 * 24 //expiracion del token = segundos * minutos * horas = 1 dia
    });

    // console.log(user)
    res.json({ auth: true, token})
})

router.get('/me', verifyToken, async(req, res, next) => {
    /*
        codigo pasado a la funcion verifyToken
    */
    //console.log(decoded);
    //res.json('me')

    const user = await User.findById(req.userId, {password : 0}); 
    //la constrasenia no debe ser devuelta, en ese objeto podemos poner lo que no qeuremos que devuelva
    if(!user){
        return res.status(404).send('No user found')
    }
    
    res.json(user)
});

router.post('/signin', async (req, res, next) => {
    const {email, password} = req.body;
    // console.log(email, password);
    const user = await User.findOne({email : email})
    
    if(!user){
        return res.status(404).send("The email doesn't exists");
    }

    const validPass = await user.validatePass(password);

    if(!validPass){
        return res.status(401).json({auth: false, token: null});
    }

    const token = jwt.sign({id : user._id}, process.env.SECRET , {
        expiresIn: 60 * 60 * 24
    }); //podria ir el config.secret

    // console.log(validPass);
    res.json({auth: true, token});
})

router.get('/dashboard', verifyToken, (req, res) => {
    res.json('dashboard')
})

module.exports = router
