import { ModalAddUser } from "../../components/ModalAddUser/ModalAddUser"
import { TableRow } from "../../components/TableRow/TableRow"

export const RegisterUser = () => {
    return (
        <main className="container mt-5 fontst">
            <ModalAddUser />
            <div className="border rounded p-3">
                <div className="d-flex justify-content-center">
                    <h2 className="mt-2 mb-2">Administrador de usuarios</h2>
                </div>
                <div>
                    <table class="table">
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
                            <TableRow />
                        </tbody>
                    </table>
                </div>
            </div>
        </main >
    )
}