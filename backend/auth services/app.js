const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require("mongoose");
const cors = require("cors");



//Init App
const app = express();


// Middlewares
app.use(express.json());


// cors policy
app.use(cors({
    origin: "http://localhost:3000"
}))


// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/questions", require("./routes/questionRoute"));
app.use("/api/questions/page", require("./routes/questionRoute"));
app.use("/api/questions/answers/:id", require("./routes/questionRoute"));
// app.use("/api/answer", require("./routes/answerRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/users/profile/:id", require("./routes/usersRoute"));


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect('mongodb://localhost/userDB',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})


app.get("/", function(req, res){
    res.render("home");
})
app.get("/login", function(req, res){
    res.render("login");
})
app.get("/signup", function(req, res){
    res.render("signup");
})




app.listen(8000, function(){
    console.log("server started on port 8000")
})