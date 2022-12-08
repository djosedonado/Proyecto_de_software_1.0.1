import { useState } from 'react';
import { Link } from 'react-router-dom';
import imgSession from './img/user.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Login.css'
//import axios from 'axios';

export function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { login,resetPassword } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const inputChange = (e) => {
        let { name,value} = e.target;
        let newDatos = {...user,[name]:value}
        setUser(newDatos)
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        setError("");
        try {
            //const resul = axios.post("http://localhost:3001/login/auth", user);
            //const dato = await resul.then()
            await login(user.email, user.password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!user.email) return setError("Escriba un correo electrónico para restablecer la contraseña");
        try {
            await resetPassword(user.email);
            setError('Te enviamos un correo electrónico. Revisa tu correo')
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className='container'>
            <div className='row'>
                {/* Columna de Imagen del login*/}
                <div className='col'>

                </div>
                {/* Columna de sission */}
                <div className='col'>
                    <div className='text-center' >
                        <p className='alerta_err'>{error}</p>
                    </div>
                    <div className="text-center">
                        <img src={imgSession} alt="user" width="64" />
                    </div>
                    <h2 className='fw-bold text-center py-5'>Bienvenidos</h2>
                    <form action="" onSubmit={onSubmit}>
                        <div className='mb-4'>
                            <label htmlFor="email" className='form-label'>Correo Electrinico</label>
                            <input type="email" name="email" id="email" className='form-control' onChange={inputChange} value={user.email}/>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='form-label'>Contraseña</label>
                            <input type="password" name='password' id='password' className='form-control' onChange={inputChange} value={user.password} />
                        </div>
                        <div className='mb-4 form-check'>
                            <input type="checkbox" name='connected' className='form-check-input' />
                            <label htmlFor="connected" className='form-check-label'>Recordar</label>
                        </div>
                        <div className="d-grid">
                            <button type='submit' className='btn btn-primary'>Iniciar Session</button>
                        </div>
                        <div className='my-3'>
                            <span>No tienes Cuneta? <Link to="/register">Registrate</Link></span><br />
                            <span><Link onClick={handleResetPassword}>Recuperar Password</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
