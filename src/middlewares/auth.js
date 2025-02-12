
function adminAuth(req,res,next){
let userAuth=true;
let token="xyz"
if (token!=='xyz') {
    userAuth=false;
    res.status(401).send('admin access denied')
}
else{
  next();
}

}
function userAuth(req,res,next){
  let userAuth=true;
  let token="xyz"
  if (token!=='xyz') {
      userAuth=false;
      res.status(401).send('user access denied')
  }
  else{
    next();
  }
  
  }



module.exports={userAuth,adminAuth};