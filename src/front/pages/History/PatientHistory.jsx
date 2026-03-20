import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getPatients } from "../../APIServices/BACKENDservices";
import { Link } from "react-router-dom";



export const PatientsHistory = () => {




    const { store, dispatch } = useGlobalReducer()
    const [filter, setFilter] = useState("")




    const handleChange = (e) => {
        e.preventDefault()
        setFilter(e.target.value)
    }




    useEffect(() => {
        getPatients(dispatch)
    }, [])


    return (
        <>
            <div className="container mt-5 text-center">
                <h1 className="title w-100 mb-5 text-center">Historial</h1>
                <form className="d-flex flex-column justify-content-center align-items-center" >
                    <div className="mb-3">
                        <input type="email" onChange={handleChange} className="form-control border" placeholder="Buscar DNI" aria-describedby="emailHelp" />
                    </div>
                </form>


                <table className="table table-striped table-hover border box-shadow">
                    <thead>
                        <tr>
                            <th scope="col">DNI</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store.patients
                                .filter((patient) => {
                                    return filter.toLowerCase() === "" ? patient : patient.dni.toLowerCase().includes(filter)
                                })
                                .map(patient => {
                                    return (

                                        <tr key={patient.dni} className="border">
                                            <th scope="row">{patient.dni}</th>
                                            <td>{patient.firstname}</td>
                                            <td>{patient.lastname}</td>
                                            <td>
                                                <Link to={`/patientsHistory/${patient.dni}`}>
                                                    <button className="btn btn-dark">Ver historial</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );


}
