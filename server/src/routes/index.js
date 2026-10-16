const {Router} = require("express")


const mainRouter = Router()


mainRouter.get("/", (req, res) => {
    res.status(200).json({
        message: "Bienvenido, el servidor está levantado"
    })
})



module.exports = mainRouter