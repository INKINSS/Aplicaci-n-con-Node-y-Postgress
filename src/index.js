const express = require('express')
const morgan = require('morgan')
const taskRoutes = require('./routes/task.routes')
const cors = require('cors')


const app = express();
const PORT = 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'POST',
    methods: 'DELETE',
    methods: 'PUT'
}))

app.use(taskRoutes)


app.use( (err, req, res, next)=> {
    return res.json({
        "message": err.message
    })
} )

app.listen(PORT);