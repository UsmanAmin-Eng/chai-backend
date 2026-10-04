import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'; 
 const videoSchema = new mongoose.Schema({

    videofile: {
        type: String, // cloudinary url
        required: true,
    },
    Thumbnail: {
        type: String, // cloudinary url
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },

 },
 {timestamps:true})
 videoSchema.plugin(mongooseAggregatePaginate);

 export const Video = mongoose.model('Video', videoSchema);
//payload is used to inject the any data like(email and and anything) it include in jsonwebtoken.
//the josonwebtoken is used to create a token by using the payload/algorthim and secret key and it is used to verify the user and it is used to protect the routes.
//the Secret is used to secre the token and it is used to verify the token and it is used to protect the routes.it include or part of the jsonwebtoken.


