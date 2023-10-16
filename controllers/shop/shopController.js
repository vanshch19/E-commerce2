const Products = require('../../models/Products');

module.exports.getProfile1 = (req, res, next) => {
  res.render("profile1", {
    name: req.user.username,
    isAdmin: req.user.isAdmin,
    cartCount: req.user.cart.length
  });
};

module.exports.getCart = async (req, res, next)=>{
  res.redirect('/userfunctionality/cartitems')
  // const cartdetails=await req.user.populate('cart.id');

  // res.render('cart', {
  //   name: req.user.username,
  //   isAdmin: req.user.isAdmin,
  //   cartCount: req.user.cart.length,
  //   cartdetails: cartdetails.cart
  // });
}

module.exports.getProducts = async (req, res, next) => {
  try{
    let products = await Products.find({}) 

    res.render("shop/products1", {
      products,
      isAdmin: req.user.isAdmin,
      cartCount: req.user.cart.length
    });

  }
  catch(err){
    next(err);
  }
}

