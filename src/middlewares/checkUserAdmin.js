
module.exports =(req,res,next)=> {


    
    if(req.session.userLogin && req.session.userLogin.category === "Admin"){
        next()
    }
return redirect('/')


}