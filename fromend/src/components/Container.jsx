import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/Register/Register";
import { AcercaDe } from "./pages/acercaDe/AcercaDe";
import { Micuenta } from "./pages/perfile/miCuenta/Micuenta";
import { FormRecoleccion } from "./pages/formularios/formRecoleccion/formRecolecion";
import { Information } from "./pages/information/Information";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ProtectRoute } from '../components/Protect/ProtectRoute';
import "./styles/Container.css"
import { useAuth } from "../context/AuthContext";
import { FormConsul } from "./pages/formularios/formConsulta/formConsul";


export function Container() {
    const { user } = useAuth()
    return (
        <>
            <Header />
            <div className="contenedor">

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/AcercaDe" element={<AcercaDe />} />
                    <Route path="/Information" element={<Information />} />
                    <Route element={<ProtectRoute isAllowed={!!user} redirectTo="/formulario"/>}>
                        <Route path="/Consulta" element={<FormConsul/>} />
                        <Route path="/micuenta" element={<Micuenta />} />
                        <Route path="/formrecolecciondatos" element={<FormRecoleccion/>}/>
                    </Route>
                    <Route path="*" element={<Home/>} />
                </Routes>

            </div>
            <Footer />
        </>
    );
}