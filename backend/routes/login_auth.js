const express = require("express");
const jwt = require('jsonwebtoken');

const router = express.Router();

const TOKEN_KEY = "H213123ds";


const verifiToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' '[1]);
    console.log(authHeader)
    if (token == null) return res.status(401).send('Token invalido');
    jwt.verify(token,TOKEN_KEY,(err, user) => {
        if (err) res.status(403).send('Token invalido');
        console.log(user)
        req.user = user;
        next();
    })
}



router.post("/auth",(req, res) => {
    const user = req.body.email;
    const password = req.body.password;
    const values = [user, password];
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        console.log(values)
        conn.query(
            "SELECT * FROM persona WHERE email = ? AND password = ?",
            values,
            (err, rows) => {
                if (err) return res.send(err);
                if (rows.length > 0) {
                    const actual = new Date()
                    const edad = (actual.getFullYear()-rows[0].fechaN.getFullYear())
                    console.log(edad)
                    const datos = {
                        id: rows[0].id,
                        email: rows[0].email,
                        nombre: rows[0].nombre,
                        apellido: rows[0].apellido,
                        sexo: rows[0].sexo,
                        fechaN: rows[0].fechaN,
                        edad: edad
                    };
                    const token = jwt.sign(
                        {
                            userId:datos.cedula,
                            email: datos.email
                        },
                        TOKEN_KEY,
                        {expiresIn: "1h"}
                    );
                    let nDatos = {...datos,token}
                    res.send(nDatos)
                }else{
                    res.send('Credenciales Incorrectas');
                }
            }
        );
    });
});

module.exports = router;
