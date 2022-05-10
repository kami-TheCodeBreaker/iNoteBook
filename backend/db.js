// const mongoose=require('mongoose');
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/inotebook";

// const connectToMongo=async ()=>{
//      mongoose.connect(uri,()=>{
//         console.log('connected to Mongo db');
//     })
// }

const connectToMongo=async()=>{
try{
    await mongoose.connect(uri);
    console.log('Successfully connected to Mongo db');
}catch{
    console.log('Not connected to Mongo db');
}
}
module.exports=connectToMongo;