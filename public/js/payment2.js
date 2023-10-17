
const productslist = document.querySelector('.productslist');

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
            "callback_url": "https://vckart-1.onrender.com/payment/payment-verify",
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
        window.location.replace('/admin/products');
    }
}

productslist.addEventListener('click', (ev)=>{
	// console.log(typeof(parseInt(ev.target.getAttribute('price'))))
	const productId = ev.target.getAttribute('productId');

	// if(ev.target.classList.contains('bynow') && ev.target.id == productId) { 
	// 	console.log(true)
	// }

	if(ev.target.classList.contains('bynow')) {  // pehle bynow btn par click hona chahiye aur fir btnId check kare
		let amount = ev.target.getAttribute('price');
		console.log(amount);
		makeOrder(amount);
	}	
})

