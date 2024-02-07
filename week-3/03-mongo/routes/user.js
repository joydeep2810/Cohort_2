const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course} = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username= req.body.username
    const password= req.body.password 

    User.create({
        username:username,
        password:password
    })
    res.json({
        message: 'User created successfully'
    })
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const resposne = await Course.find({})
    res.json({
        Course:resposne
    })    
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: new mongoose.Types.ObjectId(courseId)
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic

    const user = await User.find({
        username:req.headers.username
    })
    console.log(user.purchasedCourses)

    const course=await Course.find({
        _id:({
            "$in":user.purchasedCourses
        })    
    })
    res.json({
        course:course
    })
});

module.exports = router