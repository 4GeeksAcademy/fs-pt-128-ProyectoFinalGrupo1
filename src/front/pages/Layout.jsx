import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar/Navbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="d-flex">
                <Navbar />
                <div className="w-100 mx-3">
                    <Outlet />
                    <Footer />
                </div>

            </div>
        </ScrollToTop>
    )
}