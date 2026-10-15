import { asyncHandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../model/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponses } from '../utils/Apiresponces.js';

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body;

  if ([fullName, email, username, password].some((field) => typeof field !== 'string' || field.trim() === '')) {
    throw new ApiError(400, 'Full name, email, username and password are required');
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username: username.toLowerCase() }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User with email or username already exists');
  }
  console.log(req.files)

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar file is required');
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select('-password -refreshToken');
  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  return res.status(201).json(new ApiResponses(201, createdUser, 'User registered successfully'));
});

export { registerUser };