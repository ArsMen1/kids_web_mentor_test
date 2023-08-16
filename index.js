const Items = require('./json/items.json');
const Post = require('./json/posts.json');
const User = require('./json/users.json');
// С деплоем БД париться нет времени

let express = require(`express`);
let app = express();
let port = 3000;

app.listen(port, function () {
    console.log(`https://sunset-petalite-munchkin.glitch.me/${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors());


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
// let mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/kids_web_mentor_test');

// Схемы
// Item
// let ItemSchema = new mongoose.Schema({
//     itemName: {
//         unique: true,
//         type: String
//     },
//     name: String,
//     avatar: String,
//     info: String,
//     link: String,
// })

// let Items = mongoose.model('Items', ItemSchema);


// Пост
// let postSchema = new mongoose.Schema({
//     author: {
//         type: mongoose.ObjectId,
//         ref: 'Items'
//     },
//     content: String,
// }, {
//     timestamps: true
// })

// let Post = mongoose.model('post', postSchema);


// User
// let userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         required: true,
//     },
// }, {
//     timestamps: true
// })

// let User = mongoose.model('user', userSchema);


// "Главный" пользователь
let CURRENT_ITEM = '64d37205d0e30c09cd6f7c3d';


// Роуты
app.get('/profile', async function (req, res) {
    // let me = await Items.findOne({ _id: CURRENT_ITEM });
    let me = Items.find(o => o._id.$oid === CURRENT_ITEM)
    res.redirect(`/item?itemName=${me.itemName}`);
});

app.get('/item', async function (req, res) {
    let itemName = req.query.itemName;
    let item = Items.find(o => o.itemName === itemName)
    // let item = await Items.findOne({ itemName: itemName });
    res.send(item);
});

app.get('/items/posts', async function (req, res) {
    let id = req.query.id;
    let posts = Post.find(o => o.author.$oid === id.$oid)
    // let posts = await Post.find({ 'author': id }).sort({ createdAt: -1 });
    res.send([posts]);
});

app.get('/items', async function (req, res) {
    // let items = await Items.find({ _id: { $ne: CURRENT_ITEM } });
    let items = Items.filter(o => o._id.$oid != CURRENT_ITEM)
    res.send(items);
});

app.post('/post/create', async function (req, res) {
    let { content, author } = req.body;

    let post = new Post({
        author,
        content
    })
    await post.save();

    res.send(post);
});

app.post('/login', async function (req, res) {
    let { password, email } = req.body;
    let chek = User.filter(o => o.email === email)
    // let chek = await User.findOne({ email: email });
    if (chek.password == password) res.send({ name: chek.name, email: chek.email });
    else res.send(false)
});

app.get('/post/delete', async function (req, res) {
    let id = req.query.id;
    let post = await Post.deleteOne({ _id: id });
    res.send(post);
});
