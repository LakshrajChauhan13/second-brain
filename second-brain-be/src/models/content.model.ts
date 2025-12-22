import mongoose from 'mongoose'

const contentTypes = ['Image', 'Video', 'Article', 'Audio', 'Tweet']; 

const contentSchema = new mongoose.Schema({
    link : {type : String , required: true},
    type : {type: String , enum: contentTypes },  //required: true
    title : {type: String , required: true},
    tags : [{type: mongoose.Schema.Types.ObjectId , ref: "tag"}],
    userId : {type: mongoose.Schema.Types.ObjectId , required: true , ref: "user" } //required: true
})

export const contentModel = mongoose.model('content' , contentSchema)