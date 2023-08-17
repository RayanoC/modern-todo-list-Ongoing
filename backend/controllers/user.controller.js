const userService = require('../services/user.service')

const signUpUser = async(req,res)=>{
    const {user_name, profile_picture, email, password} = req.body
    const result = await userService.createUser(user_name, profile_picture, email, password)
    res.json(result) 
}

const deleteAllUser = async(req, res)=>{
    const result = await userService.deleteAllUser()
    res.json(result)
}

const getAllUser = async(req, res)=>{
    const result = await userService.getAllUser()
    res.json(result)
}

const getProfile = async(req, res)=>{
    let result = await userService.getUserProfile(req.user.user_id)
    const host = req.get('host')
    result.profile_picture = "http://" + host + result.profile_picture
    res.json(result)
}

const uploadProfilePicture = async(req, res) =>{
    const user_id = req.user.user_id
    const profile_picture = req.file.destination.replace("./uploads","")+"/"+req.file.filename
    const result = await userService.updateUserProfilePicture(user_id, profile_picture)
    res.json(result)
}

module.exports = {
    signUpUser,
    deleteAllUser,
    getAllUser,
    getProfile,
    uploadProfilePicture
}
