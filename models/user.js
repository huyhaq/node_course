const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    email:{
        type : String,
        required: true,
    },
    password:String,
    age: Number
});

const User  = mongoose.model('User', userSchema);
//hoặc const User  = mongoose.model('User', userSchema, 'users');

module.exports = User;