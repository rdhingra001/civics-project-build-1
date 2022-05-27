// Description: This is the file that handles the runtime

// Import our packages
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Create important variables
const app = express(); // Our app instance
const port = process.env.PORT || 3000; // Our port instance

// Import our routes
const authRouter = require('./routes/auth/auth.js');
const chatRouter = require('./routes/chat/chat.js');

// Database variables
const username = "admin";
const password = "FPlvYd5u9QfcBESy";
const cluster = "cluster0.6ie5f";
const dbname = "myFirstDatabase";

// Connect to database
mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Configure our environment variables
dotenv.config();

// Express Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use(express.static("public"));

app.get('/', (req, res) => res.redirect("/auth/signin"));

app.get('/load', (req, res) => res.render('loading'));

// Run server
app.listen(port, () => console.log(`The Buddiey web app is running at port ${port}`));