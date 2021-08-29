import express from 'express';
import passport from 'passport';
import session from 'express-session';
import User from '../models/user.js';

const app = express();

app.use(session({
    secret: 'this is the secret code',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// const router = express.Router();



passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// ! START PAGE

export const startPage = (req,res) => {
    res.send('THis Works')
}

// require("./passportConfig")(passport);

// ! SIGN UP

export const signUp = async (req, res) => {

    // const user = new User({
    //     fistName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email:  req.body.email,
    //     isTeacher: req.body.isTeacher
    // })
    
    console.log("THIS IS SIGN UP");

    console.log(req.body);
    // { fistName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, isTeacher: req.body.isTeacher }
    try {
        User.register( { fistName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, isTeacher: req.body.isTeacher } , req.body.password, (e,user) => {
            if(e) {
                res.json({ success: false, message: e.message })
                console.log("ERROR IN SAVING USER");
                console.log(e);
            } else {
                console.log("USER IS SAVED WALLAH");
                passport.authenticate("local")(req,res, () => {
                    console.log("AUTHENTICATION IS DONE HERE")
                    res.status(201).json({Authenticated: true});
                })

            }
        })

        console.log("END OF REGISTER");

    } catch (error) {
        console.log(" ERROR IN SIGN UP ");
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const signIn = async (req, res) => { 
    console.log("THIS IS SIGN IN");

    const user = new User(req.body)

        // email: req.body.email,
        // password: req.body.password,

    console.log(req.body);

    try {
        req.login(user, (e)=> {
            if(e){
                console.log("ERROR DECTECTED");
                console.log(e);
                // res.json({ success: false, message: e.message })
            } else {
                passport.authenticate("local")(req,res,()=>{
                    console.log("AUTHENTICATION IS DONE HERE")
                    res.status(201).json({Authenticated: true})
                })
            }
        })

        console.log("END OF LOGIN");

    } catch (error) {
        console.log(" ERROR in SIGN IN ");
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}