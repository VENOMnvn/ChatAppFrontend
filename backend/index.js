const express = require("express");
const cors = require("cors");
const connectdb = require("./config/connectdb.js");
const routes = require("./routes/routes.js");
const cookieParser = require("cookie-parser");
const User = require("./MongoDB/UserSchema.js");
const app = express();
const port = process.env.PORT || 5000;
let socketUsers = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DataBase Connection
connectdb();

const socketUserCheck = (username)=>{
  let status = false;
  socketUsers.forEach(user=>{
    if(user.userId == username){
      status = true;
    }
  })
  return status;
}


app.get("/", (req, res) => {
  res.send("working v.1.8");
});
app.get("/check-online-user",(req,res)=>{
  const user = req.query;
  const status = socketUserCheck(user.user);
  res.send(status);

})
app.use(routes);

const server = app.listen(port, () => {
  console.log(`run on the ${port}`);
});

//WebSocket using SOCKET IO
const io = require("socket.io")(server, {
  cors: "*",
});

const addSocketUser = (userId,socketId)=>{
    !socketUsers.some((user)=>user.userId == userId) && socketUsers.push({userId,socketId});
}

const removeSocketUser = (socketId)=>{
  socketUsers = socketUsers.filter(user => user.socketId != socketId);
  console.log(socketUsers);
}

io.on('connection',(socket,arg)=>{
  
  socket.on('setup',(id)=>{
    socket.join(id);
    addSocketUser(id,socket.id);
    console.log(id + ' connected');
    socket.emit('connected');
  });

  socket.on('disconnect',()=>{
    console.log("disconnected " + socket.id);
    removeSocketUser(socket.id);
  });

  socket.on('message-send',(msgObj)=>{
    socket.to(msgObj.username).emit('message-recieved',msgObj);
  });

  socket.on('typing-recived',(data)=>{
    socket.to(data.username).emit('typing-send',data);
  });

  socket.on('check-online-status',(data)=>{
    const status = socketUserCheck(data.username);
    console.log("check-data",data);
    socket.to(data.checker).emit('send-online-status',{
      user : data.username,
      status,
      checker : data.checker
    });
  })
});

