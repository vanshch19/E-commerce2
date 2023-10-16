
async function makeOrder(amount) {
	// console.log(amount)
    XMLHttpRequest
    try {
        const res = await axios({
            method: 'post',
            data:  {amount},
            url: `/payment/createorder`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
		console.log(res)

        console.log(res.data.order.amount);

        const options = {
            "key": "rzp_test_phdpSpDG4XbB1b", // Enter the Key ID generated from the Dashboard
            "amount": res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Ecommerce Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/payment/payment-verify",
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    } 
    catch (e) {
        window.location.replace('/shop/cart');
    }
}

// ----------- Cart Checkout----- 

const leftcontainer = document.querySelector('.left'); 

leftcontainer.addEventListener('click', (ev)=>{
    // console.log(ev.target)
    
    if(ev.target.classList.contains('placeorder')){
        const amount = ev.target.getAttribute('totalAmount')
        // console.log(amount)
        makeOrder(amount);
    }
})