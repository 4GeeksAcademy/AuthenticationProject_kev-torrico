import Signup from "../component/signup";
import { Toaster, toast } from 'react-hot-toast';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],
			token: localStorage.getItem("token") || null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup: async (email, password) => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password,
						})
					});

					if (!resp.ok) {
						const errorMessage = await resp.text();
						console.error("Error during signup:", errorMessage)
						return null;
					}
					const data = await resp.json();
					
					console.log("¡User registered!");
					return data;
				} catch (error) {
					console.error("Error in the signup request:", error);
					return null;
				}
			},
			login: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				const data = await resp.json();

				if (resp.ok) {
					localStorage.setItem("token", data.token);
					setStore({ token: data.token, user: data.user });
					console.log("Login sucessful")
					return data;
				} else {
					toast.error("Invalid Credentials");
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({
				  token: null,
				  user: {}
				});
				toast("👋🏼 Bye..");
			  }
		}
	};
};

export default getState;
