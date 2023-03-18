const { Socket } = require('socket.io');
const {io} = require('./server');


const user = [];

const message = [];

io.on('connection', socket => {
    console.log(socket.id);

    socket.on("disconnect", () => {
        console.log(`Client saiu [id=${socket.id}]`);
    });

    socket.on('selectRoom', (data, callback) => {
        console.log(data);

        socket.join(data.room);

        const userRoom = user.find(user =>{
            user.user_name === data.userName && user.room === data.room
        });

        if (userRoom){
            user.room = socket.id;
        }else{
            user.push({
                room: data.room,
                userName: data.userName,
                id_user: socket.id,
            });
        };

        const status = {
            messages:getMessagesRoom(data.room),
            status:1
        } 
        callback(status);


        console.log(user);

    });

    socket.on('message', data => {

        console.log(data.room)

        message.push({
            room: data.room,
            userName: data.userName,
            message: data.message,
            cor: data.cor,
            createdAt: new Date(),
        });

        //console.log(message);

        io.to(data.room).emit('message', data);

    });

});

function getMessagesRoom(room) {
    const getMessagesRoom = message.filter(message => message.room === room);
    return getMessagesRoom;
}