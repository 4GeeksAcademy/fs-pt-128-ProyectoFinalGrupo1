import { useEffect } from "react"
import { ModalAddUser } from "../../components/ModalAddUser/ModalAddUser"
import { TableRow } from "../../components/TableRow/TableRow"
import { getUser } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"

export const RegisterUser = () => {
    const { store, dispatch } = useGlobalReducer();
    
    useEffect(() => {
        getUser(dispatch)
    }, [])

    return (
        <main className="container-fluid">
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Gestión de usuarios</h2>
            </div>
            <div className="container containerTable mt-3">
                <ModalAddUser />
                <div className="border rounded p-3">
                    <div className="d-flex justify-content-center">
                        <h2 className="mt-2 mb-2">Administrador de usuarios</h2>
                    </div>
                    <div>
                        <table className="table">
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" className="text-center">Nombre y apellidos</th>
                                    <th scope="col" className="text-center">Email</th>
                                    <th scope="col" className="text-center">Rol</th>
                                    <th scope="col" className="text-center">Activado</th>
                                    <th scope="col" className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!store.users && store.users.length < 1 ?
                                    <tr>
                                        <td colSpan="6">
                                            No hay usuarios registrados
                                        </td>
                                    </tr> :
                                    store.users
                                        .sort((a, b) => a.id - b.id)
                                        .map(user => (
                                            <TableRow key={user.id} user={user} />
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main >
    )
}