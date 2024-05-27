const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {type:String, required:true , min:4 , unique:true},
    password : {type:String , required:true},
});

const Usermodel = mongoose.model('User',userSchema);

module.exports = Usermodel;

//Either use mongoose.{something} or use:
//const {Schema,model} = mongoose;