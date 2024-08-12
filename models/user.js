const { name } = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usersApp')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log('Mongo Error', err));


const userSchema = mongoose.Schema({
    image: String,
    name: String,
    email: String
})


module.exports = mongoose.model('user', userSchema);