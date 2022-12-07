import React, { fragment, useState, useEffect } from "react";
import "./Micuenta.css"
import { useAuth } from '../../../../context/AuthContext';

export function Micuenta() {
    const { user } = useAuth()
    const [file, setFile] = useState(null)
    const [imgList, setImgList] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/perfile/images/get')
            .then(res => res.json())
            .then(res => setImgList(res))
            .catch(err => {
                console.log(err)
            })
    }, [])
    const selectHandler = e => {
        setFile(e.target.files[0])
    }

    const sendHandler = () => {
        if (!file) {
            alert("Seleccione un archivo")
            return
        }
        const formdata = new FormData()
        formdata.append("image", file)

        fetch('http://localhost:3001/perfile/images/post', {
            method: 'POST',
            body: formdata,
        })
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
            })
        document.getElementById('fileinput').value = null

        setFile(null)
    }

    let { displayName, email } = user.reloadUserInfo

    return (
        <fragment>
            <div className="container mt-5">
                <div className="container_img">
                    <div className="row">
                        <div className="col" id='imgPerfile'>
                            {imgList.map(img => (
                                <div key={img} className="foto_perfil card">
                                    <img src={'http://localhost:3001/' + img} alt="perfil" className="foto_perfil" />
                                </div>
                            ))}
                        </div>
                        <div className="col text-center">
                            <br />
                            <br />
                            <br />
                            <label htmlFor="nombre" className="from-label">{displayName}</label>
                            <br />
                            <br />
                            <label htmlFor="email" className="from-label">{email}</label>
                        </div>
                        <div className="col">

                        </div>
                        <div className="caja_select card p-2">
                            <div className="row">
                                <div className="selector col-sm-5">
                                    <input id="fileinput" className="form-control" type="file" onChange={selectHandler} />
                                </div>
                                <div className="boton_selector col-3">
                                    <button onClick={sendHandler} className="btn btn-primary" type="button">subir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fragment>
    );
}
