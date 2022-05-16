const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const multer = require('multer');
// const fileupload = require("express-fileupload");

const mysql = require('mysql')
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'login_react'
});

app.use(cors());
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let fileName;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, fileName = Date.now() + "-" + file.originalname);
    },
})
  
const upload = multer({ storage: storage });

app.post('/upload', upload.single("file"), function(req, res) {
    console.log('Task Name', req.body.taskName);
    console.log('Task Image', fileName);

    let sql = `insert into task (fileName, taskName) values ('${fileName}', '${req.body.taskName}')`;
    conn.query( sql, function(err, result) {
        
    });
      
});

app.get('/get_list', function(req, res) {
  let sql = `select * from task`;
  console.log(sql);
  conn.query(sql, function(err, result) {
    console.log(result);
    res.json({result: result});
  })
})


app.listen(3030);