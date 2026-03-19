import { Outlet, useNavigate } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar/Navbar"
import { useLocation } from "react-router-dom/dist"
import { useEffect, useState } from "react"
import { SpinnerLoad } from "../components/Spinner/SpinnerLoad"
// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const location = useLocation();
    const excludedRoutes = ["/", "/activate", "/signup"];
    //Se pueden escribir ↓aqui↓ las rutas a las que se quiere acceder sin token para pruebas
    const publicRoutes = ["/", "/signup"]
    const showNavbar = !excludedRoutes.includes(location.pathname);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const logOut = (e) => {
        localStorage.clear()
        navigate("/")
    }

    useEffect(() => {
        if (!publicRoutes.includes(location.pathname)) {
            if (!localStorage.getItem("token")) {
                setLoading(true)
                setTimeout(() => {
                    navigate("/")
                    setLoading(false)
                }, 2000)
            } 
        }
    }, [location.pathname])
    return loading ?
        (
            <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
                <h2>Cargando página</h2>
                <SpinnerLoad />
            </div>
        )
        :
        (
            <ScrollToTop>
                <div className="d-flex min-vh-100">
                    {showNavbar && <Navbar />}
                    <div className={` ${!showNavbar ? `m-0` : ''} flex-grow-1 p-2 body-color`}>
                        <Outlet />
                        {/* <Footer /> */}
                    </div>
                </div>
                <div className="modal fade" id="logOutModal" tabIndex="-100" aria-labelledby="ModalLabel" aria-hidden="true">
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