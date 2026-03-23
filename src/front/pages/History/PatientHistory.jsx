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

    const f = store.patients
        .filter((patient) => {
            const incomeAlta = store.incomesAlta?.find(i => i.patient_dni == patient.dni)
            if (!incomeAlta) return false
            return filter.toLowerCase() === "" ? patient : patient.dni.toLowerCase().includes(filter)
        })

    useEffect(() => {
        getPatients(dispatch)
    }, [])


    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Historial de pacientes</h2>
            </div>
            <div className="container-fluid">
                <h1 className="title w-100 text-start fs-3 mt-2">Historial de paciente en alta</h1>
                <p>Gestión de historial de pacientes dados de alta</p>
                <div className="container d-flex justify-content-center mb-2 align-items-center">

                    <form className="d-flex flex-column justify-content-center align-items-center" >
                        <div className="mb-3">
                            <input type="email" onChange={handleChange} className="form-control border" placeholder="Buscar DNI" aria-describedby="emailHelp" />
                        </div>
                    </form>


                    <table className="table align-middle table-striped table-hover border box-shadow">
                        <thead>
                            <tr>
                                <th scope="col">DNI</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellidos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                f.length > 0 ?
                                    f
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
                                        }) : (
                                        <tr>
                                            <td colSpan="3">
                                                No hay registros
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );


}
