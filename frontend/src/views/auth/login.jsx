import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { login } = useAuth();

    const loginHandler  = async (e) => {
        e.preventDefault();
        setLoadingLogin(true);
        try {
            const response = await login(email, password);
            if(response.success){
                setEmail('');
                setPassword('');
                setErrors([]);
                navigate('/posts');
            }
            throw response;
        } catch (error) {
            setErrors(error)
        }finally{
            setLoadingLogin(false);
        }
    }

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                        <h4 className="fw-bold">HALAMAN LOGIN</h4>
                            <hr/>
                            {
                                errors.message && (
                                    <div className="alert alert-danger">
                                        {errors.message}
                                    </div>
                                )
                            }
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">ALAMAT EMAIL</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email"/>
                                </div>
                                {
                                    errors.email && (
                                        <div className="alert alert-danger">
                                            {errors.email[0]}
                                        </div>
                                    )
                                }
                                <div className="mb-3">
                                    <label className="form-label">PASSWORD</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                                </div>
                                {
                                    errors.password && (
                                        <div className="alert alert-danger">
                                            {errors.password[0]}
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loadingLogin}>
                                    {loadingLogin ? (
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                    ) : (
                                    "LOGIN"
                                    )}
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}