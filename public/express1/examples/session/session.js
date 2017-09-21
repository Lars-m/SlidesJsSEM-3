var express = require('express');
var router = express.Router();

//ShowStart
router.get("/",function(req, res, next) {
  var sess = req.session
  var name= req.query.name;
  if(typeof name !=="undefined"){
    //sess.name =  name.length > 10 ? name.substr(0,name.length-1): name;
    sess.name =  name;
    res.redirect("/session")
    return;
  }
  res.setHeader('Content-Type', 'text/html');
  if (sess.name) {
    sess.views++
    res.write('<p>views: ' + sess.views + '</p>');
    res.write('<p>Hi1: ' + sess.name + '</p> <br/>');
    res.end('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
  } else {
    sess.views = 1
    res.end('<form ><input placeholder="Enter Your Name:" name="name" ><input type="submit"></form>');
  }
})
//ShowEnd
module.exports = router;