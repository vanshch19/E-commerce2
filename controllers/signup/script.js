const User = require('../../models/Users');

module.exports.getSignup = (req,res,next)=>{
    res.render('signup',{
        msg: req.flash('msg')
    });
}

module.exports.postSignup= async (req, res) => {
    const { username, password } = req.body;

    const user = new User({ username });
    const newUser = await User.register(user, password);

    await newUser.save();

    req.flash('success', 'You are registed successfully!');
    res.redirect('/login');
}