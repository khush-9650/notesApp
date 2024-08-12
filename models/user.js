const { name } = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usersApp')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log('Mongo Error', err));


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    }
});


module.exports = mongoose.model('user', userSchema);