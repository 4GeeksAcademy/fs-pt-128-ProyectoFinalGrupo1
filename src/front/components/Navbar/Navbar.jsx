import { Link, useNavigate } from "react-router-dom";
import LogoUrl from "../../assets/img/Logo.svg";
import "./Navbar.css"
import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Dropup } from "../DropUp/Dropup";

export const Navbar = () => {

	const [offCanvas, setOffCanvas] = useState(false)
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()
	const profile = ({
		"email": localStorage.getItem("email") || "",
		"firstname": localStorage.getItem("firstname") || "",
		"lastname": localStorage.getItem("lastname") || "",
		"rol": localStorage.getItem("rol") || "",
	})
	console.log(profile)


	return (

		<nav className="navbar custom-navbar  navbar-expand-lg d-flex flex-column justify-content-between text-darkmw-100">
			<div className="container-fluid d-flex flex-column align-items-start ">
				<div className="border-bottom border-secondary w-100 mt-1">
					<div className="d-flex align-items-center  mb-2">
						<div className="continer-logo_custom bg-dark rounded d-flex justify-content-center align-items-center me-1">
							<i className="fa-solid fa-staff-snake align-middle text-white fs-3"></i>
						</div>
						<div>
							<h4 className="p-0 m-0 fs-5">Sistema médico</h4>
							<p className="p-0 m-0 fs-6">Panel del {profile.rol.toLowerCase()}</p>
						</div>
					</div>
				</div>

				<div className="container-fluid mt-3 custom-navbar__list " id="navbarNav">
					<h4 className="text-start title fs-6">Menu Principal</h4>
					{(profile.rol === "Enfermero" || profile.rol === "Médico" || profile.rol === "Técnico") &&
						<div className="d-flex align-items-center mb-2 cursor-pointer"
							onClick={() =>
								navigate(
									profile.rol === "Enfermero"
										? "/control-panel/triage"
										:
										profile.rol === "Médico"
											? "/control-panel/consultation"
											:
											profile.rol === "Técnico"
												? "/medical-test" :
												"/"
								)
							}>
							<div className="col-2 text-center">
								<i className="fa-solid fa-layer-group custom-navbar__linktext"></i>
							</div>
							<div>
								<p className="m-0 custom-navbar__linktext">Panel de control</p>
							</div>
						</div>
					}
					{(profile.rol === "Médico" || profile.rol === "Enfermero" || profile.rol === 'Técnico') &&
						<div className="d-flex align-items-center mb-2 cursor-pointer"
							onClick={() =>
								navigate(
									profile.rol === "Médico"
										? "/consultation"
										:
										profile.rol === "Enfermero"
											? "/triage"
											:
											profile.rol === 'Técnico'
												? '/tests' :
												'/'

								)
							}>
							<div className="col-2 text-center">
								<i className="fa-solid fa-users custom-navbar__linktext"></i>
							</div>
							<div>
								<p className="m-0 custom-navbar__linktext">Pacientes</p>
							</div>
						</div>
					}
					{(profile.rol === "Médico" || profile.rol === "Técnico") &&
						<div className="d-flex align-items-center mb-2 cursor-pointer"
							onClick={() => navigate(profile.rol === "Médico"
								? "/tests"
								: profile.rol === "Técnico" ? "/tests/status/solicitada" : "/")}>
							<div className="col-2 text-center">
								<i className="fa-solid fa-flask-vial custom-navbar__linktext"></i>
							</div>
							<div>
								<p className="m-0 custom-navbar__linktext">Pruebas</p>
							</div>
						</div>
					}
					{(profile.rol === "Médico" || profile.rol === "Enfermero") &&
						<div className="d-flex align-items-center mb-2 cursor-pointer" onClick={() => navigate('/patientsHistory')}>
							<div className="col-2 text-center">
								<i className="fa-solid fa-clipboard-check custom-navbar__linktext"></i>
							</div>
							<div>
								<p className="m-0 custom-navbar__linktext">Historial pacientes</p>
							</div>
						</div>
					}
				</div>

			</div>
			<div className="border-top border-secondary d-flex align-items-center">
				<div className="d-flex align-items-center mb-2 mt-2">
					<div className="continer-logo_custom bg-dark rounded d-flex justify-content-center align-items-center  me-1">
						<i className="fa-solid fa-stethoscope align-middle text-white fs-4"></i>
					</div>
					<div className="">
						<h4 className="p-0 m-0 fs-5 truncate-text">{profile.firstname}</h4>
						<p className="p-0 m-0 fs-6">{profile.rol} urgencias</p>
					</div>
				</div>
				<div className="ms-2">
					<Dropup />
				</div>
			</div>
		</nav >

	);
};