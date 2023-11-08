import userModel from '../models/userModel.js';
import bcrypt from  'bcrypt';
import  jwt from 'jsonwebtoken';
import validator from 'validator';

export const registerUser = async (req , res) => {
    const {name , email , password} = req.body;
    
    let user = await userModel.findOne({email});
    //Check user already exist or not
    if(user) {
        return res.status(400).json({message:'User already exist'});
    }
    // Validate that all fields are present 
    if(!name || !email || !password) {
        return res.status(400).json({message:'All fields are required'});
    }
    if (!validator.isEmail(email)){
        return res.status(400).json({message:'Email is invalid'});
    }
    if (!validator.isStrongPassword(password)){
        return res.status(400).json({message:'Password is not strong'});
    }
    user = new userModel({name , email , password})
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt);

    await user.save();

}