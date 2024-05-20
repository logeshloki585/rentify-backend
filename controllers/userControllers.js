const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const signup = async (req ,res, next ) => {

    const {firstName,lastName,email,password,phoneNumber} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email:email});
    }catch(err){
        console.log(err)
    }


    if(existingUser){
       return res.status(201).json({message:'user already exists! Login instead'});
    }

    const hashedPassword = bcrypt.hashSync(password)
    const user =new User({firstName,lastName,email,password:hashedPassword,phoneNumber})

    try{
        const response = await user.save();
        return res.status(201).json({message:response})
    }catch(err){
        return res.status(404).json({error:err})
    }
}

const login = async (req,res , next) => {
    const {email,password} = req.body;
    let userExist;
    try{
        userExist = await User.findOne({email:email});
    }catch(err){
        console.log(err)
    }

    if(!userExist){
        return res.status(200).json({message:"user not exist, kindly Signup"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,userExist.password);
    
    if(!isPasswordCorrect){
        return res.status(200).json({message:"Invalid Email / Password"});
    }

    const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET_KEY,{expiresIn:"2 days"});

    return res.status(200).json({message:"Successfully Logged In",token:token,user:userExist})
}

const getUserById = async (req, res, next) => {
    const userId = req.params.id;

    let user;
    try {
        user = await User.findById(userId).select('-password');
    } catch (err) {
        return res.status(500).json({ error: 'Fetching user failed, please try again later.' });
    }

    if (!user) {
        return res.status(404).json({ message: 'User not found!' });
    }

    return res.status(200).json({ user });
};



exports.signup = signup;
exports.login = login;
exports.getUserById = getUserById;
