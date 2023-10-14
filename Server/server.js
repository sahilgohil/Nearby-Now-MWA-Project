const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const uri = "mongodb+srv://12044978:Rx1qDfsiu7cOPSd4@cluster0.1go9lad.mongodb.net/?retryWrites=true&w=majority";
const PORT = 3000;
const {handleUserCreate, handleLoginUser, handleUserLogout} = require('./Controller/userController');
const cookieParser = require('cookie-parser');
const { authenticateUser } = require("./middleware/authUser");
const { handleGetPlaces } = require("./Controller/placesController");


// include other origins if wanted
const cosrsOptions = {
    origin: 'http://localhost:8000',
    credentials: true
}




// buit in middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// third party
app.use(cors(cosrsOptions));
app.use(cookieParser());

async function main(){
    await mongoose.connect(uri,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
}

// handles the user create post requrests
app.post('/createNewUser',handleUserCreate);

// handles the user login post requrests
app.post('/loginUser',handleLoginUser);

app.get('/setCookie',(req,res)=>{
    console.log('set the cookie');

    res.cookie('user set',true);
    res.send('you got the cookie');
})

app.get('/getData',authenticateUser,(req,res)=>{
    res.json({'message':'You are logged in here is your data: Good JOb','status':'success'})
})

app.get('/logout',handleUserLogout);

app.post('/getNearbyPlace',handleGetPlaces);


main().then(()=>{
    console.log("Database connection is Up");
    app.listen(PORT,()=>{
        console.log(`App is listening at the port: ${PORT}`);
    })
}).catch((err)=>console.error(err));
