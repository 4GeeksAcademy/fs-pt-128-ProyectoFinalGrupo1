import useGlobalReducer from "../../hooks/useGlobalReducer"
import { calculateAge } from "../../utils/calculateAge"

export const PatientCardW = ({ patient_dni, patient_firstname, patient_lastname, patient_birthdate, patient_allergies, patient_gender }) => {
    return (
        <div className='border border-secondary rounded me-1 mt-2 container consultation-container w-100'>
            <h2 className="mt-1 fs-5 fw-semibold">Datos del paciente</h2>
            <div className="row mx-auto">
                <div className="col-12 col-md-2 mb-3 d-flex">
                    <p className="p-0 m-0 me-2 label-custom fw-semibold">D.N.I:</p>
                    <p className="p-0 m-0 text-uppercase">{patient_dni}</p>
                </div>
                <div className="col-12 col-md-6 mb-3 d-flex">
                    <p className="p-0 m-0 me-2 label-custom fw-semibold">Nombre y apellidos: </p>
                    <p className="p-0 m-0">{patient_firstname} {patient_lastname}</p>
                </div>
                <div className="col-12 col-md-2 mb-3 d-flex">
                    <p className="p-0 m-0 me-2 label-custom fw-semibold">Sexo:</p>
                    <p className="p-0 m-0">{patient_gender}</p>
                </div>
                
                <div className="col-12 col-md-2 mb-3 d-flex">
                    <p className="p-0 m-0 me-2 label-custom fw-semibold">Edad:</p>
                    <p className="p-0 m-0">{patient_birthdate ? calculateAge(patient_birthdate) : 'Calculando..'}</p>
                </div>
                {
                    (patient_allergies?.replace(/[{ }]/g, "").length > 0) ?
                        <div className="col-12  mb-3 d-flex">
                            <p className='text-danger p-0 m-0 me-2 label-custom fw-semibold'>Alergias:</p>
                            <p className="p-0 m-0">{patient_allergies?.replace(/[{ }]/g, "")}</p>
                        </div>
                        : ''
                }
            </div>
        </div>
    )
}