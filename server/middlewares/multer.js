import multer from "multer";
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        let date = new Date();
        let name = file.originalname;
        let namePrefix = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
        cb(null,namePrefix + name);   
    }
});

const uploader = multer({storage});