const express = require('express');
const mysql = require('mysql');
const myconnection = require('express-myconnection')
const cors = require('cors')
const path = require('path')

//call to require
const registerClient = require('./routes/client_register')
const initLoading = require('./routes/login_auth')
const perfileClient = require('./routes/perfile')
const registrosBasicos = require('./routes/registros_basicos')
// create constant function to express
const app = express();
app.set('port', process.env.PORT || 3001)

const database = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'nutrisoft'
}
//middleware----------------------------------------------
app.use(myconnection(mysql,database,'single'))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'dbimg')))

//cell the Router--------------------------------------------------------
app.use('/inform',registerClient)
app.use('/login',initLoading)
app.use('/perfile',perfileClient)
app.use('/datos',registrosBasicos)

//Init of server
app.listen(app.get('port'), () => {
    console.log(`Sever connect in port ${app.get('port')}`)
})