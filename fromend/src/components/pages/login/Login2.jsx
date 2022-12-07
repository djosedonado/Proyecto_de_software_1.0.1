//import "../login/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Alert } from "../Alert";
export function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const { login, loginWithGoogle, resetPassword } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = ({ target: { value, name } }) =>
        setUser({ ...user, [name]: value });

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
        <div
            className="modal modal-signin position-static d-block bg-withi py-5"
            role="dialog"
            id="modalSignin"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    {error && <Alert message={error} />}
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0">Inicie Sesion</h2>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="Form" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control rounded-3"
                                    onChange={handleChange}
                                />
                                <label>Correo Electronico</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control rounded-3"
                                    onChange={handleChange}
                                />
                                <label>Contraseña</label>
                            </div>
                            <button
                                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                type="submit"
                            >
                                Entrar
                            </button>
                            <li className="resetPassword">
                                <span className="reset-password" type="button" onClick={handleResetPassword}
                                >Se me olvido la Contraseña
                                </span>
                            </li>
                            <div id="customBtn" className="customGPlusSignIn" onClick={handleGoogleSignin}>
                                <span className="icon"></span>
                            </div>


                            <li className="d-block link-dark text-decoration-none" id="linkRegister">
                                si no tiene cuenta Registrate

                                <Link
                                    to="/register"
                                    className="text-blue-700 hover:text-blue-900 Aqui"
                                >
                                    Aqui
                                </Link>
                            </li>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}