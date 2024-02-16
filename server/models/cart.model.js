import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId: {
        type: String
    },
    itemId: {
        type: String
    },
    name:{
        type: String
    },
    image:{
        type: String
    },

    new_price:{
        type: String
    },
    old_price:{
        type: String
    },

});

export default mongoose.model.Carts || mongoose.model("Cart",schema);


