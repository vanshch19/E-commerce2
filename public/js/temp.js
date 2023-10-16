// console.log('connected')

const searchInp = document.querySelector('.searchinp');
const searchBtn = document.querySelector('.searchbtn');
const productList = document.querySelector('.productslist');

async function getData(text){
    const data = await axios.get(`/userfunctionality/products`); 
    const products = data.data.products;

    const filteredProducts = products.filter((product, ind)=>{
        if(product.name.toUpperCase().includes(text)) return true;
    })

    return filteredProducts;
}


async function likeProduct(productId, btn) {
    try {
        const res = await axios({
            method: 'post',
            url: `/userfunctionality/wishlist/${productId}`,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        });
        console.log(res);

        if(btn.classList.contains('fa-regular')){
            btn.classList.remove('fa-regular');
            btn.classList.add('fa-solid');
        }
        else{
            btn.classList.remove('fa-solid');
            btn.classList.add('fa-regular');
        }
        // btn.classList.toggle('fa-solid')

    } 
    catch (ev) {
        window.location.replace('/shop/products');
    }
}



searchBtn.addEventListener('click', async (ev)=>{
    const text = searchInp.value.toUpperCase();
    // console.log(text)

    if(text !== ''){

        filteredProducts = await getData(text);
        
        if(filteredProducts == ""){
            document.querySelector('.container2').innerHTML =  `
            <img class="notfoundimg" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png">
            <h1 class="notfoundh1">Sorry, no results found!</h1>
            <h2 class="notfoundh2">Please check the spelling or try searching for something else</h2> `
            document.querySelector('.container2').classList.add('container2');
            document.querySelector('.container2').style.display = 'block';
            document.querySelector('.container1').style.display = 'none';
        }
        else{
            document.querySelector('.container1').style.display = 'flex';
            document.querySelector('.container2').style.display = 'none';
            productList.innerHTML = '';

            for(let product of filteredProducts){
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = 
                `
                    <div class="itemimgdiv">
                        <img class="itemimg" width="200px" height="100px" src="${product.imageUrl}" alt="">
                        <i class="btn like-btn fa-regular fa-heart heart" productId="${product.id}"></i>
                    </div>

                    <div class="itemspec">
                        <div class="itemname">
                        <p style="font-size: 20px;">${product.name}</p>
                        </div>

                        <div class="itemfeatures">
                        <li>${product.feature1}</li>
                        <li>${product.feature2}</li>
                        <li>${product.feature3}</li>
                        <li>${product.warranty}</li>
                        </div>
                    </div>

                    <div class="pricebox">
                        <div class="itempricediv">
                            <span class="itemprice">${product.price}</span>
                            <div class="flipkartcertifiedimg">
                            <img width="90px" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="">
                            </div>
                        </div>

                            

                        <div class="itemdelchargediv">
                            <span class="itemdelcharge">Free delivery</span>
                        </div>

                        <div class="btns">
                            <button type="submit" id="65157d2a7173958c634d4bf0" class="bynow prodbtns">By Now</button>
                            <button class="addtocart prodbtns"><a class="addtocartanchor prodbtnsanchor" href="/userfunctionality/addtocart?productId=65157d2a7173958c634d4bf0">Add To Cart</a></button>
                        </div>
                    </div>

                `
                productList.append(itemDiv);
            }
        }    
    }
})





// const rightContainer = document.querySelector('.rightcontainer');

productList.addEventListener('click', (ev) => {
    const btn = ev.target;
    console.log(btn)
    if (btn.classList.contains('like-btn')) {
        const productId = btn.getAttribute('productId');
        likeProduct(productId, btn);
    }

})