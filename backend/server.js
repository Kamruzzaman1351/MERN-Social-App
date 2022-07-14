const express = require("express")
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
        origin: "http://localhost:3000"
    }
})

io.on("connection", messageHandler)




app.use(errorHandler)

httpServer.listen(port, () => {
    console.log(`Server running at port: ${port}`)
})