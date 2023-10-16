const mongoose =  require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String
    },
    feature1:{
        type: String
    },
    feature2:{
        type: String
    },
    feature3:{
        type: String
    },
    warranty:{
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl:{
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    category: {
        type: String,
        required: true
    },
    discount: {
        type: Number
    }
});

module.exports = mongoose.model('Products',productSchema);