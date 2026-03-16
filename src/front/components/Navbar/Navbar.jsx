import { Link } from "react-router-dom";
import LogoUrl from "../../assets/img/Logo.svg";
import "./Navbar.css"
import { useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Dropup } from "../DropUp/Dropup";

export const Navbar = () => {

	const [offCanvas, setOffCanvas] = useState(false)
	const { store, dispatch } = useGlobalReducer()

	return (
		
		<nav className="navbar custom-navbar  navbar-expand-lg d-flex flex-column justify-content-between text-darkmw-100">
			<div className="container-fluid d-flex flex-column align-items-start ">
				<div className="border-bottom border-secondary w-100 mt-1">
					<div className="d-flex align-items-center  mb-2">
						<div className="continer-logo_custom bg-dark rounded d-flex justify-content-center align-items-center me-1">
							<a className="" href="#">
								<i className="fa-solid fa-staff-snake align-middle text-white fs-3"></i>
							</a>
						</div>
						<div>
							<h4 className="p-0 m-0 fs-5">Sistema médico</h4>
							<p className="p-0 m-0 fs-6">Panel del </p>
						</div>
					</div>
				</div>


				<div className="container-fluid mt-3 custom-navbar__list " id="navbarNav">
					<p className="text-start">Principal</p>
					<div className="d-flex align-items-center mb-2">
						<div className="col-2 text-center">
						<i className="fa-solid fa-layer-group custom-navbar__linktext"></i>
						</div>
						<div>
						<p className="m-0 custom-navbar__linktext">Panel de control</p>
						</div>
					</div>
					<div className="d-flex align-items-center mb-2">
						<div className="col-2 text-center">
						<i className="fa-solid fa-users custom-navbar__linktext"></i>
						</div>
						<div>
						<p className="m-0 custom-navbar__linktext">Pacientes</p>
						</div>
					</div>
					<div className="d-flex align-items-center mb-2">
						<div className="col-2 text-center">
						<i className="fa-solid fa-flask-vial custom-navbar__linktext"></i>
						</div>
						<div>
						<p className="m-0 custom-navbar__linktext">Pruebas</p>
						</div>
					</div>
					<div className="d-flex align-items-center mb-2">
						<div className="col-2 text-center">
						<i className="fa-solid fa-clipboard-check custom-navbar__linktext"></i>
						</div>
						<div>
						<p className="m-0 custom-navbar__linktext">Historial pacientes</p>
						</div>
					</div>
				</div>
				<div className="container-fluid mt-3 custom-navbar__list " id="navbarNav">
					<p className="text-start">Configuración</p>
					<div className="d-flex align-items-center mb-2">
						<div className="col-2 text-center">
						<i className="fa-solid fa-user custom-navbar__linktext"></i>
						</div>
						<div>
						<p className="m-0 custom-navbar__linktext">Mi perfil</p>
						</div>
					</div>
					<div className="d-flex align-items-center mb-2">
						<div className="col-2 text-center">
						<i className="fa-solid fa-gear custom-navbar__linktext"></i>
						</div>
						<div>
						<p className="m-0 custom-navbar__linktext">Tipos de informe</p>
						</div>
					</div>
				</div>
			</div>
			<div className="border-top border-secondary d-flex align-items-center">
				<div className="d-flex align-items-center mb-2 mt-2">
					<div className="continer-logo_custom bg-dark rounded d-flex justify-content-center align-items-center  me-1">
						<a className="" href="#">
							<i className="fa-solid fa-stethoscope align-middle text-white fs-4"></i>
						</a>
					</div>
					<div className="">
						<h4 className="p-0 m-0 fs-5 truncate-text">Nombre del doctor/enfermero</h4>
						<p className="p-0 m-0 fs-6">Medico urgencias</p>
					</div>
				</div>
				<div className="ms-2">
					<Dropup />
				</div>
			</div>
		</nav>

	);
};