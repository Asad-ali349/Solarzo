import Users from "../models/users.js";
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';
import fs from 'fs';
import SendEmail from '../Helper/email.js';
import mongoose from "mongoose";
import assignedStockModel from "../models/assignedStocks.js";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


const addUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    address: Joi.string(),
    role:Joi.string().required()
}).unknown();

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    address: Joi.string().allow(null),
    role:Joi.string(),
    zip: Joi.string().allow("").optional(),
    phone: Joi.string().allow("").optional(),
}).unknown();


export const createUser= async (req, res)=>{   
    
    const {email,password}=req.body;
    const user=req.body;
    // console.log(user)
    try{
        const { error, value } = addUserSchema.validate(req.body);

        if (error) {
            // Return a 400 Bad Request response if validation fails
            return res.status(400).json({ message: error.details[0].message });
        }
       
        const existingUser= await Users.findOne({email});
        if (existingUser)
            return res.status(400).json({ message:"User Already exist..."});

        if(req.file){
            if (req.file || Object.keys(req.file).length !== 0){
                const file = req.file; 
                // uploading image to cloudnary
                try{

                    await cloudinary.v2.uploader.upload(file.path, { folder: "SOLARZO_APP", resource_type: 'raw' }, async (err, result) => {
                        if(err) throw err;
                        removeTmp(file.path)
                        user.profile_image= { public_id: result.public_id, url: result.secure_url }
                    })
                }catch(error){
                    console.log(error)
                }
            }
        }
        
        // const password=generatePassword(8)
        const hashPassword = await bcrypt.hash(password, 10);
        const NewUser= new Users({...user,password:hashPassword});
        const savedUser = await NewUser.save();

        // Check if the user was successfully added
        if (savedUser) {
            let message=`<p>Your Account has Created Successfully. Your Credentials for login are: <br> <b>Email</b>: ${email} <br> <b>Password</b>: ${password}</p>`
            SendEmail(email,"Account Creation",message);
          // Return a 200 status with a success message
          return res.status(200).json({ message: 'User Added Successfully.' });
        } else {
          // If for some reason the user was not saved, return a 500 status
          return res.status(500).json({ message: "Unable to add user." });
        }

    }catch(error){
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error });
    }
}

export const GetUsers=async(req, res)=>{  
    try{
        const users= await Users.find({role:{$ne:"admin"}}).select('-password');
        return res.status(200).json(users);
    }catch(error){  
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error });
    }

}
export const GetProfile=async(req, res)=>{ 
    const {user_id}=req;
     
    try{
        const users= await Users.findOne({_id:user_id}).select('-password');
        return res.status(200).json(users);
    }catch(error){  
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error });
    }

}
export const GetUserDetail=async(req, res)=>{ 
    const {id}=req.params;

    try{
        const user= await Users.findOne({_id:id}).select('-password');
        const assinedstocks=await assignedStockModel.find({team_id:id}).populate('stock_id');
        return res.status(200).json({user,assinedstocks});
    }catch(error){  
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error });
    }

}
export const UpdateProfile=async(req, res)=>{
    const {user_id}=req;
    const user=req.body;
    try{
        
        const { error, value } = updateUserSchema.validate(req.body);
        if (error) {
            // Return a 400 Bad Request response if validation fails
            console.log("ERROR")
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingUser=await Users.findOne({
            _id:{$ne:user_id},
            email:user?.email
        });
        if (existingUser)
            return res.status(400).json({ message:"User already exist..."});

        if(req.file){
            if (req.file || Object.keys(req.file).length !== 0){
                const file = req.file; 
                // uploading image to cloudnary
                try{
                    if(user.profile_image!=null && user.profile_image!=""){
                        const publicIdToDelete = fileData.path.public_id;
                        const respurse_deleted = await cloudinary.v2.api.delete_resources([publicIdToDelete],{ type: 'upload', resource_type: 'raw' });
                    }
                    await cloudinary.v2.uploader.upload(file.path, { folder: "SmallCapCanada_APP", resource_type: 'raw' }, async (err, result) => {
                        if(err) throw err;
                        removeTmp(file.path)
                        user.profile_image= { public_id: result.public_id, url: result.secure_url }
                    })
                }catch(error){
                    console.log(error)
                }
            }
        }

        const updatedUser= await Users.findByIdAndUpdate(
            user_id,
            user,
            {
                new:true
            }
        );

        return res.status(200).json(updatedUser);

    }catch(error){  
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error });
    }

}
export const UpdateUsers=async(req, res)=>{
    const id=req.params.id;
    const user=req.body;
    
    try{
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send("Invalid Id...");


        const { error, value } = updateUserSchema.validate(req.body);
        if (error) {
            // Return a 400 Bad Request response if validation fails
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingUser=await Users.findOne({
            _id:{$ne:id},
            email:user?.email
        });
        if (existingUser)
            return res.status(400).json({ message:"User already exist..."});


        const updatedUser= await Users.findByIdAndUpdate(
            id,
            user,
            {
                new:true
            }
        );

        return res.status(200).json({ message:"User Profile updated successfully..."});

    }catch(error){  
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error });
    }

}


export const DeleteUser= async (req,res)=>{
    const {id} = req.params;

    try {
        const deleteUser=await Users.findOneAndDelete({_id:id});
        return res.status(200).json({ message: "User deleted successfully"});
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error });
    }

}

export const ChangePassword = async (req,res) => {
    
    const {user_id}=req;
    
    const {old_password,new_password}=req.body;
    try{
        const user=await Users.findOne({_id:user_id});
        if(!user)
            return res.status(400).json({message: "User Not Found..."});

        let matchPasswrod= await bcrypt.compare(old_password,user.password);
        
        if(!matchPasswrod)
            return res.status(400).json({message: "Incorrect Old Password..."});


        const password = await bcrypt.hash(new_password, 10);
        const updatedUser= await Users.findByIdAndUpdate(
            user_id,
            {password},
            {
                new:true
            }
        );
        if(updatedUser){
            return res.status(200).json({ message:"User Password updated successfully..."});
        }else{
            return res.status(500).json({ message:"Unable to Update password..."});
        }        
    }catch(error){
        res.status(500).json({message:error})
    }
}



const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

function generatePassword(length) {
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
let password = "";

for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
}

return password;
}



