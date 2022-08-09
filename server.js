require("dotenv").config();

const express = require("express"),
    app = express(),
    expressLayouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    port = process.env.PORT || 4092,
    session = require("cookie-session"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    authRouter = require("./routers/auth"),
    flash = require("express-flash");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(flash());

//passportJs 

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}) );

require("./config/passport")(passport);

//mongo
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_CLUSTER_URL = process.env.MONGO_CLUSTER_URL;
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME;
const db = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER_URL}/${MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;

//initializing passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', authRouter);
app.get('/', (req, res) => {
    res.render('landing');
})

//body parsers 
app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to Mongo DB");

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => console.log(err));
