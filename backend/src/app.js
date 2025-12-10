// 1. create server
const cookieParser = require('cookie-parser');
const express = require('express');
const appRouter = require('./routes/auth.routes')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("hello world")
});

app.use('/auth/api', appRouter)

module.exports = app;
