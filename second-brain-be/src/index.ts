import 'dotenv/config'
import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { userModel } from './models/user.model.js'
import { dbConnect } from './db/db.js'
import { contentModel } from './models/content.model.js'
import { SECRET_KEY } from './config/config.js'
import {authMiddleware } from './middleware/auth.middleware.js'
import { linkModel } from './models/link.model.js'
import { generateRandom } from './utils/utils.js'
import { tagModel } from './models/tag.model.js'
import { flattenError, z } from 'zod'
import { safeCreateContentSchema, safeSignInSchema, safeSignUpSchema } from './zod.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({  
    origin : 'http://localhost:5173',
    credentials : true
}))


app.post('/api/v1/signup', async(req , res) => {
   const parsedBody = safeSignUpSchema.safeParse(req.body)

   if(!parsedBody.success){
        return res.status(400).json({
            message: "Incorrect Format",
            errors: z.flattenError(parsedBody.error).fieldErrors
        })
   }
   
   const { email , password , username} = parsedBody.data;     // not from the req.body for more safety, but from parsedBody.data
    const hashPassword = await bcrypt.hash(password , 5)
    try{
        await userModel.create({
            username : username,
            email : email,
            password : hashPassword
        })
        
        res.status(200).json({
            message : " Signed up successfully!! "
        })
    }
    catch(err: any){
        if(err.code === 11000){

            if(err.keyPattern?.username){
                res.status(409).json({
                message : "Username already taken !!"
                })        
            }

            if(err.keyPattern?.email){
                res.status(409).json({
                message : " User already exists !"
                })        
            }

        }

        res.status(409).json({
            error: err.message,
            message : "Internal Server Error"
        })
    }
})

app.post('/api/v1/signin', async (req , res) => {
    const parsedBody = safeSignInSchema.safeParse(req.body)

    if(!parsedBody.success){
        return res.status(400).json({
            message: "Incorrect format",
            errors: flattenError(parsedBody.error).fieldErrors,
        })
    }
    
    const { email , password } = parsedBody.data;
    const response = await userModel.findOne({
        email : email
    })    

    if(!response){
        res.status(404).json({
            message : "User doesn't exists"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password , response.password)
   
    if(!passwordMatch){
        res.status(401).json({
            message : "Invalid Credentials"
        })
        return
    }

    const token =  jwt.sign({
        id : response._id
        
    } , SECRET_KEY || '' )
    
    const {password: _pwd, _id: __id, __v: ___v, ...userSafe } = response?.toObject()
    res.cookie("accessToken" , token)

    res.status(200).json({
        user: userSafe,
        message : "Signin successful"
    })

})

app.get('/api/v1/signout', authMiddleware, async (req , res) => {
    res.clearCookie("accessToken");
    return res.json({
        message: "User logged out"
    });
})

app.get('/api/v1/auth/me' , authMiddleware , async (req , res) => {
    const userId = (req as any).id
    const user = await userModel.findOne({
        _id: userId
    })
    if(!user){
        return res.status(404).json({
            message: "User not found!"
        })
    }
    const {password: _pwd, _id: __id, __v: ___v, ...userSafe } = user?.toObject()
    
    return res.json({
        user: userSafe,
        message : "Valid User"
    })
})

app.post('/api/v1/content',authMiddleware, async (req , res) => {       //create content
    console.log("first")
    const parsedBody = safeCreateContentSchema.safeParse(req.body)
    
    if(!parsedBody.success){
        return res.json({
            errors: flattenError(parsedBody.error).fieldErrors,
            message: "Incorrect format"
        })
    }
    
    const {link, title, type, tags} = parsedBody.data
    console.log(tags)
    const userId = (req as any).id

    const tagsId = await Promise.all(tags.map(async (tagName) => {
        const tag = await tagModel.findOne({
            title: tagName
        })
        if(tag){
            return tag._id;
        }
        else{
            const tagCreated = await tagModel.create({
                title: tagName
            })
            return tagCreated._id;
        }
    })
)

    
    await contentModel.create({
        link : link,
        title : title,
        type : type,
        userId : userId,
        tags : tagsId
    })    

    res.status(200).json({
        message : "Content Added !!"
    })

})

app.get('/api/v1/content',authMiddleware, async (req , res) => {        //get content
    const userId = (req as any).id
    const content = await contentModel.find({
        userId : userId
    }).populate("userId" , "username").populate("tags", "title")  

    res.status(200).json({
        message : "Content Fetched !!",
        All_content : content
    })

})

app.delete('/api/v1/content/:id',authMiddleware , async (req , res) => {    //delete content
    const id  = req.params.id
    const userId = (req as any).id

        const content = await contentModel.findOneAndDelete({       //deleteOne directly deletes the content but findOneAndDelete returns the content first and then delete it
            _id : id,
            userId : userId
        })
        
        if(!content){
            return res.status(404).json({
                message: "The content you are trying to delete doesn't exists!!"
            })
        }
        
        res.status(200).json({
            deletedContent : content,
            message : "Content deleted !!"
        })
})

app.get('/api/v1/content/tags', authMiddleware, async(req, res) => {    // fetching tags for recommendation
    try{
        const tags = await tagModel.find()
    //     const formattedTags = tags.map((tagsName) => ({
    //         label: tagsName,
    //         value: tagsName
    // }))
    console.log(tags)
        res.json({
            tags: tags
        })
    }catch(error){
        res.status(500).json({
            message : "Error fetching tags"
        })
    }
})

app.post('/api/v1/brain/share' ,authMiddleware ,async (req , res) => { 
    const { share } = req.body;  
    const userId =  (req as any).id;
    if(share){
        const existingLink = await linkModel.findOne({userId : userId}) 
        if(existingLink){
            return res.json({
                message : `Your link ${existingLink.hash}`
            })    
        }

        const link = await linkModel.create({
            hash : generateRandom(10),
            userId : userId
        })
        return res.json({
            message : `Your link ${link.hash}`
        })
    }
    else{
        await linkModel.deleteOne({
            userId : userId
        })
        return res.json({
            message : "sharable link deleted"
        })
    }
})

app.get('/api/v1/brain/:shareLink' , async (req , res) => {
    const hash = req.params.shareLink;
    console.log('first')
    const link = await linkModel.findOne({
        hash : hash
    })

    if(!link){
        return res.json({
            message : "Sorry incorrect input"
        })
    }
    
    const content = await contentModel.find({
        userId : link.userId
    })

    const user = await userModel.findOne({
        _id : link.userId
    })
    
    if(!user){
        return res.json({
            message : "user not found, error should ideally not happen"
        })
    }

    return res.json({
        username : user.username ,
        content : content
    })

})


async function main(){
    await dbConnect()
// sync all model indexes 
    await userModel.syncIndexes()
    await contentModel.syncIndexes()
    await linkModel.syncIndexes()
    await tagModel.syncIndexes()
    
    app.listen(3000 ,() => {
        console.log("DB connected and Server is running on the port 3000")
    })
}

main()  