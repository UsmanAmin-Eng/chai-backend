import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponses} from "../utils/Apiresponces.js"
const registerUser = asyncHandler(async (req, res) => {
// get user detail from frontend
// validation - not empty
//  check the user is alreagy exists: username and email
// check for image, and check for avatar
// uploade them to cloudinary, avatar
// create the user object - create entry in db.
// remove the password and refresh token fiald from response
// check for user creation
// return resourse 

const{username,email,password, fullName} = req.body
    console.log("email: ", email);
    // validuction process
    if([fullName,email,username,password].some((field)=> field?.trim()==="")
    ){
       throw new ApiError(400,"fullName is required ");
    } 
    const existUser = User.findOne({
        $or: [{email},{username},]
    })
    if(existUser){
         throw new ApiError(409, "User with email or username is already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file  is required")

    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverimage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }
    const user = await User.create({  //// create the user object - create entry in db.
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refresToken"
    )
    if(createdUser){
        throw new ApiError(500,"something worng while registering the user")
    }
    return res.status(201).json(
        new ApiResponses(200,createdUser,"User register Successfully")
    )
});

export { registerUser };