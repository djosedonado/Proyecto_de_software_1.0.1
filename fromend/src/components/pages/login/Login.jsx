import { useState } from 'react';
import { Link } from 'react-router-dom';
import imgSession from './img/user.png';
import imgFacebook from './img/facebook.png';
import imgGoogle from './img/Google.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
//import axios from 'axios';

export function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { login, loginWithGoogle, resetPassword } = useAuth();
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

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
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
                    {/* Inicio de session por aplicaciones google y facebook */}
                    <div className='container w-100 my-5'>
                        <div className='row text-center'>
                            <div className='col'>
                                <button className='btn btn-outline-primary w-100 my-1'>
                                    <div className='row align-items-center'>
                                        <div className="col-2">
                                            <img src={imgFacebook} alt="facebook" width="32" />
                                        </div>
                                        <div className='col-2 text-center'>
                                            Facebook
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className='col'>
                                <button className='btn btn-outline-danger w-100 my-1' onClick={handleGoogleSignin}>
                                    <div className='row align-items-center'>
                                        <div className="col-2">
                                            <img src={imgGoogle} alt="google" width="32" />
                                        </div>
                                        <div className='col-2 text-center'>
                                            Google
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
