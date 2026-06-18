// const http = require('http');
const express = require('express');

const session = require('express-session');

require('dotenv').config();

const { default: mongoose } = require('mongoose');
const mongoDbstore = require('connect-mongodb-session')(session);

const DB_PATH = process.env.MONGO_URI;



const store = new mongoDbstore({
    uri: DB_PATH,
    collection: 'sessions'
});

const app = express();

const path = require('path');
const rootDir = require('./utils/util')
const userrouter = require('./routes/userrouter')

app.set("view engine", "ejs");




// const server = http.createServer((req, res) => {  
// });
app.use(express.static('public'));
app.use(express.urlencoded());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store
}));

app.use((req, res, next) => {
   req.isLoggedIn = req.session.isLoggedIn ;
    next();
});
app.get("/", (req, res) => {

    

    res.render("index", {
        pageTitle: "Home",
        isLoggedIn: req.isLoggedIn
    });

});
app.use(userrouter);





app.use((req, res, next) => {
    res.status(404).render("404", {
        pageTitle: "Page Not Found",
        isLoggedIn: req.isLoggedIn
    });
});


const PORT = process.env.PORT || 8000;
mongoose.connect(DB_PATH)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
})
.catch(err => console.log(err));