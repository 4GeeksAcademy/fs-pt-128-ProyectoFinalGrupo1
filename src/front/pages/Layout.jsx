import { Outlet, useNavigate } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar/Navbar"
import { useLocation } from "react-router-dom/dist"
// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const location = useLocation();
    const excludedRoutes = ["/", "/activate", "/signup"];
    const showNavbar = !excludedRoutes.includes(location.pathname);
    const navigate = useNavigate()
    const logOut = (e) => {
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <ScrollToTop>
            <div className="d-flex min-vh-100">
                {showNavbar && <Navbar />}
                <div className={` ${!showNavbar ? `m-0` : ''} flex-grow-1 p-2 body-color`}>
                    <Outlet />
                    {/* <Footer /> */}
                </div>
            </div>
            <div className="modal fade" id="logOutModal" tabindex="-100" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        
                        <div className="modal-body text-center">
                            
                            <h1 className="modal-title fs-5" id="ModalLabel">¿Cerrar sesión?</h1>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={logOut}>Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollToTop>
    )
}