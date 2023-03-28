const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '439894369578-ml5dkbv7o1qso8p7h1qng76sibu8mhep.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET, 
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback:true
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
done(null, user);
});
