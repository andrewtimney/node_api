var restify = require('restify');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  function (username, password, done) {
    if(username)
      return done(null, { user: username });
      
    return done("Whoops");
  }
));

function respond(req, res, next) {
  res.send({ hello: req.params.name });
  next();
}

var server = restify.createServer();
server.get(
  '/hello/:name', 
  passport.authenticate('basic', { session: false }),
  respond);
server.head('/hello/:name', respond);

server.use(passport.initialize());

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

// bmFtZTpwYXNz