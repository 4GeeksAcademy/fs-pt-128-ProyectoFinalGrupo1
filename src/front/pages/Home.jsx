import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "./Home.css";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	

	return (
		<>
			<div className="container d-flex justify-content-center text-center mt-5">
				<div className="titleContainer">
					<h1>*Insertar nombre de app*</h1>
					
				</div>
				<div className="">

				</div>

			</div>
		</>
	);
}; 