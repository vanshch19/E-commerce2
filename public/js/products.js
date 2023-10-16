const searchinp = document.querySelector('.searchinp');
const searchbtn = document.querySelector('.searchbtn');

searchinp.addEventListener('keyup', async ()=>{
    try{    
        let text = searchinp.value;
        // console.log(text)
        let data = await axios.get(`/userfunctionality/products`); 
        // console.log(data);

        let product = data.data.products;
        // console.log(product)
        // products.forEach(i => {
        //     if(i.name.includes(text)){
        //         console.log(i.name.includes(text));
        //     }
        //     else{
        //         console.log(false);
        //     }
        // });

        
        showproducts(product);
        // document.querySelector('.productslist').innerText = "";
        function showproducts(product){
            for(let i = 0;i<product.length;i++){
                document.querySelector('.productslist').innerHTML =`
                <div class="item">
            <div class="itemimgdiv">
              <img class="itemimg" width="200px" height="100px" src="${product[i].imageUrl}" alt="">
            </div>
            <div class="itemspec">
              <div class="itemname">
                <p style="font-size: 20px;">${product[i].name}</p>
              </div>

              <div class="itemfeatures">
                <li>${product[i].paneltype}</li>
                <li>${product[i].screenresolution}</li>
                <li>${product[i].responsetime}</li>
                <li>${product[i].warranty}</li>
              </div>
            </div>

            <div class="pricebox">
                <div class="itempricediv">
                  <span class="itemprice">${product[i].price}</span>
                  <div class="flipkartcertifiedimg">
                    <img width="90px" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="">
                  </div>
                </div>

                <div class="itemdelchargediv">
                  <span class="itemdelcharge">Free delivery</span>
                </div>

                <div class="btns">
                  <button class="bynow">By Now</button>
                  <button class="addtocart"><a class="addtocartanchor" href="/userfunctionality/addtocart?productId=${product[i]._id}">Add To Cart</a></button>
                </div>
            </div>
          </div>`
        //   document.querySelector('.productslist').classList.add('productslist')
        //   document.querySelector('.productslist').appendChild('div');
            }
        }

        let filterarr = product.filter(p=>{
            if(p.name.includes(text)){
                // console.log(p.name.includes(text));
                // console.log(p)
                return true;
            }
        })
        console.log(filterarr)
        
        if(this.value == ""){
            showproducts(product);
        }
        else{
            if(filterarr == ""){
                document.querySelector('.container2').innerHTML =  `
                <img class="notfoundimg" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png">
                <h1 class="notfoundh1">Sorry, no results found!</h1>
                <h2 class="notfoundh2">Please check the spelling or try searching for something else</h2> `
                document.querySelector('.container2').classList.add('container2');
                document.querySelector('.container2').style.display = 'block';
                document.querySelector('.container1').style.display = 'none';
                // document.querySelector('.productslist').innerHTML = '';
            }
            else{
                showproducts(filterarr);
                document.querySelector('.container1').style.display = 'flex';
                document.querySelector('.container2').style.display = 'none';
            }
        }
        text = "";
    }
    catch(err){
        next(err);
    }
})