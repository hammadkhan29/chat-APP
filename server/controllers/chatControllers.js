import chatModel from "../models/chatModel.js"

export const createChat = async (req , res) =>{
    try{
        const {firstId , secondId} = req.body

        const chat = await chatModel.findOne({
            members:{$all : [firstId,secondId]}
        })

        if(chat){
            return res.status(200).json({chat:chat , message: 'Chat exists' , succes:true})
        }

        const newChat = new chatModel({
            members: [firstId,secondId]
        })
        const response = await newChat.save()

        return res.status(200).json({chat:response , message: 'Chat created' , succes:true})

    }catch(error){
        console.log(error)
        return res.status(500).json({message:'no no' , error: error})
    }
};


export const findUserChats = async (req , res) =>{
    const userId = req.params.userId
    try{
        const chats = await chatModel.find({
            members:{$in : [userId]}
        })
        return res.status(200).json({chats:chats , message: 'Chat retrieved' , succes:true})

    }catch(error){
        console.log(error)
        return res.status(500).json({message:'no no' , error: error})
    }
}

export const findChats = async (req , res) =>{
    const {firstId , secondId} = req.params
    console.log(firstId)
    console.log(secondId)
    try{
        const chat = await chatModel.findOne({
            members: {$all : [firstId,secondId]}
        })

//        if (chat){
        return res.status(200).json({chat:chat , message: 'Chat found' , succes:true})
  //      }
//        return res.status(200).json({ message: 'Chat does not exist' , succes:true})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:'no no' , error: error})
    }
}