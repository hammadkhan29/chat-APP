import userModel from '../models/userModel.js';
import bcrypt from  'bcrypt';
import  jwt from 'jsonwebtoken';
import validator from 'validator';

const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY
    return jwt.sign({_id} ,jwtkey , {expiresIn:'3d'})
}

export const registerUser = async (req , res) => {
    try{
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
        const token = createToken(user._id)
    
        return res.status(200).json({
            user: user, token: token , success: true , message: 'User created'
        })    
    }catch(error){
        console.log(error)
        return res.status(500).json({message:'no no' , error: error})
    }
}


export const loginUser = async (req , res) =>{
    try{
        const {email , password} = req.body;

        let user = await userModel.findOne({email});
        //Check user already exist or not
        if(!user) {
            return res.status(400).json({message:'User does not exist'});
        }
        const isValidPassword = await bcrypt.compare(password , user.password )
        if (!isValidPassword){
            return res.status(400).json({message:'Incorrect Password'});
        }
        const token = createToken(user._id)
    
        return res.status(200).json({
            user: user, token: token , success: true , message: 'User login'
        })    

    }catch(error){
        console.log(error)
        return res.status(500).json({message:'no no' , error: error})
    }
}

export const findUser = async (req, res) =>{
    try{
        const userId = req.params.userId

        const user = await userModel.findById(userId)
        return res.status(200).json({
            user: user, success: true , message: 'User Retrieved'
        })    

    }catch(error){
        console.log(error)
        return res.status(500).json({message:'no no' , error: error})
    }
}

export const getUsers = async (req, res) =>{
    try{
        const users = await userModel.find()
        return res.status(200).json({
            user: users, success: true , message: 'User Retrieved'
        })    

    }catch(error){
        console.log(error)
        return res.status(500).json({message:'no no' , error: error})
    }
}