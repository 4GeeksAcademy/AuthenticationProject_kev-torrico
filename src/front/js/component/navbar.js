import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Context } from "../store/appContext"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();
	const navigate = useNavigate();


	const handleLogout = () => {
		actions.logout();
		navigate('/');
	};


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary me-2">Check the Context in action</button>
					</Link>
					{!store.token && (
						<Link to="/login">
							<button className="btn btn-primary me-2">Login</button>
						</Link>
					)}
					{!store.token && (
						<Link to="/signup">
							<button className="btn btn-primary me-2">Signup</button>
						</Link>
					)}
					{store.user && store.token && (
						<button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
					)}
				</div>
				
			</div>
		</nav>
	);
};
