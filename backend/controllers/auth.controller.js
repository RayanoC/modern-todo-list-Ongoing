const dayjs = require("dayjs")
const authService = require("../services/auth.service")


const signInUser = async(req,res)=>{
    const result = await authService.signIn(req.body)
    const dateNow = dayjs(Date.now())
    
    const cookieOption = {
        httpOnly: true,
        expires: new Date(dateNow.add(1, 'day')),
        secure: true,
        sameSite: 'none',
    }
    res.cookie("refresh_token", result.refreshToken, cookieOption)
    res.json({access_token:result.accessToken}) 
}

const refreshToken = async(req,res)=>{
    
    const result = await authService.refreshToken(req.cookies.refresh_token)
    const dateNow = dayjs(Date.now())
    const cookieOption = {
        httpOnly: true,
        expires: new Date(dateNow.add(1, 'day')),
        secure: true,
        sameSite: 'none',
    }
    res.cookie("refresh_token", result.refreshToken, cookieOption)
    res.json({access_token:result.accessToken}) 
}

module.exports = {
    signInUser,
    refreshToken
}