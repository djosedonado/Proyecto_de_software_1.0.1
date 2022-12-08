import { useState, useEffect } from "react";
import { useAuth } from '../../../../context/AuthContext';

export function FormConsul() {
    const { user } = useAuth()
    const [consul, setConsul] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/datos/basicos/${user.email}`)
            .then(res => res.json())
            .then(res => setConsul(res))
            .catch(err => {
                console.log(err)
            })
    })
    
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">peso</th>
                                <th scope="col">altura</th>
                                <th scope="col">Presion</th>
                                <th scope="col">Frecuencia Cardiaca</th>
                                <th scope="col">Frecuencia Respiratoria</th>
                                <th scope="col">Enfermedades o Alergias</th>
                                <th scope="col">Gastos Energetico Basal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consul.map(datos => (
                                <tr key={datos.id}>
                                    <th>{datos.id}</th>
                                    <th>{datos.peso}</th>
                                    <th>{datos.altura}</th>
                                    <th>{datos.presion}</th>
                                    <th>{datos.frecuenciaC}</th>
                                    <th>{datos.frecuenciaR}</th>
                                    <th>{datos.alergias}</th>
                                    <th>{}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    );
}