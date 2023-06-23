const jwt = require("jsonwebtoken");

function verifyToken(req,res,next) {
    const authToken = req.headers.authorization;
    if(authToken){
        const token = authToken.split(" ")[1];
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_key);
            req.question = decodedPayload
            // console.log(decodedPayload)
            next()
        }catch(error){
            return res.status(401).json({message:"invalid token, access denied"})
        }
    }else{
        return res.status(401).json({message:"no token provided, access denied"})

    }

}


function verifyToken2(req,res,next) {
    const authToken2 = req.headers.authorization2;
    if(authToken2){
        const token2 = authToken2.split(" ")[1];
        try {
            const decodedPayload2 = jwt.verify(token2, process.env.JWT_SECRET_key2);
            req.answerQuestion = decodedPayload2
            console.log(req.answerQuestion)
            next()
        }catch(error){
            // console.log(req.answerQuestion)
            return res.status(401).json({message:"invalid token, access denied"})
            
        }
    }else{
        return res.status(401).json({message:"no token provided, access denied"})

    }

}


module.exports = {
    verifyToken,verifyToken2
}