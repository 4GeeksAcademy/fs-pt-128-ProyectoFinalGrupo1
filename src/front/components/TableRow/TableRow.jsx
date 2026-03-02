export const TableRow = () => {
    return (
        <tr>
            <th scope="row" className="align-middle">3</th>
            <td className="text-center align-middle">Migue García</td>
            <td className="text-center align-middle">magarbello@gmail.com</td>
            <td className="text-center align-middle">Enfermero</td>
            <td className="text-center align-middle">
                <i className="fa-solid fa-circle-check text-success fs-5"></i>
                <i className="fa-solid fa-circle-minus text-danger fs-5"></i>
            </td>
            <td className="text-center">
                <button className="btn btn-outline-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    )
}