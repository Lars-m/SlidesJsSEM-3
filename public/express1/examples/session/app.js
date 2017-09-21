...
var session = require('express-session');

...

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 20000 }}))
app.use("/session",sessions);