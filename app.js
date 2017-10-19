var express = require('express');
var path = require('path');
//var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var memoryStore = new session.MemoryStore();
module.exports.memoryStore = memoryStore;
var app = express();

var mvcDemo1 = require('./public/express1/examples/mvc1/controller');
var sessions = require('./public/express1/examples/session/session');

//app.set("view engine","html");
app.set("view engine", "jade");
app.locals.pretty = true;
app.set('views', path.join(__dirname, 'public/publicViews'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use("/mvc1", mvcDemo1);
app.use("/session", sessions);


var reactRouterEx1 = path.join(__dirname,"public","reactRouting","example1");
app.use(express.static(reactRouterEx1));

var reactRouterEx2 = path.join(__dirname,"public","reactRouting","example2");
app.use(express.static(reactRouterEx2));

app.get("/reactrouter1", function(req, res){
  res.sendfile(path.join(reactRouterEx1, 'index.html'));
});
app.get("/reactrouter2", function(req, res){
  res.sendfile(path.join(reactRouterEx2, 'index.html'));
});


var jwt = require("jwt-simple");
app.get("/jwt", function (req, res) {
  var iat = (new Date().getTime() / 1000);  //convert to seconds
  var exp = iat + (60 * 5);
  var payload = {
    aud: "Only Meant for a JWT demo",
    iss: "lam@cphbusiness.dk",
    iat: iat,
    exp: exp,
    sub: "lam",
    additional: {a: "Hello Class", b: "I can basically add 'whatever' I like in a JWT"}
  }
  var token = jwt.encode(payload, "MEAN");
  res.json({token: 'JWT ' + token});
})

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.jade', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.jade', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
