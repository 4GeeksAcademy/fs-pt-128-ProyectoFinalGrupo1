import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar/Navbar"
import { useLocation } from "react-router-dom/dist"
// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const location = useLocation();
    const excludedRoutes = ["/", "/activate", "/signup"];
    const showNavbar = !excludedRoutes.includes(location.pathname);
    return (
        <ScrollToTop>
            <div className="d-flex min-vh-100">
                {showNavbar && <Navbar />}
                <div className="flex-grow-1 p-2">
                    <Outlet />
                    {/* <Footer /> */}
                </div>
            </div>
        </ScrollToTop>
    )
}