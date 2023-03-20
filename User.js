const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true, min: 4, unique: true},
    password: {type: String, required: true},  

});

//Every model must have this kind of constructor before exporting it you can call 'User' since its equals to userschema
const UserModel = model('User', UserSchema);

module.exports = UserModel;