const mongoose = require('mongoose');

function connectDB(){
mongoose.connect("mongodb://localhost:27017/food-view")
.then(()=>{
    console.log("mongoDB connect");
})
.catch((err)=>{
    console.log("MongoDB connect error:" , err)
})
}
module.exports = connectDB;