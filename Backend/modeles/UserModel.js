const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const userSchema= new mongoose.Schema({
    id:String,
    username:{
        type: 'string',
        unique: true,
        required: true,
    },
    email:{
        type: 'string',
        unique: true,
        required: true,
    },
    password:{
        type: 'string',
        required: true,}})

        //HASH PASSWORD BEFORE SAVING USER TO DATABASE
        userSchema.pre("save",async function(next) { // pre ACT as middleware ,we use next to pass to middleware
            if(!this.isModified("password")) {
                return next();
            }
                const salt=await bcrypt.genSalt(10);//bcrypt.genSalt(10): This generates a salt value for hashing. The 10 is the number of rounds for generating the salt, 
                this.password = await bcrypt.hash(this.password, salt); //when the password is modified this encrypts your password and store
                next();})


    const userModel= mongoose.model('User', userSchema);
    module.exports= userModel;
