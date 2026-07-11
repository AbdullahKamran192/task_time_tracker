import passport from 'passport';

import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { getUser, getUserByGoogleId, postUser } from '../Config/database.js';

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/google/callback`,
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {

    var user = await getUserByGoogleId(profile["id"]);

    if (user.length === 0) {
        const query_response = await postUser(profile["displayName"], profile["email"], profile["id"]);
        user = await getUser(profile["displayName"], profile["email"], profile["id"]);
    }

    user[0].profile_picture = profile["picture"]

    return done(null, user[0]);
  }
));


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
