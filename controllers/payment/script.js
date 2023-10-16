const Razorpay = require('razorpay'); 
const Order = require('../../models/order');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const { RAZORPAY_KEY_ID, RAZORPAY_SECRET_KEY } = process.env;


// const razorpayInstance = new Razorpay({
//     key_id: 'rzp_test_phdpSpDG4XbB1b',
//     key_secret: RAZORPAY_SECRET_KEY
// });

module.exports.createOrder = async (req,res,next)=>{
   
    const instance = new Razorpay({ key_id: 'rzp_test_phdpSpDG4XbB1b', key_secret: 'avKiJY7Vmw0qRMqqmpZQHCJY' })
    const {amount} = req.body;
    console.log(amount);
    const options = {
        amount: parseInt(amount) * 100,
        currency: "INR",
    };

    const order = await instance.orders.create(options);
    await Order.create({
        _id:order.id,
        user:req.user,
        amount
    })

    res.json({
        sucess:true,
        order
    })
   
}

module.exports.paymentVerify = async (req,res,next)=>{

    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const isValid = validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, 'avKiJY7Vmw0qRMqqmpZQHCJY');
        console.log(isValid)

        if(isValid){
            await Order.findByIdAndUpdate({_id: razorpay_order_id}, {paymentStatus: true})
            return res.render('paymentsuccess')
        }

        res.json({
            succes:false,
            msg: 'Payment unsuccessfull'
        })
    } 
    catch (e) {
        res.send('something went wrong!!');
    }
    
    
}