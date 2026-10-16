const {
    NODE_ENV,
    CLIENT_URL,
} = process.env
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const routes = require("./routes/index")


const server = express()
server.use(bodyParser.urlencoded({limit: "50mb", extended: true}))
server.use(bodyParser.json({limit: "50mb"}))
server.use(morgan("dev"))
server.use(cookieParser())
server.use((req,res,next) =>{
    res.header("Access-Control-Allow-Credentals", "true")
    res.header("Access-Control-Allow-Origin", NODE_ENV === "producction" ? CLIENT_URL : "*")
    res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type,X-Requested-With")
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, GET, DELETE")
   next()
})

server.use("/" , routes)


server.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message || "Internal Server Error"

    if(status === 500) {
        console.error(`[ERROR] ${req.method} ${req.url}: ${err.message}, ${err.stack}`)
    }
    res.status(status).json({
        error: true,
        message: message,
        stack: NODE_ENV === "development" ? err.stack : undefined
    })
})


module.exports = server