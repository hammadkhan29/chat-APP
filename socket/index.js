import { Server } from "socket.io";

const io = new Server({ cors:"http://localhost:3000" });

let activeUserList = []
io.on("connection", (socket) => {
    console.log('socket new',socket.id)

    socket.on('addNewUser', (userId)=>{
        !activeUserList.some((user)=>user.userId === userId) &&
        activeUserList.push({
            userId,
            socketId:socket.id
        })
        console.log('online users',activeUserList)

        io.emit('getOnlineUser' , activeUserList)
    })

    socket.on("sendMessage" , (message)=>{
        console.log("message",message)
        const user = activeUserList.find(user => user.userId === message.recipientId)
        if(user){
            io.to(user.socketId).emit("getMessage" , message)
            io.to(user.socketId).emit("getNotification" , {
                senderId : message.senderId,
                isRead : false ,
                date : new Date()
            })
        }
    })
    socket.on('disconnect' , ()=>{
        activeUserList = activeUserList.filter(user => user.socketId !== socket.id)

        io.emit('getOnlineUser' , activeUserList)
    })
});

io.listen(4000);