import React from "react";
import { Link } from "react-router-dom";
import HOME_ITEM_1 from "../img/home-item-1.jpg";
import "../home/Home.css";


export function Home() {

    return (
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6 container__vector">
                    <img src={HOME_ITEM_1} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                </div>
                <div className="col-lg-6 cover">
                    <h1 className="display-5 fw-bold lh-1 mb-3">Mejora tu rendimiento</h1>
                    <h2 className="display-5 fw-bold lh-1 mb-3">y recuperación</h2>
                    <p className="lead">junto con el descanso y el trabajo físico es uno de los factores que más influye en el rendimiento físico de un atleta. Gracias a ella podemos mejorar significativamente tanto el rendimiento como la recuperación.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <Link type="button" to="/Information" className="btn btn-primary btn-lg px-4 me-md-2">Mas Informacion</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}