const passport = require("passport");
const strategy = require ('passport-facebook');
const db = require('./models/index')

const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(
  new FacebookStrategy(
    {
      clientID: "1235656766624367",
      clientSecret: "ba94a8b6aa6e0907703f73b6c4eb26e6",
      callbackURL: "/users/auth/facebook/callback",
      profileFields: ["email", "name"]
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await db.User.findOne({
          where: {
            'email': profile.emails[0].value
          }
        })
        if(existingUser) {
          return done(null, existingUser)
        }
    
        const newUser = await db.User.create({
          email: profile.emails[0].value,
          firstname: profile.name.givenName,
          lastname : profile.name.familyName,
          username: profile.name.givenName + profile.name.familyName,
          isAdmin: false
        })
    
        done(null,newUser)
      } catch(err) {
        done(err, false, err.message)
      }
    }
  )
);