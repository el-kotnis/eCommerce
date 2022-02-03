const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')

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

    sendToken(user,200,res);
})

//login user -> /api/v1/login
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const { email, password } = req.body;

    //checks if email and pword is entered user
    if(!email||!password){
        return next(new ErrorHandler('Please enter email and password',400))
    }

    //find user in database
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401))
    }

    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401))
    }

    sendToken(user,200,res);
})

//logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})