const { Router } = require("express");
const jwt = require("jsonwebtoken")
const { jwtpassword }=require("../config")
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin,Course } = require("../db")

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password= req.body.password
    
    Admin.create({
        username:username,
        password:password
    })
    .then(function(){
        res.json({
            message: 'Admin created successfully'
        })
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password= req.body.password
    
    Admin.findOne({
        username:username
    })
    const token =jwt.sign({username:username},jwtpassword)

    
    res.json({
        token:token
    })

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description=req.body.description
    const price=req.body.price
    const imageLink=req.body.imageLink

    const course = await Course.create({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    })

    res.json({
        message: 'Course created successfully', courseId: course._id
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const allcourse = await Course.find({})
    res.json({
        course:allcourse
    })
    
});

module.exports = router;