import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId: {
        type: String
    },
    profile: {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
   

});

export default mongoose.model.Carts || mongoose.model("Cart",schema);


