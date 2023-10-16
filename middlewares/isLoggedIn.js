// module.exports = (req,res,next)=>{
//     if(req.user) return next();
//     res.redirect('/login');
// }

module.exports = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'Please LogIn first!!');
        return res.redirect('/login');
    }
    next();
}