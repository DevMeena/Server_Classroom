import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

const assignmentSchema = mongoose.Schema({
    name: String, 
    deadline : {type : Date},
    classId : String,
    users : {type : Array}  //id's of users who have yet to do these assignments
});

// userSchema.plugin(passportLocalMongoose, { usernameField : 'email' } )

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;