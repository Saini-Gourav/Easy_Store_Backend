
const {connect,connection,set} =require('mongoose')

function connectDB(){
    set('strictQuery',true)
    return connect('mongodb://127.0.0.1:27017/EasyStore');
}

connection.on('connected',()=>{
    console.log("database connected")
})

module.exports = connectDB;