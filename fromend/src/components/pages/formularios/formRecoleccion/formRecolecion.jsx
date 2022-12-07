import { useState } from "react";
import Item_1 from './img/item-1.jpg';
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../../../../context/AuthContext";

export function FormRecoleccion() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        email: user.email,
        peso: "",
        altura: "",
        presion: "",
        frecuenciaCardiaca: "",
        frecuenciaRespiratoria: "",
        enfermedades: ""
    })

    const handleChange = async (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }
    let { peso, altura, presion, frecuenciaCardiaca, frecuenciaRespiratoria, enfermedades } = datos
    const onHandleSubmit = async () => {
        if (peso === "" || altura === "" || presion === "" || frecuenciaCardiaca === "" || frecuenciaRespiratoria === "" || enfermedades === "") {
            alert("hay un campo vacio")
        }
        const datosEvaluativos = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        }
        fetch("http://localhost:3001/datos/basicos",datosEvaluativos)
            .then(res => res.json())
            .then(res => console.log(res))
        
    }
    

    return (
        <div className="container">
            <div className="form">
                <div className="row">
                    <form className="col">
                        <div className="row">
                            <div className="col-5 p-1">
                                <label className="form-label">Peso</label>
                                <input name="peso" type="text" className="form-control" placeholder="Digite su peso" onChange={handleChange} required />
                            </div>

                            <div className="col-5 p-1">
                                <label className="form-label">  Altura </label>
                                <input name="altura" type="text" className="form-control" placeholder="Digite su altura" onChange={handleChange} required />
                            </div>

                            <div className="col-5 p-1">
                                <label className="form-label"> presion </label>
                                <input name="presion" type="text" className="form-control" placeholder="Digite su presion" onChange={handleChange} required />
                            </div>
                            <div className="col-5 p-1">
                                <label className="form-label">  frecuencia cardiaca </label>
                                <input name="frecuenciaCardiaca" type="text" className="form-control" placeholder="Digite su frecuencia cardiaca" onChange={handleChange} required />
                            </div>

                            <div className="col-5 p-1">
                                <label className="form-label">  frecuencia respiratoria </label>
                                <input name="frecuenciaRespiratoria" type="text" className="form-control" placeholder="Digite su frecuencia respiratoria" onChange={handleChange} required />
                            </div>
                            <div className="col-5 p-1">
                                <label className="form-label">Enfermedades o Alergias</label>
                                <textarea name="enfermedades" className="form-control" id="enfermedades" rows="3" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col p-2">
                            <button onClick={onHandleSubmit} type="submit" className="btn btn-primary">continuar</button>
                        </div>
                    </form>

                    <div className="col">
                        <div className="row">
                            <img src={Item_1} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};