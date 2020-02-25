const passport = require('passport')
const fbStrategy = require('passport-facebook-token')
const db = require('../../models/index')

passport.use('fbStrategy', new fbStrategy({
  clientID: '1235656766624367',
  clientSecret: 'ba94a8b6aa6e0907703f73b6c4eb26e6',
}, async (accessToken, refreshToken, profile, done) => {
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
      username: profile.displayName,
      isAdmin: false
    })

    done(null,newUser)
  } catch(err) {
    done(err, false, err.message)
  }
}))