const mongoose = require('mongoose');

module.exports = {
    connect : () => {
        mongoose.connect( process.env.MONGO_DB_URI ).then( () => {
            console.log("connected to mongodb");
        }).catch((err) =>{
            console.log(`error during connecting to mongodb : ${err}`);
        })
    }}