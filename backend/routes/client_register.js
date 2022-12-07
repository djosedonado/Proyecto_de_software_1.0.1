const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyB550jkawqRhuQUViXPZ01Weu-sLzB_nJ4",
    authDomain: "nutrisoft-89f7e.firebaseapp.com",
    databaseURL: "https://nutrisoft-89f7e-default-rtdb.firebaseio.com",
    projectId: "nutrisoft-89f7e",
    storageBucket: "nutrisoft-89f7e.appspot.com",
    messagingSenderId: "907547230193",
    appId: "1:907547230193:web:9643abdcc7b6b3bf46ce50",
    measurementId: "G-6QT3Z2MN4X"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
const auth = getAuth(fire);


const { createUserWithEmailAndPassword } = require('firebase/auth');
const express = require('express');


const cliente = express.Router()

cliente.post('/register', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        const person = {
            nombre: req.body.nombre,
            apellido : req.body.apellido,
            email: req.body.email,
            pass: req.body.pass,
            sexo: req.body.sexo,
            fechaN: req.body.fechaN,
            idroles: req.body.idRoles,
            idMenbrecia: parseInt(req.body.idMenbrecia,5)
        }
        console.log("---------------------")
        console.log(person)
        console.log("---------------------")

        conn.query('INSERT INTO persona SET ?', person, (err, rows) => {
            if (err) return res.send(err)
            createUserWithEmailAndPassword(auth,req.body.email,req.body.pass)
            res.send('Ejecucion Exitosa')
        })
        //final
        
    })
})

cliente.post('/register/tarjeta', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        const datosTarjeta = {
            email: req.body.email,
            numero: req.body.numero,
            nombre: req.body.nombreTarjeta,
            cvv: req.body.cvv,
            fechaExpiracion: req.body.fechaExpiracion
        }

        console.log("---------------------")
        //console.log(req.body)
        console.log(datosTarjeta)
        console.log("---------------------")

        conn.query('INSERT INTO tarjeta set ?',datosTarjeta, (err, rows) => {
            if (err) return res.send(err)
            res.send('Ejecucion Exitosa')
        })
        
    })
})


module.exports = cliente;