import { SortableRow } from "../../components/RowTriage"

export const DashboardTriaje = () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    return (
        <div className="container mt-5" style={{ maxHeight: "80vh", overflowX: "hidden", overflowY: "auto" }} >
            <table class="table" >
                <thead style={{ position: "sticky", top: "0", zIndex: "2" }}>
                    <tr >
                        <th scope="col">Paciente</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody className="list">
                    {
                        items.map((id, index) =>
                            <SortableRow key={id} id={id} index={index} />
                        )
                    }
                </tbody>
            </table>
        </div>

    )
}