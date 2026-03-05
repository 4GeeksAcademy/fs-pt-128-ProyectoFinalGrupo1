import { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { getPatient, getUser } from "../../APIServices/BACKENDservices"
import { useParams } from "react-router-dom"


export const IncomeForm = () => {

    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()

    const [incomeForm, setIncomeForm] = useState({
        id_patient: id,
        patient_name: "",
        id_doctor: "",
        id_nurse: "",
        reason_consultation: "",
        triage_priority: "",
        diagnosis: "",
        state: ""
    })




    const handleChange = (e) => {
        setIncomeForm({
            ...incomeForm,
            [e.target.name]: e.target.value
        })
    }

    



    // const asignPatient = async () => {
    //     await getPatient(dispatch, id)
    //     if (store.patient){
    //         setIncomeForm({...incomeForm,
    //             patient_name : store.patient.firstname
    //         })
    //     }


    // }

    console.log(incomeForm)
    


   useEffect(() => {
    getUser(dispatch)
    getPatient(dispatch, id)
}, [])

useEffect(() => {
    if (store.patient?.firstname) {
        setIncomeForm({
            ...incomeForm,
            patient_name: store.patient.firstname,
            reason_consultation : store.patient.reason
        })
    }
}, [store.patient])

    return (
        <>
            <div className="container">
                <form>
                    <div className="row">
                        <div className="col-12 col-md-4 mb-3">
                            <label htmlFor="paciente" className="form-label">Paciente</label>
                            <input
                                type="text"
                                placeholder={incomeForm.patient_name}
                                className="form-control rounded-pill"
                                id="paciente"
                                disabled
                            />
                        </div>

                        <div className="col-12 col-md-4 mb-3">
                            <label htmlFor="doctor" className="form-label">Doctor</label>
                            <select className="form-select rounded-pill" onChange={handleChange} name="id_doctor" value={incomeForm.id_doctor} aria-label="Default select example">
                                <option defaultValue=""></option>
                                {
                                    store.users
                                        .filter(user => user.rol === "Médico")
                                        .map(user => (
                                            <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
                                        ))
                                }
                            </select>
                        </div>

                        <div className="col-12 col-md-4 mb-3">
                            <label htmlFor="enfermero" className="form-label">Enfermero</label>
                            <select className="form-select rounded-pill" onChange={handleChange} name="id_nurse" value={incomeForm.id_nurse} aria-label="Default select example">
                                <option defaultValue=""></option>
                                {
                                    store.users
                                        .filter(user => user.rol === "Enfermero")
                                        .map(user => (
                                            <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
                                        ))
                                }
                            </select>
                        </div>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="razonDeConsulta" className="form-label">
                            Razón de consulta
                        </label>
                        <textarea
                            className="form-control rounded-4 p-3"
                            value={IncomeForm.reason_consultation}
                            name="reason_consultation"
                            onChange={handleChange}
                            id="razonDeConsulta"
                            rows="4"
                        ></textarea>
                    </div>


                    <div className="row">
                        <div className="col-12 col-md-3 mb-3">
                            <label htmlFor="prioridadDeTriaje" className="form-label">
                                Prioridad de triaje
                            </label>
                            <input
                                type="text"
                                value={IncomeForm.triage_priority}
                                name="triage_priority"
                                onChange={handleChange}
                                className="form-control rounded-pill text-center"
                                id="prioridadDeTriaje"
                            />
                        </div>

                        <div className="col-12 col-md-3 mb-3">
                            <label htmlFor="estado" className="form-label">
                                Estado
                            </label>
                            <input
                                value={IncomeForm.state}
                                name="state"
                                onChange={handleChange}
                                type="text"
                                className="form-control rounded-pill text-center"
                                id="estado"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary px-4">
                        Submit
                    </button>

                </form>
            </div>
        </>
    )
}