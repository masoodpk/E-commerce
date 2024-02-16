import express from "express";
import cors from "cors";
import router from "./router.js";
import dotenv from "dotenv";
import conn from "./connection.js"


const app=express();
app.use(cors())
app.use(express.json({
    limit:"10mb"
}))
app.use("/api",router)

app.use(express.static("./dist"))

dotenv.config();

conn().then(()=>{
    app.listen(process.env.PORT, (error)=>{
        if(error){
            console.log(error);
        }
        console.log(`server started ${process.env.PORT}`);
    })
})
.catch(error=>{
    console.log(error);
})