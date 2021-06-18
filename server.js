const express = require('express')
const app = express()
const http = require('http').createServer(app)



app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html')
   //res.send('main route hit')
})
 
app.get('/board',function(req,res){
    res.sendFile(__dirname+'/board/board.html')
})

app.get('/notes',function(req,res){
    res.sendFile(__dirname+'/notes/notes.html')
})
app.get('/chat',function(req,res){
    //res.send('welcome to chat page')
    res.sendFile(__dirname+'/chat-app/chat.html')
})
app.get('/video-call',function(req , res){
    res.sendFile(__dirname+'/video.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})


const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})