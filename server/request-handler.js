import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import loginModel from "./models/login.model.js";
import newproductModel from "./models/newproduct.model.js";
import cartModel from "./models/cart.model.js";

import path from "path";
import wishlistModel from "./models/wishlist.model.js";
const { sign } = jwt;




export async function register(req, res) {
  try {
    console.log(req.body)
    let { email, username, password, confirmPassword } = req.body;
    console.log(req.body);

    if (!email || !username || !password || !confirmPassword) {
      return res.status(400).json({
        msg: "username,email,password cannot be empty!"
      })
    }

    let userExist = await loginModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({
        msg: "user already exist"
      })
    }
    let hashedpass = await bcrypt.hash(password, 4)
    let add = loginModel.create({
      username,
      email,
      password: hashedpass,
      confirmPassword: hashedpass,
      
    });
    console.log(add);
    return res.status(201).json({
      msg: "register successfull"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error occured"
    })
  }
}

export async function login(req, res) {
  console.log(req.body);
  try {
    let { username, password } = req.body;

    let user = await loginModel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        msg: "invalid username or password!"
      })
    }

    let Valid = await bcrypt.compare(password, user.password);
    if (Valid) {
      let token = await sign({
        username: user.username,
        userId: user._id}
       , process.env.SECRET_KEY, {
        expiresIn: "24h"
      });
      return res.status(201).json({
        msg: "login successful",
        token,user
      })
    }
    return res.status(400).json({
      msg: "invalid username or password"
    })
  } catch
  (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error occured"
    });
  }
}


export async function newProduct(req, res) {
  try {
    let { userId } = req.user;
    console.log(userId);
    let { filename } = req.file;
    let { description, title, discount, category, } = req.body;
    let user = await newproductModel.create({ profile: filename, title, discount, category, description, userId});
    console.log(user);
    return res.status(201).json({
      msg: "data uploaded",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error occured",
    });
  }
}


export async function myProduct(req, res) {
  try {

 let {userId} = req.user
    const user = await newproductModel.find({ userId});
    console.log(user);
    return res.status(200).json({
      msg: "Files retrieved successfully",
      user
    });

    //  
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error occurred while retrieving files",
    });
  }
};

export async function image(req, res) {
  try {
    let { name } = req.params;
    return res.sendFile(path.resolve(`./uploads/${name}`))
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error occurred while retrieving files",
    });
  }
};

export async function newCollections(req, res) {
  try {

    const user = await newproductModel.find();
    console.log(user);
    return res.status(200).json({
      msg: "Files retrieved successfully",
  user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error occurred while retrieving files",
    });
  }
};






export async function cart(req, res) {
  try {

 let {userId} = req.user
    const user = await cartModel.find({ userId});
    let pids = user.map(i => i.itemId, image);
    let data = await cartModel.find({ id: { $in : pids }});
    return res.status(200).json({
      msg: "Files retrieved successfully",
      user,
      data
    });

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error occurred while retrieving files",
    });
  }
};


export async function postnewcollections(req, res) {
  try {
    let { userId } = req.user;
    console.log(userId);
    // let { filename } = req.file;
    let { description, title, discount, category, } = req.body;
    let user = await wishlistModel.create({ title, discount, category, description, userId});
    console.log(user);
    return res.status(201).json({
      msg: "data uploaded",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error occured",
    });
  }
}



export async function wishlist(req, res) {
  try {

 let {userId} = req.user
    const user = await newproductModel.find({ userId});
    console.log(user);
    return res.status(200).json({
      msg: "Files retrieved successfully",
      user
    });

    //  
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error occurred while retrieving files",
    });
  }
};