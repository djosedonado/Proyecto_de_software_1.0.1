import React from "react";
import { NavLink } from "react-router-dom";
import LOGO from "./img/LogoHeader.png";
import LOGIN from "./img/usuario.png";
import { useAuth } from "../context/AuthContext";
import "./styles/Header.css";

export function Header() {
    const { logout, user } = useAuth();

    //console.log(user); se verifica si el usuario esta logueado si esta logueado es true si no es null.
    const handleLogout = async () => {//metodo para desloguearnos
        try {
            await logout();

        } catch (error) {
            console.error(error.message);
        }
    };

    function setImgPerfile() {
        if (user.photoURL === null) {
            return (
                <img
                    src={LOGIN}
                    alt="Login"
                />
            );
        } else {
            return (
                <img
                    src={user.photoURL}
                    alt=""
                    width="36"
                    height="36"
                    className="rounded-circle"
                />
            );
        }
    }

    function setLoading() {
        if (user) {
            return (
                <>
                    <NavLink
                        id="img"
                        to="/Login"
                        className="d-block link-dark text-decoration-none "
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {setImgPerfile()}
                    </NavLink>

                </>
            );
        } else {
            return (<p></p>);
        }
    }

    function botonServicios(){
        if(user){
            return (
                <>
                    {/*--------------boton logout ----------------- */}
                    <div class="dropdown">
                        <NavLink className="btn btn-primary  dropdown-toggle" to="/formulario" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Servicios
                        </NavLink>
    
                        <ul class="dropdown-menu">
                            <li><NavLink className="dropdown-item" to="/formrecolecciondatos">Recolecion de Datos</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/evaluar">Evaluar</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/xd">Consultar</NavLink></li>
                        </ul>
                    </div>
                    {/*---------------------------------------------- */}
    
                </>
            );
        }
    }

    function setMenuLoading() {
        if (user) {
            return (

                <ul className="dropdown-menu text-small" >
                    <li>
                        <NavLink className="dropdown-item" to="#">
                            Configuracion
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dropdown-item" to="/Micuenta">
                            Mi Cuenta
                        </NavLink>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <NavLink className="dropdown-item" to="/" onClick={handleLogout}>
                            Cerrar Sesion
                        </NavLink>
                    </li>
                </ul>
            );
        } else {
            return (
                <NavLink
                    id="Ingresar"
                    to="/Login"
                    className="initSession"

                >
                    Iniciar sesión
                </NavLink>
            );
        }
    }
    return (
        <>
            <header className="p-3 mb-3 border-bottom sticky-top" id="header">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start container-header">
                        <NavLink
                            to="/"
                            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
                        >
                            <img className="logo-header" src={LOGO} />
                        </NavLink>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-3">
                            <li>
                                <NavLink to="/" className="nav-link px-2 link-dark">
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/AcercaDe" className="nav-link px-2 link-dark">
                                    Acerca De
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Information" className="nav-link px-2 link-dark">
                                    Informacion
                                </NavLink>
                            </li>
                            <li>
                                {botonServicios()}
                            </li>
                        </ul>

                        <div className="dropdown text-end perfile">
                            {setLoading()}
                            {setMenuLoading()}
                        </div>

                    </div>
                </div>
            </header>
        </>
    );
}
