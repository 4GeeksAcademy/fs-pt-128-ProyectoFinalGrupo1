import { useEffect } from "react"
import { RowConsult } from "../../components/RowConsult/RowConsult"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { getIncomes } from "../../APIServices/BACKENDservices"


export const DashboardConsulta = () => {
    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
        getIncomes(dispatch)
    }, [])

    return (
        <div className="container-fluid mt-5 container-table" style={{ maxHeight: "80vh", overflowX: "hidden", overflowY: "auto", maxWidht: '100%' }} >
            <h1 className="text-center text-uppercase fs-2 mb-3">Dashboard Consulta</h1>
            <table className="table table-md align-middle text-center fs-5" >
                <thead style={{ position: "sticky", top: "0", zIndex: "2" }}>
                    <tr >
                        <th scope="col" className="w-auto text-nowrap">Paciente</th>
                        <th scope="col" className="w-auto text-nowrap">Alergias</th>
                        <th scope="col">Valoración del triaje</th>
                        <th scope="col" className="w-auto text-nowrap">Consulta</th>
                        <th scope="col" className="w-auto text-nowrap">Tiempo en espera</th>
                        <th scope="col" className="w-auto text-nowrap"></th>
                    </tr>
                </thead>

                <tbody className="list">
                    {
                        store.incomes
                            // .filter(income => income.state === 'Esperando consulta')
                            .map((income) =>
                                <RowConsult key={income.id} income={income} />
                            )
                    }
                </tbody>

            </table>
        </div>
    )
}