const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname,'../images'),
    filename: (req, file, cd) =>{
        cd(null, Date.now() + '-perfile-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.post('/images/post', fileUpload ,(req , res) => {

    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('ERROR DE SERVER')

        const type = req.file.mimetype
        const name = req.file.originalname
        const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))//datos 
        
        conn.query('INSERT INTO img set ?', [{name,type,data}] , (err, rows) => {
            if(err) return res.send('ERROR DE SERVER')
            res.send('image saved!')
        })
    })
    console.log(req.file) 
})

router.get('/images/get',(req , res) => {

    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('ERROR DE SERVIDOR')
        conn.query('SELECT * FROM img',(err, rows) => {
            if(err) return res.send('ERROR DE SERVER')
            //res.send('mostrado!')
            rows.map(img => {
                fs.writeFileSync(path.join(__dirname, '../dbimg/' + 'perfile.png'),img.data)
            })

            const imgDir = fs.readdirSync(path.join(__dirname, "../dbimg/"))
            res.json(imgDir)
            console.log(imgDir)
        })
    })
})


module.exports = router