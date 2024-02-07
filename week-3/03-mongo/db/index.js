const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Joydeep2810:joy209889@joydeep.adszdyo.mongodb.net/Course_selling');

//Creating the database (the stucture of the database)
// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purchasedCourse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    price:Number,
    imagelink:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}