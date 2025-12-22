import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
   title : { type : String }
})

export const tagModel = mongoose.model('tag' , tagSchema)