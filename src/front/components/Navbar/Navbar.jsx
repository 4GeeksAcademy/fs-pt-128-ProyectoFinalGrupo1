import { Link } from "react-router-dom";
import LogoUrl from "../../assets/img/Logo.png";
import "./Navbar.css"
import { useState } from "react";
export const Navbar = () => {

	const [offCanvas, setOffCanvas] = useState(false)

	return (
		<>
			<nav className={`${offCanvas && `expended`} custom_navbar d-flex align-items-start justify-content-between flex-column`} onMouseEnter={() => setOffCanvas(true)} onMouseLeave={() => setOffCanvas(false)}>
				<div className="img_contianer d-flex align-items-center justify-content-center mx-auto">
					<img src={LogoUrl} alt="" />
				</div>
				<div className="d-flex justify-content-center flex-column h-100">
					<div className="mt-4 mb-4 navbar_icons d-flex align-items-center">
						<h3 className="text-center width-icon"><i className="fa-solid fa-hospital-user p-2"></i></h3>
						<h3 className={`${offCanvas ? `text-expended` : `navbar_icons-text`} fs-5 ms-2 me-4`}>Paciente</h3>
					</div>
					<div className="mt-4 mb-4 navbar_icons d-flex align-items-center">
						<h3 className="text-center width-icon"><i className="fa-solid fa-heart-pulse  p-2"></i></h3>
						<h3 className={`${offCanvas ? `text-expended` : `navbar_icons-text`}  fs-5 ms-2 me-4`}>Triaje</h3>
					</div>
					<div className="mt-4 mb-4 navbar_icons d-flex align-items-center">
						<h3 className="text-center width-icon"><i className="fa-solid fa-user-doctor p-2"></i></h3>
						<h3 className={`${offCanvas ? `text-expended` : `navbar_icons-text`} fs-5 ms-2 me-4`}>Consulta</h3>
					</div>
				</div>
				<div className="d-flex align-items-center flex-column mx-auto">
					<h3><i className="fa-solid fa-arrow-right-from-bracket"></i></h3>
				</div>
			</nav >
		</>


	);
};