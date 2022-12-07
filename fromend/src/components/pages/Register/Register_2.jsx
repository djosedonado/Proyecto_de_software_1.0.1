import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css";

export function Register() {

  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    sexo: "",
    fecha: ""
  });
  const [verificacion, setVerificacion] = useState('');
  const handleInputVerificacion = ({ target }) => {
    setVerificacion(target.value);
  }
  const navigate = useNavigate();



  const handleChange = async (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  console.log(user.fecha)
  let { nombre, apellido, email, password, sexo, fecha } = user
  const handleSubmit = () => {

    if (nombre === "" || apellido === '' || email === "" || sexo === "") {
      alert("campos vacios")
      return
    }

    if (password === verificacion && password !== '') {
      //console.log(user.fecha)
      const requicitosIniciales = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      }
      fetch('http://localhost:9000/api', requicitosIniciales)
        .then(res => res.json())
        .then(res => console.log(res))
      setUser({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        sexo: "",
        fecha: ""
      })
      alert("Registro Exitoso")
      navigate("/");
    } else {
      alert("Verifique su contraseña");
    }
  }

  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Formulario de Registro</h2>
          <p className="lead">
            Para tener éxito, en primer lugar debemos creer que podemos.
          </p>
        </div>

        <div className="row g-5">

          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Datos Personales</h4>
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label">Nombres</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleChange} />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Apellidos</label>
                  <input type="text" className="form-control" id="apellido" name="apellido" onChange={handleChange} />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Correo <span className="text-muted"></span>
                  </label>
                  <input
                    type="email"
                    onChange={handleChange}
                    className="form-control email"
                    id="email"
                    name="email"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Su contraseña"
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Contraseña<span className="text-muted"></span>
                  </label>
                  <input
                    type="password"
                    className="form-control verificacion"
                    id="verificacion"
                    value={verificacion}
                    onChange={handleInputVerificacion}
                    placeholder="Validacion Contraseña"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    Sexo<span className="text-muted"></span>
                  </label>
                  <select className="form-select" id="sexo" onChange={handleChange} name="sexo">
                    <option></option>
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-4">
                  <label className="form-label">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    name="fecha"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Registar
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
