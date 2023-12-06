import messageModel from "../models/messageModel.js";

export const createMessage = async (req,res)=>{
    try{
        const {chatId , senderId , text} = req.body
        const message = new messageModel({
            chatId , senderId , text
        })
        const newMessage = await message.save()
        return res.status(200).json({data:newMessage , message: 'Message created' , succes:true})

    }catch(error){
        console.log(error)
        return res.status(500).json({message:'no no' , error: error})
    }
}


export const getMessage = async (req , res) =>{
    try{
        const {chatId} = req.params
        console.log(chatId)
        const messages = await messageModel.find({chatId:chatId})
        console.log(messages)
        return res.status(200).json({data:messages , message: 'Message fetched' , succes:true})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:'no no' , error: error})
    }
}

