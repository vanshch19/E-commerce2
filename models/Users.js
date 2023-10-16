const mongoose =  require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required:true,
        unique: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    wishList: [
        {
            type:Schema.Types.ObjectId,
            ref:'Products',
            isTrue: Boolean
        }
    ],
    cart: [
        {
            id:{
                type: Schema.Types.ObjectId,
                ref: 'Products'
            },
            quantity: Number
        }
    ]
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users',userSchema);