import http from 'http';


const PORT = 8080;

const server = http.createServer((req, res)=>{
    // res.setHeader('Content-Type', "text/html");
    // res.statusCode = 200;

    // res.write("Hello Ayushman!");
    res.end("<h1>Hello Ayushman!</h1>");
})

server.listen(PORT, ()=>{
    console.log(`Server listening to Port ${PORT}`);
});