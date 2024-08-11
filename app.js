const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/read', async (req, res) => {
    let allUsers = await userModel.find();
    res.render('read', { users: allUsers })
});
app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    });
    res.redirect("/read");
});
app.get('/delete/:id', async (req, res) => {
    let user = await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});
app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.id });
    res.render("edit", { user });
});
app.post('/update/:userid', async (req, res) => {
    let { newname, newemail, newimage } = req.body;
    let user = await userModel.findOneAndUpdate({ _id: req.params.id }, { newname, newemail, newimage }, { new: true });
    res.redirect("/read");
});

app.listen(3000)