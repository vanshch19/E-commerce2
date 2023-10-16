const plusbtn = document.querySelector('.plusbtn');
const minusbtn = document.querySelector('.minusbtn');
const cartproductsdiv = document.querySelector('.cartproductsdiv');

let requestInProgress = false;

cartproductsdiv.addEventListener('click', async (ev) => {
    let productId = ev.target.getAttribute('productId');
    const totalPrice = document.querySelector('.mrp');
    const totalDiscount = document.querySelector('.discount');
    const totalAmount = document.querySelector('.totalamountnum');
    const totalSaved = document.querySelector('.save');

    let btnId = ev.target.getAttribute('productId');
    if (btnId == productId) {

        if (requestInProgress) {
            return; // Return early if a request is already in progress
        }

        requestInProgress = true;

        try {
            
                if (ev.target.classList.contains('minusbtn')) {
                    let qtyinp = ev.target.parentElement.nextElementSibling;
                    try {
                        if (qtyinp.value > 1) {
                            let data = await axios.get(`/userfunctionality/decrementqty?productId=${productId}`);
                            console.log(data);
                            qtyinp.value = data.data.qty;
                            totalPrice.innerText = -data.data.totalPrice;
                            totalDiscount.innerText = data.data.totalDiscount;
                            totalAmount.innerText = data.data.totalAmount;
                            totalSaved.innerText = data.data.totalDiscount;
                        } else {
                            if (qtyinp.value <= 1) {
                                ev.target.classList.add('disabled');
                            }
                        }
                    } catch (err) {
                        console.log("error");
                    }
                }
                else {
                    let qtyinp = ev.target.parentElement.previousElementSibling;
                    try {
                        if (ev.target.classList.contains('plusbtn')) {
                            if (qtyinp.value < 10) {
                                let data = await axios.get(`/userfunctionality/incrementqty?productId=${productId}`);
                                qtyinp.value = data.data.qty;
                                totalPrice.innerText = -data.data.totalPrice;
                                totalDiscount.innerText = data.data.totalDiscount;
                                totalAmount.innerText = data.data.totalAmount;
                                totalSaved.innerText = data.data.totalDiscount;
                            }
                            else {
                                ev.target.classList.add('disabled');
                            }
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }

                requestInProgress = false; // Reset the flag after the request is complete
            
        }
        finally {
            requestInProgress = false;
        }
    }
})



