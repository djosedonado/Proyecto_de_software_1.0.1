const { Router } = require('express')
const express = require('express')
const { route } = require('./client_register')


const ruta = express.Router()


ruta.post('/basicos', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        console.log("-----------------------")
        console.log(req.body)
        console.log("-----------------------")
        const datos = {
            email: req.body.email,
            peso: parseFloat(req.body.peso),
            altura: parseFloat(req.body.altura),
            presion: parseFloat(req.body.presion),
            frecuenciaC: parseFloat(req.body.frecuenciaCardiaca),
            frecuenciaR: parseFloat(req.body.frecuenciaRespiratoria),
            alergias: req.body.enfermedades
        }
        console.log(datos)
        conn.query('INSERT INTO datosbasicos set ?', datos, (err, rows) => {
            if (err) return res.send(err)
            console.log("Registro exitoso")
        })
    })
})

ruta.get('/basicos/:email', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        console.log(req.params)
        conn.query("SELECT datosbasicos.id,persona.email,peso,altura,presion,frecuenciaC,frecuenciaR,alergias,sexo,fechaN FROM datosbasicos INNER JOIN persona ON datosbasicos.email=persona.email where persona.email=?"
            , req.params.email, (err, rows) => {
                if (err) return res.send(err)
                res.send(rows)
            })
    })
})



module.exports = ruta;