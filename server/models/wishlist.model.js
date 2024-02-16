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
    discount: {
        type: String
    },

    description: {
        type: String
    },
    new_price: {
        type: String
    },
    old_price: {
        type: String
    },
    name: {
        type: String
    }

});

export default mongoose.model.Wishlists || mongoose.model("Wishlist",schema);


