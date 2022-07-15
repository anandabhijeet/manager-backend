const JWT = require("jsonwebtoken");

const isAuthorized = (req, res, next)=>{ 
    if(!req.headers['authorization']) return next( res.send("unautorized"));
    const authHeader = req.headers['authorization'];
    
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    
   
    JWT.verify(token, process.env.ACCESS_TOKEN, (error, payload)=>{
        if(error) {
            return next(res.send("Unauthorized"))
        }
        req.payload = payload;
        res.locals.payload = payload;
        next()
    })
}

module.exports={
    isAuthorized
}