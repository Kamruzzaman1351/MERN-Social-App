const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const { errorHandler } = require("./middleware/errorMiddleware.js")
const connectDB = require("./config/dbConnect")

connectDB()
const port = process.env.PORT || 3500
const app = express()

app.use(cors())
app.use(express.json({limit:"30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true }))

app.use("/api/users", require("./routers/userRouters.js"))
app.use("/api/feeds", require("./routers/feedRouters.js"))




app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
})