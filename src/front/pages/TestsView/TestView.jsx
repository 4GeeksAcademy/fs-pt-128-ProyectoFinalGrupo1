import { useEffect, useState } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { useParams } from "react-router-dom"
import { changeStatus, getIncome, getIncomeTest } from "../../APIServices/BACKENDservices"
import { PatientCardW } from "../../components/PatientCardW/PatientCardW"
import { SpinnerButton } from "../../components/Spinner/SpinnerButton"
import { ValidationTestData } from "../../components/ValidationTestCard/ValidationTestCard"
import { ExecutationAndDocu } from "../../components/ExecutationAndDocu/ExecutationAndDocu"
import { DocuTestCheck } from "../../components/DocuTestCheck/DocuTestCheck"
import { DocuSend } from "../../components/DocuSend/DocuSend"

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
        else if (testStatus === 'Pendiente') return 3
        else if (testStatus === 'Finalizado') return 4
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

    const handlerClick = async (status) => {
        setLoading(true)
        const response = await changeStatus(id, status)
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
                <h1 className="title w-100 text-start fs-3 mt-1 d-flex">Ficha del paciente para prueba</h1>
                <p>Seguimiento de la prueba y envio del informe</p>
            </div>
            <div className="container d-flex justify-content-center align-items-center rounded">
                <button className={`btn ${test?.status !== 'Solicitada' ? 'btn-light text-dark' : 'btn-dark text-white '}  d-flex align-items-center text-secondary border-0 mx-2 my-1`} disabled={test?.status !== 'Solicitada'}>
                    <span className="badge rounded-circle bg-secondary me-1 mt-1 d-flex justify-content-center" style={{ width: '20px', height: '20px' }}>
                        {statusIcon > 1 ? <i className="fa-solid fa-check"></i> : '1'}
                    </span>
                    Validación</button>
                <p className="m-0"><i className="fa-solid fa-chevron-right text-secondary"></i></p>
                <button className={`btn ${test?.status !== 'En proceso' ? 'btn-light text-dark' : 'btn-dark text-white '}  d-flex align-items-center text-secondary border-0 mx-2 my-1`} disabled={test?.status !== 'En proceso'}>
                    <span className="badge rounded-circle bg-secondary me-1 mt-1 d-flex justify-content-center" style={{ width: '20px', height: '20px' }}>
                        {statusIcon > 2 ? <i className="fa-solid fa-check"></i> : '2'}
                    </span>
                    Ejecucion y documentación</button>
                <p className="m-0"><i className="fa-solid fa-chevron-right text-secondary"></i></p>
                <button className={`btn ${test?.status !== 'Pendiente' ? 'btn-light text-dark' : 'btn-dark text-white '}  d-flex align-items-center text-secondary border-0 mx-2 my-1`} disabled={test?.status !== 'Pendiente'}>
                    <span className="badge rounded-circle bg-secondary me-1 mt-1 d-flex justify-content-center" style={{ width: '20px', height: '20px' }}>
                        {statusIcon > 3 ? <i className="fa-solid fa-check"></i> : '3'}
                    </span>
                    Control previo envío

                </button>
                <p className="m-0"><i className="fa-solid fa-chevron-right text-secondary"></i></p>
                <button className={`btn ${test?.status !== 'Finalizado' ? 'btn-light text-dark' : 'btn-dark text-white '}  d-flex align-items-center text-secondary border-0 mx-2 my-1`} disabled={test?.status !== 'Finalizado'}>

                    <span className="badge rounded-circle bg-secondary me-1 mt-1 d-flex justify-content-center" style={{ width: '20px', height: '20px' }}>
                        {statusIcon > 4 ? <i className="fa-solid fa-check"></i> : '4'}
                    </span>
                    Archivo y consulta
                </button>
            </div>
            {statusIcon === 1 && <ValidationTestData income={store.income} test={test} onNext={() => handlerClick('En proceso')} loading={loading} />}
            {statusIcon === 2 && <ExecutationAndDocu income={store.income} test={test} onNext={() => handlerClick('Pendiente')} />}
            {statusIcon === 3 && <DocuTestCheck test={test} onNext={() => handlerClick('Finalizado')} />}
            {statusIcon === 4 && <DocuSend income={store.income} test={test} />}
        </div>
    )
}