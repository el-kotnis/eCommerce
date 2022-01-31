const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//register a new user => /api/v1/register
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id:'avatar/akaskdjkj',
            url:'https://cdn.pixabay.com/photo/2016/02/28/12/55/boy-1226964__340.jpg'
        }
    })

    const token = user.getJwtToken()

    res.status(201).json({
        status:true,
        token
    })
})