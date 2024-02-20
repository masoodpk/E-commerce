import { Router } from "express";
import * as rh from "./request-handler.js";
import multer from "multer";
import auth from "./middlewares/auth.js";




const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        let date = new Date();
        let name = file.originalname;
        let namePrefix = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
        cb(null, namePrefix + name);
    }
});



const uploader = multer({ storage });
const router = Router()

router.route("/register").post(rh.register);
router.route("/login").post(rh.login);
router.route("/myProduct").get(auth, rh.myProduct);
router.route("/newProduct").post(auth, uploader.single("file"), rh.newProduct);
router.route("/image/:name").get(rh.image);

router.route("/newCollections").get(rh.newCollections)
router.route("/postnewcollections").post(auth, uploader.single("file"), rh.postnewcollections)
router.route("/wishlist").get(auth, rh.wishlist)
router.route("/cartnewcollections").post(auth, uploader.single("file"), rh.cartnewcollections)
router.route("/cart").get(auth, rh.cart)
router.route("/cartremove/:userId").delete(auth,rh.cartremove);
router.route("/wishremove/:userId").delete(auth,rh.wishremove);


export default router;