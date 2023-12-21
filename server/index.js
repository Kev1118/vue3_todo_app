const express = require('express')
const cors = require('cors')

const db = require('./models')

const app = express()

app.use(cors())
app.use(express.json())

//router
const todoRouter = require('./routes/todoRouter')
app.use('/api/todo', todoRouter)
const AuthRouter = require('./routes/authRouter')
app.use('/api/auth', AuthRouter)
const Quiz = require('./routes/QuizeRouter')
app.use('/api/quiz', Quiz)


const PORT = process.env.PORT || 3001
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    })
    
})
