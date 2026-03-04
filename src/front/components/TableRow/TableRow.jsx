import { deleteUser, getUser } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"

export const TableRow = ({ user }) => {
    const { store, dispatch } = useGlobalReducer()
    const handlerClick = async () => {
        await zzzzzdeleteUser(user.id)
        await getUser(dispatch)
        return
    }

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
                <button className="btn btn-outline-danger"
                    onClick={handlerClick}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    )
}