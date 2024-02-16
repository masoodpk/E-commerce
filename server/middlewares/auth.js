import jwt from "jsonwebtoken";
const {verify} = jwt;

export default async function(req,res,next){
    try {
        console.log(req.headers.authorization);
        let token = req.headers.authorization.split(" ")[1];
        let user = await verify(token,process.env.SECRET_KEY);
        console.log(user);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            msg:"Unauthorized access!"
        })
        
    }
}