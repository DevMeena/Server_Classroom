import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

const classSchema = mongoose.Schema({
    name: String,
    ownerId: String,
    ownerName: String,
    password: String,
    users : {type : Array}, //array of users who are joined to the class
    assignments : {type : Array}
});

// classSchema.plugin(passportLocalMongoose, { usernameField : 'email' } )

const Class = mongoose.model('Class', classSchema);

export default Class;