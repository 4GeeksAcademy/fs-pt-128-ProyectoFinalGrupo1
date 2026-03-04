export const TableRow = ({ user }) => {
    return (
        <tr>
            <th scope="row" className="align-middle">{user.id}</th>
            <td className="text-center align-middle">{user.firstname} {user.lastname}</td>
            <td className="text-center align-middle">{user.email}</td>
            <td className="text-center align-middle">{user.rol}</td>
            <td className="text-center align-middle">
                <i className={user.is_active ? 'fa-solid fa-circle-check text-success' : 'fa-solid fa-circle-minus text-danger'} fs-5></i>
            </td>
            <td className="text-center">
                <button className="btn btn-outline-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    )
}