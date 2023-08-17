const router = require("express").Router();
const { extname } = require("path");
const { deleteAllUser, getAllUser, getProfile, signUpUser, uploadProfilePicture} = require("../controllers/user.controller");
const { ErrorHandler } = require("../helper/error");
const authorization = require("../middleware/authorization");
const { existsSync, mkdirSync, readdir, rmdirSync, rmSync } = require('fs')
const multer = require('multer')
const storage = multer.diskStorage(
        {
            destination: (req, file, cb) =>{
                const user_id = req.user.user_id
                console.log(user_id,"user_id")
                const uploadPath = "./uploads/profile-picture/"+ user_id 
                if (!existsSync(uploadPath)) {
                    console.log("mkdiradadad")
                    mkdirSync(uploadPath);
                }
                else{
                    readdir(uploadPath,function(err, files){
                        if(err){
                            throw new ErrorHandler(500,err)
                        }
                        console.log(files, "files")
                        if(extname(file.originalname) != extname(files[0])){
                            const temp = uploadPath+"/"+files[0]
                            rmSync(temp,{ recursive: true, force: true })
                        }
                    })
                }
                console.log(uploadPath, "up")
                cb(null, uploadPath)
            },
            filename: (req, file, cb) => {
                const user_id = req.user.user_id
                const fileExtension = extname(file.originalname)
                const fileName = user_id+fileExtension+""
                cb(null, fileName)
            }
        }
    )
    
const upload = multer(
    {
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                cb(null, true);
            } else {
                cb(new ErrorHandler(500,"Unsupported file type"+ extname(file.originalname)), false)
            }
        },
        storage: storage,
        limits :{fileSize: 5000000}
    })

router
    .route("/")
    .post(signUpUser)
    .delete(deleteAllUser)
    .get(getAllUser)


router
    .route("/profile")
    .get(authorization,getProfile)
    .post(authorization,
        upload.single('profile_picture'),
        uploadProfilePicture)

module.exports = router