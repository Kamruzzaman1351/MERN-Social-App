const express = require("express")
const path = require("path")
const dotenv = require("dotenv").config()
const { createServer } = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const { errorHandler } = require("./middleware/errorMiddleware.js")
const messageHandler = require("./eventListener/messageEvent")
const connectDB = require("./config/dbConnect")

connectDB()
const port = process.env.PORT || 3500
const app = express()

app.use(cors())
app.use(express.json({limit:"30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true }))

app.use("/api/users", require("./routers/userRouters.js"))
app.use("/api/feeds", require("./routers/feedRouters.js"))


// Connecting SocketIO
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "https://mernsocialappkam.herokuapp.com/"]
    }
})

io.on("connection", messageHandler)

// Serving Frontend
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")))
    app.get("*", (req, res) => {
        res.sendFile(
           path.resolve(__dirname, "../", "frontend", "build", "index.html") 
        )
    })
}


app.use(errorHandler)

httpServer.listen(port, () => {
    console.log(`Server running at port: ${port}`)
})