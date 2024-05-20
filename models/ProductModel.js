const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    bathroom: {
        type: Number,
        required: true
    },
    furnishing: {
        type: String,
    },
    bachelors: {
        type: String,
        
    },
    description: {
        type: String,
    },
    
    facing: {
        type: String,
    },
    
    posterURL: {
        type: String,
        // required: true
    },
    likes:{
        type:Number,
        default:0
    },
    address:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Product", ProductSchema);
