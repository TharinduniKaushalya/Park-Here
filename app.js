const express = require ('express');
const path = require('path');
const bodyParser= require('body-parser');
const cors =require('cors');
const passport =require('passport');
const mongoose =require('mongoose');
const config = require('./config/database');
//const app = express();
//const router = express.Router();
const fs = require('fs');
const multer = require('multer');



const DIR = './uploads';


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
 
app.get('/api', function (req, res) {
  res.end('file catcher example');
});
 
app.post('/api/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
});


// var multer  = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/images');
//     },
//     filename: function (req, file, cb) {


//         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){


//             var err=new Error();
//             err.code ='filetype';
//             return cb(err);

//         }else{
//             cb(null,Date.now()+ '_' + file.originalname);
//         }

        
     
//     }
//   });
  
//   var upload = multer({ 
//       storage: storage,
//       limits: {fileSize: 10000000}
    
    
//     }).single('picture');




//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', ()=>{
    console.log('Connected to databse', +config.database);
});


mongoose.connect('mongodb://localhost:27017/Notification',{ useNewUrlParser: true });


//on error
mongoose.connection.on('error', (err)=>{
    console.log('Database Error:' ,+err);
});


const app=express();


const users =require('./routes/users');


//port number
const port =3000;

//CORS Middleware
app.use(cors());

//Select Static folder
app.use(express.static(path.join(__dirname, '/E')));



//Body Parser Middleware
app.use(bodyParser.json());


app.use('/users',users);


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);


 app.use('/users',users);





//Index Route
app.get('/',(req,res)=>{
    res.send('Inavalid Endpoint');
});

//Star Server
app.listen(port,()=>{
    console.log('Sever started on port' +port);
});




// app.post('/upload', function (req, res) {
//   upload(req, res, function (err) {
//    if(err){
//        if(err.code=== 'LIMIT_FILE_SIZE'){
//            res.json({success: false,message: 'File size is too large. Max limit is 10MB'});
//        }else if(err.code==='filetype'){
//            res.json({success: false,message:'File type is invalid. Must be jpg jpeg or png'});
//        }else{
//            console.log(err);
//            res.json({success: false, message: 'File was not able to uploaded'});
//        }
//    }else{
//        if(!req.file){
//            res.json({success: false, message: 'No file was selected'});
//        }else{
//            res.json({success: true, message: 'File was uploaded'});
//        }
//    }
      
    

    
//   });
// });


