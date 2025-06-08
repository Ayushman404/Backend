const express = require('express');
const {connectMongoDB} = require('./dbConnect.js');
const {handleRedirect, handleAnalyticReq} = require('./controllers/urlHandlers.js')
const urlRouter = require('./routes/url.js');
const app = express();
const PORT = 3000;

//Database Connection
connectMongoDB('mongodb://127.0.0.1:27017/short-url')
.then((result)=> {console.log("MongoDB connected successfully")})
.catch((err)=> {console.log("DB connection failed", err)});

//Routes Middleware
app.use(express.json());
app.use('/url', urlRouter);


//Routes
app.get('/:id', handleRedirect);
// app.get('/url/analytics/:shortId', handleAnalyticReq);


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});
