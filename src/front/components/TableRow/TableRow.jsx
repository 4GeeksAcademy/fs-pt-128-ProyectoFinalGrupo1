import { deleteUser, getUser } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { ModalDeleteUser } from "../ModalDeleteUser/ModalDeleteUser"

export const TableRow = ({ user }) => {

    return (
        <tr>
            <th scope="row" className="align-middle">{user.id}</th>
            <td className="text-center align-middle">{user.firstname} {user.lastname}</td>
            <td className="text-center align-middle">{user.email}</td>
            <td className="text-center align-middle">{user.rol}</td>
            <td className="text-center align-middle">
                <i className={user.is_active ?
                    'fa-solid fa-circle-check text-success fs-5'
                    : 'fa-solid fa-circle-minus text-danger fs-5'} ></i>
            </td>
            <td className="text-center">
                {
                    user.rol !== 'Admin' &&
                    <ModalDeleteUser user={user.id} />
                }
            </td>
        </tr>
    )
}
