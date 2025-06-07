const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');

// const users = require("./MOCK_DATA.json");

const app = express();

//Connection Mongo
mongoose.connect('mongodb://127.0.0.1:27017/first-db-1')
.then((result) => {
  console.log("MongoDB Connected")
}).catch((err) => {
  console.error("Database Connection Failed", err)
});



//Schema
const userSchema = new mongoose.Schema({
  firstName : {
    type: String,
    required: true,
  },
  lastName:{
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  }

}, {timestamps: true})

const User = mongoose.model("user", userSchema);




//Middleware
app.use(express.urlencoded({extended: false}));


//Routes
app.get("/", (req, res) => {
  res.send("<h1>Ayushman Kumar</h1>");
});

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
    ${allDbUsers.map(user => `<li>${user.firstName}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const usersData = await User.find({});
  res.json(usersData);
});

app
  .route("/users/:id")
  .get(async (req, res)=>{

    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "User not found"});
    return res.json(user); 

  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
    return res.json({status: "Success"});

  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({Status: "Success"});
  });


app.post('/users', async (req,res)=>{
    const body = req.body;
    if(!body||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender
    ){
      return res.status(400).json({msg: "All fields are required.."});
    }

    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender
    })
    console.log(result);
    return res.status(201).json({msg: "Success"});
})

app.listen(8000, () => {
  console.log("Server Started");
});
