var express = require('express');
var path = require('path');
//var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var memoryStore = new session.MemoryStore();
console.log(memoryStore);
module.exports.memoryStore = memoryStore;
var app = express();

var mvcDemo1 = require('./public/express1/examples/mvc1/controller');
var sessions = require('./public/express1/examples/session/session');


//app.set("view engine","html");
app.set("view engine","jade");
app.locals.pretty = true;
app.set('views', path.join(__dirname, 'public/publicViews'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/mvc1",mvcDemo1);

app.use(session({ secret: 'Secret For This Exercise',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 1000*60*15,httpOnly: false},
  store: memoryStore
}));

app.use("/session",sessions);

app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});

app.get('/clear9872579547987547329sessions', function(req, res,next) {
  try {
    memoryStore.clear(function (err) {
      if (err) {
        return res.json({status: "Problem clearing sessions"})
      }
      res.json({status: "all sessions cleared"})
    })
  }
  catch(err){
    next(err);
  }
});
var hackerInfo = [];
var sanitizeHtml = require('sanitize-html');


app.get('/hackerEntry', function(req, res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  var param = req.query.cookie;
  var clean = sanitizeHtml(param);
  hackerInfo.push(clean);
  console.log(param);
  res.json({status: param});
});

app.get('/hackerInfo', function(req, res,next) {
  res.json(hackerInfo);
});

var jwt = require("jwt-simple");
app.get("/jwt",function(req,res){
  var iat = (new Date().getTime()/1000);  //convert to seconds
  var exp = iat+(60*5);
  var payload = {
    aud: "Only Meant for a JWT demo",
    iss:  "lam@cphbusiness.dk",
    iat: iat,
    exp: exp,
    sub: "lam",
    additional : {a: "Hello Class", b : "I can basically add 'whatever' I like in a JWT"}
  }
  var token = jwt.encode(payload, "MEAN");
  res.json({token: 'JWT ' + token});
})

app.get('/hackerInfoClear', function(req, res,next) {
  hackerInfo = [];
  res.json({status: "OK"});
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.jade', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.jade', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
