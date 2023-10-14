const jwt = require('jsonwebtoken');

const authenticateUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,'nearbynowsecretkey',(err, decodedToken)=>{
            if(err)
            {
                res.json({'message':`Invalid Token`});
            }
            else{
                console.log(decodedToken);
                next();
            }
        })

    }
    else{
        res.json({'message':`User is not logged in`});
    }
}

module.exports = {authenticateUser};