import React, { useState, useContext, useEffect } from "react"; // Importa useState
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from 'react-router-dom';


const Signup = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState({ email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await actions.signup(user.email, user.password);
        navigate("/")
    }


    return (
        <div className="PaginaPrincipal">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh'}}>
                <div className="shadow-lg p-4 bg-dark" style={{ width: '500px', borderRadius: "30px" }}>
                    <h2 className="text-center text-white mb-2">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-light">Email</label>
                            <input
                                className="form-control rounded"
                                onChange={(event) => setUser({
                                    ...user,
                                    email: event.target.value
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-light">Password</label>
                            <div className="d-flex">
                                <input
                                    className="form-control rounded"
                                    onChange={(event) => setUser({
                                        ...user,
                                        password: event.target.value
                                    })}
                                />
                            </div>
                        </div>
                        <button
                            type= "submit"
                            className="btn btn-primary w-100 mt-2 rounded-pill"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div >
        </div>
    );
};

export default Signup;