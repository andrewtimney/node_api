var restify = require('restify');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  function (username, password, done) {
    if(username)
      return done(null, { username: username });

    return done(null, false, {message: "Something went wrong"});
  }
));

var server = restify.createServer();
server.get(
  '/hello',
  passport.authenticate('basic', { session: false }),
  function (req, res, next) {
    res.send({ "hello": req.user.username });
    next();
  });

server.use(passport.initialize());

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

// bmFtZTpwYXNz
