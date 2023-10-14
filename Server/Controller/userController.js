const {User} = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MAXAGE = 1*24*60*60;

const createJWTToken = (id)=>{
    return jwt.sign({id},'nearbynowsecretkey',{
        expiresIn:MAXAGE
    })
}


const handleUserCreate = async (req,res)=>{
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const uname = req.body.username;
    const password = req.body.password;
    try {

        // check if the user already exist
        const duplicateUser = await User.findOne({"firstname":fname,"lastname":lname}).exec();
        const duplicateUserName = await User.findOne({"username":uname}).exec();
        if(duplicateUser)
        {
            res.json({'message':`User ${fname} already exist`});
        }
        else if(duplicateUserName)
        {
            res.json({'message':`Username: ${uname} already exist choose different Username`});
        }
        else{
            
            // hash the password
            const hashPass = await bcrypt.hash(password,10);
    
            // create the new user
            const result = await User.create({
                "firstname":fname,
                "lastname":lname,
                "username":uname,
                "password":hashPass
            })
        
            res.json({'message':`New use ${fname} is created!`});
        }

        
    } catch (error) {
        console.error(error);
        res.json({'message':`Some error occured while creating the user`});
    
    }

}

const handleLoginUser = async (req,res)=>{
    try {
        const uname = req.body.username;
        const password = req.body.password;

        const findUser = await User.findOne({'username':uname}).exec();
        if(!findUser)
        {
            res.json({'message':`User with the Username: ${uname} is not found!`});
        }
        else{
            const passwordMatch = await bcrypt.compare(password, findUser.password);
            if(passwordMatch)
            {
                const Token = createJWTToken(findUser._id);
                res.cookie('jwt',Token,{httpOnly:true, maxAge: MAXAGE*1000, path:"/"});
                res.json({'message':'Passwords matched','authentication':'success','firstname':findUser.firstname});
            }
            else{
                res.json({'message':'Password is incorrect!', 'authentication': 'failed'});
            }
        }
        
    } catch (error) {
        console.error(error);
        res.json({'message':`Some error occured while Logging the user`})
    }
}

const handleUserLogout =async (req,res)=>{

    res.cookie('jwt','',{maxAge:1});
    res.json({'message':'User successfully logged out'});
}


module.exports = {handleUserCreate, handleLoginUser, handleUserLogout};