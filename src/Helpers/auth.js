import passport from 'passport';

import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { getUser, postUser } from '../Config/database.js';

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });

    const user = await getUser(profile["displayName"], profile["email"]);

    if (user.length === 0) {
        const query_response = await postUser(profile["displayName"], profile["email"]);
        user = await getUser(profile["displayName"], profile["email"]);
    }

    return done(null, user[0]);
  }
));


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});