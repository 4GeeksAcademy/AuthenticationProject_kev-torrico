import React, { useState, useContext, useEffect } from "react"; // Importa useState
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from 'react-router-dom';
import {toast} from "react-hot-toast";


const Login = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user.email || !user.password){
            toast.error("Both email and password are required.");
            return;
        }
        const result = await actions.login(user.email, user.password);

        if (result) {
            toast.success("Login succesful!", { duration: 2000 });
            navigate('/');
        } else {
            console.log("Login failed");  
        }
    }


    return (
        <div className="PaginaPrincipal">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh'}}>
                <div className="shadow-lg p-4 bg-dark" style={{ width: '500px', borderRadius: "30px" }}>
                    <h2 className="text-center text-white mb-2">Login</h2>
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

export default Login;