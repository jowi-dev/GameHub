//Starts up node server
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({path:'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

//decode JWT so we can get the userId on each request
server.express.use((req,res,next) => {
    const {token} = req.cookies;
    if(token){
        const userId = jwt.verify(token, process.env.APP_SECRET);
        //put the userId onto the request for more requests
        req.userId = userId;
    }
    next();
});

server.start({
    cors: {
        credentials:true,
        origin: process.env.FRONTEND_URL
    }
}, details => {
    console.log(`Server running on http://localhost:${details.port}`);
});
