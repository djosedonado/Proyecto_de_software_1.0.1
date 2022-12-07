const { Router } = require('express')
const express = require('express')
const { route } = require('./client_register')


const ruta = express.Router()


ruta.post('/basicos', (req, res) => {
    req.getConnection((err,conn) =>{
        if(err) return res.send(err);
        console.log("-----------------------")
        console.log(req.body)
        console.log("-----------------------")
        const datos = {
            email: req.body.email,
            peso: req.body.peso,
            altura: req.body.altura,
            presion: req.body.presion,
            frecuenciaC: req.body.frecuenciaCardiaca,
            frecuenciaR: req.body.frecuenciaRespiratoria,
            alergias: req.body.enfermedades
        }
        conn.query('INSERT INTO datosbasicos set ?',datos,(err, rows) =>{
            if(err) return res.send(err)
            console.log("Registro exitoso")
        })
    })
})



module.exports = ruta;