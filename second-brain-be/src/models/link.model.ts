import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
    hash : {type: String , required: true , trim: true},
    userId : {type: mongoose.Schema.Types.ObjectId , required: true , ref: "user" , unique : true}
})

export const linkModel = mongoose.model('link' , linkSchema)