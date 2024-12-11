const express = require('express')
const logsRouter = require('./router/LogsRouter');


const app= express();

app.use(express.json())

var port = 5000;

app.use('/logs',logsRouter)



app.listen(port,()=>{
    console.log('Ejecutando en puerto', port)
})

