const express = require('express');
const { signup, login, getUserById} = require('../controllers/userControllers');


const route = express.Router();


route.post('/signup',signup)
route.post('/login',login);
route.get('/getuser/:id',getUserById);
// route.post('/logout',logout);


module.exports = route;