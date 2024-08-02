const UserModel = require('../modeles/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

//LOGIN (getting acesses token)
const login=async (req, res) => {
    const { email, password}=req.body;
    const user=await UserModel.findOne({ email});
    try{
        if(!user){
             return res.status(404).json({ message:"user not found"});
        }
        const isValidpassword =await bcrypt.compare(password, user.password);
        if(!isValidpassword){
            return res.status(404).json({ message:"Invalid password"});
        }
        const token =jwt.sign({userId:user._id,email:user.email}, "secret_key",{
            expiresIn:"1h", 
        });
        res.json({token});
    }catch(err){
        console.log(err);
    }

}

//REGISTER PAGE
const PostProduct = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existinguser= UserModel.findOne({ email});
        if (!existinguser){
            return res.status(400).send({message: 'User already exists'});
        }
        const newUser = new UserModel({
            id:uuidv4(),
            username,
            email,
            password,
        });


        const user = await newUser.save();
        res.send(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send({ message: 'Error creating user', error: err.message });
    }
};



//UPDATE METHOD

const UpdateUser= async (req, res) => {
    const { username, email, password } = req.body;
    const{id}=req.params
    try{
    const UpdateUser=UserModel.findByIdAndUpdate(id,
        {username,email,password},
        {new: true,runValidation: true}
        )
        if(!UpdateUser){
           return res.send('User not found');
        }
        res.send({username:UpdateUser.username,email: UpdateUser.email, password: UpdateUser.password});}
        catch(err){
            console.error('Error updating user:', err);
            res.send('error in updating');
        }}

        
     
        module.exports = { PostProduct,UpdateUser ,login};