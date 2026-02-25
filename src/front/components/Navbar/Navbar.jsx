import { Link } from "react-router-dom";
import LogoUrl from "../../assets/img/Logo.svg";
import "./Navbar.css"
import { useState } from "react";
export const Navbar = () => {

	const [offCanvas, setOffCanvas] = useState(false)

	return (
		<>
			<nav className={`${offCanvas && `expended`} custom_navbar d-flex align-items-start justify-content-between flex-column`}
				onMouseEnter={() => setOffCanvas(true)}
				onMouseLeave={() => setOffCanvas(false)}>
				<div className="img_contianer d-flex align-items-center justify-content-center">
					<img src={LogoUrl} alt="" />
				</div>
				<div className="d-flex justify-content-center flex-column h-100">
					<div className="mt-4 mb-4 navbar_icons d-flex align-items-center">
						<div className="width-icon ms-2 ms-md-3 me-2">
							<i className="fa-solid fa-hospital-user text-center"></i>
						</div>
						<h3 className={`${offCanvas ? `text-expended` : `navbar_icons-text`} fs-5 me-2`}>
							Paciente
						</h3>
					</div>
					<div className="mt-4 mb-4 navbar_icons d-flex align-items-center ">
						<div className="width-icon ms-2 ms-md-3 me-2">
							<i className="fa-solid fa-heart-pulse text-center"></i>
						</div>
						<h3 className={`${offCanvas ? `text-expended` : `navbar_icons-text`} fs-5 me-2`}>Triaje</h3>
					</div>
					<div className="mt-4 mb-4 navbar_icons d-flex align-items-center">
						<div className="width-icon ms-2 ms-md-3 me-2">
							<i className="fa-solid fa-user-doctor text-center"></i>
						</div>
						<h3 className={`${offCanvas ? `text-expended` : `navbar_icons-text`} fs-5 me-2`}>Consulta</h3>
					</div>
				</div>
				<div className="d-flex align-items-center flex-column mx-auto">
					<h3><i className="fa-solid fa-arrow-right-from-bracket"></i></h3>
				</div>
			</nav >
		</>


	);
};