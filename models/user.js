import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isTeacher: Boolean,
    authenticated : {type : Boolean, default : false},
    classes : {type : Array}
});

userSchema.plugin(passportLocalMongoose, { usernameField : 'email' } )

const User = mongoose.model('User', userSchema);

export default User;