import { Navigate, Outlet } from "react-router-dom"
import useGlobalReducer from "../../hooks/useGlobalReducer"

export const ProtectedRoute = ({ rol, children, redirectTo = "/" }) => {
    const { store } = useGlobalReducer()
    const userRol = store.profile?.rol?.trim() || localStorage.getItem('rol')?.trim()
    const isAllowed = Array.isArray(rol) ? rol.includes(userRol) : userRol === rol
 
    if (!isAllowed) {
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
}