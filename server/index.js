
const server = require("./src/app")
const PORT = process.env.PORT || 3000




    try {
                server.listen(PORT, () => {
                console.log(`Servidor levantado y escuchando en el puerto ${PORT}`)
            }
        )
    } catch (error) {
        console.error(error.message)
    }
