import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import passportLocalMongoose from 'passport-local-mongoose'

import User from '../models/user.js';

const app = express();
const router = express.Router();

app.use(session({
  secret: 'this is the secret code',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
// require("./passportConfig")(passport);

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// ! START PAGE

export const startPage = (req,res) => {
    res.send('THis Works')
}

// ! SIGN UP

export const signUp = async (req, res) => { 
    // const user = new User({
    //     fistName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email:  req.body.email,
    //     isTeacher: req.body.isTeacher
    // })

    const usr = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(usr);

    // const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })
    console.log(req.body);
    const newUser =  new User(usr);
    try {
        // const user = await User.find();
        User.register({ fistName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, isTeacher: req.body.isTeacher }, req.body.password, (e,user) => {
            if(e) {
                res.json({ success: false, message: e.message })
                console.log("ERROR IN SAVING USER");
                console.log(e);
            } else {
                console.log("USER IS SAVED WALLAH");
                // res.json({ success: true, message: "Your account has been saved" })
                passport.authenticate("local")(req,res, () => {
                    console.log("AUTHENTICATION IS DONE HERE")
                    res.status(201).json({Authenticated: true});
                    // res.redirect('/dashboard')
                })

            }
        })

        console.log("END OF REGISTER");
                
        // passport.authenticate("local")(req,res,()=>{
        //     console.log("hola is created");
        // })
        // console.log("here");
        // await newUser.save()
        // .then(()=>{
        //     console.log("USR IS SAVED");
        //     res.status(201).json(newUser);
        // })
        // .catch(e=> console.log("error"));
            // console.log("USR IS SAVED");
            // res.status(201).json(newUser);
        

    } catch (error) {
        console.log("this is the biggest error ");
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

// app.post("/signup",(req,res)=>{
//     User.register({username: req.body.username}, req.body.password, (e,user)=>{
//         if(e){
//             console.log(e);
//             res.redirect("/signup")
//         } else {
//                 passport.authenticate("local")(req,res,()=>{
//                 res.redirect("/lists")
//             })
//         }
//     })
// })