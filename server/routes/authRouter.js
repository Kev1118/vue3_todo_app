const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;
require('dotenv').config()

router.post('/register', async(req, res) => {
    const {username, name, email, password} = req.body
    let hashPassword= ''
    const userExists = Users.findOne({
        where:{
            username: username
        }
    });
    if(userExists) {return res.status(400).send({'message' : 'Username already exists'})}
    await bcrypt.hash(password,saltRounds)
        .then((hash) => {
            hashPassword = hash
        })
    const newUser = await Users.create({
        username: username,
        name: name,
        email: email,
        password: hashPassword
    })
    res.status(200).json({newUser})
})

router.post('/login', async (req, res) => {
    const {username,  password} = req.body;
    if(!username || !password) return res.status(400).send({'message': 'Username and password is required!'});
    const foundUser = await Users.findOne({
        where: {
            username: username
        }
    });
 
    if(!foundUser) return res.status(401)
    const match = await bcrypt.compare(password, foundUser.password)
    if(match){
        const accessToken = jwt.sign(
            {"username": foundUser.username }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'}
        )
        const refreshToken = jwt.sign(
            {"username": foundUser.username }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'}
        )
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({foundUser, accessToken , refreshToken})
    }else{
        res.sendStatus(401)
    }
})

router.post('/verify-token', async (req, res) => {
    const token = req.body.token;
    let decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    res.json(decode)
})

module.exports = router