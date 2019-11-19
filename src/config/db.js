const mysql = require('mysql')


const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'siak-pkg',
    port: 3301
})

//db.connect((err) => {
//    if(err) {
//        console.log('Database bermasalah')
//    } else {
//        console.log('Mysql Connected')
//    }
//    
//})

module.exports = db
