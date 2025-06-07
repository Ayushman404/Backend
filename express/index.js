const express = require("express");
const fs = require('fs');

const users = require("./MOCK_DATA.json");

const app = express();

//Middleware
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.send("<h1>Ayushman Kumar</h1>");
});

app.get("/users", (req, res) => {
  res.send(users.map((user) => user.first_name).join("<br>"));
});

app.get("/api/users", (req, res) => {
  res.send(users);
});

app
  .route("/users/:id")
  .get((req, res) => res.json(users.filter((user)=>user.id === parseInt(req.params.id))))
  .patch((req, res) => {
    const id = parseInt(req.params.id);
    const newUsers = users.map((user) => user.id === id ? {...user, last_name: "Harshit"} : user);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(newUsers), (err, data)=>{
        return res.json({status: "success user edited"});
    })

  })
  .delete((req, res) => {
    const id = parseInt(req.params.id);
    const newUsers = users.filter(user=>user.id !== id);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(newUsers), (err, data)=>{
        return res.status(200).json({status: `Success deleted user with id ${id}`});
    });
  });


app.post('/users', (req,res)=>{
    const body = req.body;
    users.push({
        ...body, id: users.length + 1
    });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        return res.json({status: "success"});
    })
})

app.listen(8000, () => {
  console.log("Server Started");
});
