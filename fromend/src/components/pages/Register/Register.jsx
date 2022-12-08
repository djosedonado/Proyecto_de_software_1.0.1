import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css";
import Logo from '../../img/LogoHeader.png';

const validaciones = () => {
    
    const password = document.getElementById("pass")
    const form = document.getElementById("formulario")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        if(password.nodeValue.length <= 6){
            alert("La contraseña debe tener mas de 6 digitos")
        }
    })
}

export function Register() {
    //validaciones()
    //const { signup } = useAuth();
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        email: "",
        pass: "",
        sexo: "",
        fechaN: "",
        idMenbrecia: "",
        idRoles: 1,
        numero: "",
        nombreTarjeta: "",
        cvv: "",
        fechaExpiracion: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = async (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    let { nombre, apellido, email, pass, sexo, fechaN, fechaExpiracion } = user
    const handleSubmit = async () => {
        try {
            //if (nombre === "" || apellido === '' || email === "" || pass === "" || sexo === "" || fechaN === "dd/mm/aaaa" || fechaExpiracion === "") return alert("Los campos estan vacios")
            const datosBasicos = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }
            fetch('http://localhost:3001/inform/register', datosBasicos)
                .then(res => res.json())
                .then(res => console.log(res))

            fetch('http://localhost:3001/inform/register/tarjeta', datosBasicos)
                .then(res => res.json())
                .then(res => console.log(res))

            //await signup(email,password)
            navigate("/");

        } catch (e) {
            setError(e.message);
            alert(error)
        }

    }

    return (
        <div className="container">
            <div className="row">
                {/*------------------titulo y logo------------------------ */}
                <div className="text-center">
                    <p><img src={Logo} alt="logo" /></p>
                    <h1>Registrate Ahora</h1>
                </div>
                {/*----------Inicio de la Columna del Formmulario------------------------- */}
                <div className="col">
                    <h2>Datos Personales</h2>
                    <form className="formulario" id="formulario">
                        {/*------------ Nombre y Apellido ----------------------- */}
                        <div className="mb-2 row">
                            <div className="mb-2 col-5">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleChange} />
                            </div>
                            <div className="mb-2 col-5">
                                <label htmlFor="surName" className="form-label">Apellido</label>
                                <input type="text" className="form-control" id="apellido" name="apellido" onChange={handleChange} />
                            </div>
                        </div>
                        {/*-------------------Correo Y contraseña cajas de texto ------------------ */}
                        <div className="mb-2 col-6">
                            <label htmlFor="email" className="form-label">Correo Electronico</label>
                            <input type="email" name="email" id="email" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="mb-2 col-6">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" name="pass" id="pass" onChange={handleChange} required/>
                        </div>
                        {/*----selector de sexo y fecha de nacimiento----------------------*/}
                        <div className="mb-2 row">
                            <div className="col-3">
                                <label htmlFor="sexo" className="form-label">Sexo</label>
                                <select name="sexo" id="sexo" className="form-select" onChange={handleChange}>
                                    <option value="">Selecionar</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <label htmlFor="date" className="form-label">Fecha de Nacimiento</label>
                                <input type="date" className="form-control" id="fechaN" name="fechaN" onChange={handleChange} />
                            </div>
                        </div>
                        <hr />
                        {/*----------- datos de tarjeta -------------*/}
                        <div className="mb-5">
                            <div className="mb-2">
                                <h2>Datos de Tarjeta</h2>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4 mb-3">
                                    <label htmlFor="numero" className="form-label">Numero de Tarjeta</label>
                                    <input type="text" name="numero" id="numero" className="form-control" onChange={handleChange} />
                                </div>
                                <div className="col-5 mb-3">
                                    <label htmlFor="nombreTarjeta" className="form-label">Nombre y Apellido</label>
                                    <input type="text" className="form-control" id="nombreTarjeta" name="nombreTarjeta" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <label htmlFor="cvv" className="from-label">cvv</label>
                                    <input type="text" className="form-control" name="cvv" id="cvv" onChange={handleChange} />
                                </div>
                                <div className="col-5">
                                    <label htmlFor="fechaExpiracion" className="form-label">fecha de expiracion</label>
                                    <input type="text" className="form-control" name="fechaExpiracion" id="fechaExpiracion" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        {/*--------------------tipos de subcripcion--------------------------------- */}
                        <div className="mb-5">
                            <h3>Tipo de subcripcion</h3>
                            <div className="col-4">
                                <select name="idMenbrecia" id="idMenbrecia" className="form-select" onChange={handleChange}>
                                    <option value="tipo">Tipo de subcripcion</option>
                                    <option value="1">1 Mes</option>
                                    <option value="2">2 Meses</option>
                                    <option value="3">6 Meses</option>
                                    <option value="4">1 Año</option>
                                </select>
                            </div>
                        </div>
                        {/*----------------------boton de Registro---------------------------- */}
                        <div className="d-grid gap-2 col-5 mx-auto">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Registrar</button>
                        </div>
                    </form>
                </div>
                {/*-----------------------columna de lista de Precios---------------------------- */}
                <div className="col">
                    <ul className="list-group col-7">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">1 Mes</div>
                                Subcripcion
                            </div>
                            <span className="badge bg-primary rounded-pill">$ 15.000</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">2 Meses</div>
                                Subcripcion
                            </div>
                            <span className="badge bg-primary rounded-pill">$ 25.000</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">6 Meses</div>
                                Subcripcion
                            </div>
                            <span className="badge bg-primary rounded-pill">$ 60.000</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">1 Año</div>
                                Subcripcion
                            </div>
                            <span className="badge bg-primary rounded-pill">$ 95.000</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}