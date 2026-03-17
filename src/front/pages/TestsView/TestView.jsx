import { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { useParams } from "react-router-dom"
import { changeStatus, getIncome, getIncomeTest } from "../../APIServices/BACKENDservices"
import { PatientCardW } from "../../components/PatientCardW/PatientCardW"
import { SpinnerButton } from "../../components/Spinner/SpinnerButton"

export const TestView = () => {
    const { store, dispatch } = useGlobalReducer()
    const { income_id, id } = useParams()
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const test = store.test.filter(t => t.id == id)[0]
    console.log(test);

    const loadData = async () => {
        setIsLoading(true)
        const response = await getIncome(dispatch, income_id)

        if (response) {
            setIsLoading(false)
            return
        }
        setIsLoading(false)
    }

    const getStatus = (testStatus) => {
        if (testStatus === 'Solicitada') return 1
        else if (testStatus === 'En proceso') return 2
        else if (testStatus === 'Pendiente envio') return 3
        else if (testStatus === 'Finalizada') return 4
    }
    const statusIcon = getStatus(test?.status)
    const testData = async () => {
        setIsLoading(true)
        const response = await getIncomeTest(dispatch)

        if (response) {
            setIsLoading(false)
            return
        }
        setIsLoading(false)
    }

    const handlerClick = async () => {
        setLoading(true)
        const response = await changeStatus(id, 'En proceso')
        if (response.error) {
            setError(response.error)
            return
        }
        await getIncomeTest(dispatch)
        setError("")
        setLoading(false)
        return
    }

    useEffect(() => {
        testData()
        loadData()
    }, [test?.status])

    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Ficha paciente para prueba</h2>
            </div>
            <div className="container-fluid mt-3 container-table" style={{ maxHeight: "80vh", overflowX: "hidden", overflowY: "auto", maxWidht: '100%' }} >
                <h1 className="title w-100 text-start fs-3 mt-2">Ficha del paciente para prueba</h1>
                <p>Seguimiento de la prueba y envio del informe</p>
            </div>
            <div className="container d-flex justify-content-center align-items-center rounded">
                <button className={`btn ${test?.status !== 'Solicitada' ? 'btn-light text-dark' : 'btn-dark text-white '}  d-flex align-items-center text-secondary border-0 mx-2 my-1`} disabled={!test?.status == 'Solicitada'}>
                    <span className="badge rounded-circle bg-secondary me-1 mt-1 d-flex justify-content-center" style={{ width: '20px', height: '20px' }}>
                        {statusIcon > 1 ? <i class="fa-solid fa-check"></i> : '1'}
                    </span>
                    Validación</button>
                <p className="m-0"><i class="fa-solid fa-chevron-right text-secondary"></i></p>
                <button className={`btn ${test?.status !== 'En proceso' ? 'btn-light text-dark' : 'btn-dark text-white '}  d-flex align-items-center text-secondary border-0 mx-2 my-1`} disabled={test?.status !== 'En proceso'}>
                    <span className="badge rounded-circle bg-secondary me-1 mt-1 d-flex justify-content-center" style={{ width: '20px', height: '20px' }}>
                        2
                    </span>
                    Ejecucion y documentación</button>
                <p className="m-0"><i class="fa-solid fa-chevron-right text-secondary"></i></p>
                <button className="btn btn-light d-flex align-items-center text-secondary border-0 mx-2 my-1" disabled>
                    <span className="badge rounded-circle bg-secondary me-1 mt-1 d-flex justify-content-center" style={{ width: '20px', height: '20px' }}>
                        3
                    </span>
                    Control previo envío

                </button>
                <p className="m-0"><i class="fa-solid fa-chevron-right text-secondary"></i></p>
                <button className="btn btn-light d-flex align-items-center text-secondary border-0 mx-2 my-1" disabled>
                    <span className="badge rounded-circle bg-secondary me-1 mt-1 d-flex justify-content-center" style={{ width: '20px', height: '20px' }}>
                        4
                    </span>
                    Archivo y consulta</button>
            </div>
            {statusIcon === 1 &&
                <>
                    {/* COMPONETIZAR */}
                    <div className="container">
                        <PatientCardW width={'w-100'}
                            patient_dni={store.income.patient_dni}
                            patient_firstname={store.income.patient_firstname}
                            patient_lastname={store.income.patient_lastname}
                            patient_birthdate={store.income.patient_birthdate}
                            patient_allergies={store.income.patient_allergies} />
                        <div className='border border-secondary rounded me-1 mt-2 container consultation-container w-100'>
                            <h2 className="title fs-3 mt-3">Tipo de analitica solicitada</h2>
                            <p className="title fs-5">{test?.order_type}</p>
                        </div>

                        <input type="file" name="" id="" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-dark mt-2 text-center" onClick={handlerClick} disabled={loading}>
                            {
                                loading ? <SpinnerButton text={'Guardando cambios...'} /> : 'Validar datos del paciente'
                            }
                        </button>
                    </div>
                </>

            }

        </div>
    )
}