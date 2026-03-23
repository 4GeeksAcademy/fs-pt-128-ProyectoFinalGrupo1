import { PatientCardW } from "../PatientCardW/PatientCardW"
import { SpinnerButton } from "../Spinner/SpinnerButton"

export const ValidationTestData = ({ income, test, onNext, loading }) => {
    return (
        <>
            <div className="container">
                <PatientCardW width={'w-100'}
                    patient_dni={income.patient_dni}
                    patient_firstname={income.patient_firstname}
                    patient_lastname={income.patient_lastname}
                    patient_birthdate={income.patient_birthdate}
                    patient_allergies={income.patient_allergies}
                    patient_gender={income.patient_gender} />
                <div className='border border-secondary rounded me-1 mt-2 container consultation-container w-100'>
                    <h2 className="title fs-3 mt-3">Tipo de analitica solicitada</h2>
                    <p className="title fs-5">{test?.order_type}</p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-dark mt-2 text-center" onClick={onNext} disabled={loading}>
                    {
                        loading ? <SpinnerButton text={'Guardando cambios...'} /> : 'Validar datos del paciente'
                    }
                </button>
            </div>
        </>

    )
}