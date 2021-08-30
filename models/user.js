import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'
import findOrCreate from 'mongoose-findorcreate'

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isTeacher: Boolean,
    googleId: String,
    authenticated : {type : Boolean, default : false},
    classes : {type : Array}
});

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate);

// { usernameField : 'email' }

const User = new mongoose.model('User', userSchema);

export default User;