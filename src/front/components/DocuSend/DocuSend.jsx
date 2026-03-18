import { PatientCardW } from "../PatientCardW/PatientCardW"

export const DocuSend = ({ income, test }) => {
    return (
        <div className="container">
            <PatientCardW width={'w-100'}
                patient_dni={income.patient_dni}
                patient_firstname={income.patient_firstname}
                patient_lastname={income.patient_lastname}
                patient_birthdate={income.patient_birthdate}
                patient_allergies={income.patient_allergies} />
            <div className='border border-secondary rounded me-1 mt-2 container consultation-container w-100'>
                <h2 className="title fs-3 mt-3">Tipo de analitica realizada</h2>
                <p className="title fs-5">{test?.order_type}</p>
            </div>
            <div className='border border-secondary rounded me-1 mt-2 container consultation-container w-100'>
                <h2 className="title fs-4 mt-3">Observaciones anotadas durante la prueba:</h2>
                <div className="bg-white rounded shadow px-2">
                    <p className="title fs-5">dasdadsaasda</p>
                </div>

                <h2 className="title fs-4 mt-3">Incidencias transcurridas en la prueba</h2>
                <div className="bg-white rounded shadow px-2">
                    <p className="title fs-5">dasdadsaasda</p>
                </div>
            </div>
            <div className="d-flex container justify-content-center mt-4">
                <button className="btn btn-dark me-2">Ver resultados</button>
                <button className="btn btn-secondary ms-2">Cerrar</button>
            </div>
        </div>


    )
}