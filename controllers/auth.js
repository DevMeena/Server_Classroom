import express from 'express';
import passport from 'passport';
import session from 'express-session';
import User from '../models/user.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// import GoogleStrategy from 'passport-google-oauth20'.Strategy
import findOrCreate from 'mongoose-findorcreate'
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require("mongoose-findorcreate");
const app = express();

app.use(session({
    secret: 'this is the secret code',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())




passport.use(User.createStrategy())

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

// const router = express.Router();


// ************ GOOGLE BHAMIYA *****************

// 413710211822-amur0107552v3uol3ikdrs65nvl9lcfc.apps.googleusercontent.com

// kABBlOsAb2C7nFk_NaLbnoLC

// http://localhost:5000/home/auth/google/dashboard

passport.use(new GoogleStrategy({
    clientID: "413710211822-amur0107552v3uol3ikdrs65nvl9lcfc.apps.googleusercontent.com",
    clientSecret: "kABBlOsAb2C7nFk_NaLbnoLC",
    callbackURL: "http://localhost:3000/auth/google/dashboard",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        if(err) {
            console.log(err);
        } else {
            console.log(user);
            return cb(err, user);
        }
    });

    // User.findOne({ googleId: profile.id }, async (err, doc) => {
    //     console.log("HOLA");
    //     if (err) {
    //       return cb(err, null);
    //     }
        
    //     if (!doc) {
    //     console.log("HOLAAAA");

    //       const newUser = new User({
    //         googleId: profile.id,
    //         username: profile.name.givenName
    //       });
          
    //       await newUser.save();
    //       cb(null, newUser);
    //     }
    //     console.log("AAAHOLAAAA");

    //     cb(null, doc);
    //   })

    //   console.log("AAAHO0000000LAAAA");

  }
));


// ! START PAGE

export const startPage = (req,res) => {
    res.send('THis Works')
}

// require("./passportConfig")(passport);


// ***************** GOOGLE AUTH ********************

export const googleAuth = passport.authenticate('google', { scope: ['profile'] })
export const googleAuthenticate = passport.authenticate('google', { failureRedirect: 'localhost:3000' })

export const googleAuthSuccess = (req,res,e) => { 
    // console.log("google Auth Success Starts Here");
    //     if(e){
    //         console.log(e);
    //     } else {
            console.log("GOOGOLE AUTH SUCCESS");
            res.redirect("http://localhost:3000/dashboard") 
        // }
    }

// export const googleAuth = (req, res) => { 
//     console.log("GOOGLE AUTH YAHOOO");
//     passport.authenticate( "google",{ scope: ["profile"] } )
// }
// export const googleAuth = () => {
//     console.log("google Auth starts here");
//     passport.authenticate('google', { scope: ['profile'] })
//     console.log("google Auth ends here");

// }
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: 'https://gallant-hodgkin-fb9c52.netlify.app', session: true }),
//   function (req, res) {
//     res.redirect('https://gallant-hodgkin-fb9c52.netlify.app');
//   });

// export const googleAuthSuccess = () => {
//     console.log("xd");
// }

    // console.log("THIS IS GOOGLEAUTHSUCCESS START")

    // passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
        // http://localhost:5000/home/auth/google/dashboard
        // console.log("THIS IS GOOGLE AUTH SUCCESS");
//   function(req, res) {
    // Successful authentication, redirect secrets.
    // res.redirect("http://localhost:5000/home/auth/google/dashboard")
//   }


// ******************* DESI AUTH **************************



// async
export const signUp =  (req, res) => {

    const user = new User({
        fistName: req.body.firstName,
        lastName: req.body.lastName,
        email:  req.body.email,
        password: req.body.password,
        isTeacher: req.body.isTeacher
    })
    
    console.log("THIS IS SIGN UP");

    console.log(req.body);
    // { fistName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, isTeacher: req.body.isTeacher }
    try {

        User.findOne({ email: req.body.email }, (e, doc) => {
            if(e) {
                console.log(e);
            } else {
                console.log(doc);
                if( !doc ) {
                    user.save((e) => {
                        if(e){
                            console.log("SAVING FAILED")
                            console.log(e);
                            res.status(404).json({Authenticated: false});
                        } else {
                            console.log("USER IS SAVED WALLAH");
                            res.status(201).json({Authenticated: true});
                        }
                    });
                } else {
                    console.log("SAVING FAILED USER ALREADY PRESENT")
                    res.status(404).json({Authenticated: false});
                }
            }
        });

        // User.register( { fistName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, isTeacher: req.body.isTeacher } , req.body.password, (e,user) => {
        //     if(e) {
        //         res.json({ success: false, message: e.message })
        //         console.log("ERROR IN SAVING USER");
        //         console.log(e);
        //     } else {
        //         console.log("USER IS SAVED WALLAH");
        //         passport.authenticate("local")(req,res, () => {
        //             console.log("AUTHENTICATION IS DONE HERE")
        //             res.status(201).json({Authenticated: true});
        //         })

        //     }
        // })

        console.log("END OF REGISTER");

    } catch (error) {
        console.log(" ERROR IN SIGN UP ");
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

// ! SIGN IN
// async
export const signIn = (req, res) => { 
    console.log("THIS IS SIGN IN");

    const user = new User(req.body)

        // email: req.body.email,
        // password: req.body.password,

    console.log(req.body);

    try {

        User.findOne({ email: req.body.email }, (e, doc) => {
            if(e) {
                console.log(e);
                res.status(404).json({Authenticated: false});
            } else {
                if( !doc ) {

                    console.log("USER NOT FOUND")
                    res.status(404).json({Authenticated: false});
                    
                    
                } else {

                    if(doc.password === req.body.password) {
                        console.log("USER IS VERIFIED WALLAH");
                        res.status(201).json({Authenticated: true});
                    } else {
                        console.log("FAILED TO LOG IN UNVERIFIED USER")
                        console.log(e);
                        res.status(404).json({Authenticated: false});
                    }

                    
                }
            }
        });

        // user.save((e) => {
        //     if(e){
        //         console.log("SAVING FAILED")
        //         console.log(e);
        //         res.status(404).json({Authenticated: false});
        //     } else {
        //         console.log("USER IS SAVED WALLAH");
        //         res.status(201).json({Authenticated: true});
        //     }
        // });

        // req.login(user, (e)=> {
        //     if(e){
        //         console.log("ERROR DECTECTED");
        //         console.log(e);
        //         // res.json({ success: false, message: e.message })
        //     } else {
        //         passport.authenticate("local")(req,res,()=>{
        //             console.log("AUTHENTICATION IS DONE HERE")
        //             res.status(201).json({Authenticated: true})
        //         })
        //     }
        // })

        console.log("END OF LOGIN");

    } catch (error) {
        console.log(" ERROR in SIGN IN ");
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}



// ******************* PASSPORT LOCAL AUTH ***********************




// ! SIGN UP

// export const signUp = async (req, res) => {

//     // const user = new User({
//     //     fistName: req.body.firstName,
//     //     lastName: req.body.lastName,
//     //     email:  req.body.email,
//     //     isTeacher: req.body.isTeacher
//     // })
    
//     console.log("THIS IS SIGN UP");

//     console.log(req.body);
//     // { fistName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, isTeacher: req.body.isTeacher }
//     try {
//         User.register( { fistName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, isTeacher: req.body.isTeacher } , req.body.password, (e,user) => {
//             if(e) {
//                 res.json({ success: false, message: e.message })
//                 console.log("ERROR IN SAVING USER");
//                 console.log(e);
//             } else {
//                 console.log("USER IS SAVED WALLAH");
//                 passport.authenticate("local")(req,res, () => {
//                     console.log("AUTHENTICATION IS DONE HERE")
//                     res.status(201).json({Authenticated: true});
//                 })

//             }
//         })

//         console.log("END OF REGISTER");

//     } catch (error) {
//         console.log(" ERROR IN SIGN UP ");
//         console.log(error);
//         res.status(404).json({ message: error.message });
//     }
// }

// // ! SIGN IN
// // async
// export const signIn = async (req, res) => { 
//     console.log("THIS IS SIGN IN");

//     const user = new User(req.body)

//         // email: req.body.email,
//         // password: req.body.password,

//     console.log(req.body);

//     try {
//         req.login(user, (e)=> {
//             if(e){
//                 console.log("ERROR DECTECTED");
//                 console.log(e);
//                 // res.json({ success: false, message: e.message })
//             } else {
//                 passport.authenticate("local")(req,res,()=>{
//                     console.log("AUTHENTICATION IS DONE HERE")
//                     res.status(201).json({Authenticated: true})
//                 })
//             }
//         })

//         console.log("END OF LOGIN");

//     } catch (error) {
//         console.log(" ERROR in SIGN IN ");
//         console.log(error);
//         res.status(404).json({ message: error.message });
//     }
// }

// export default router