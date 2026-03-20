import { useState, useEffect } from "react"
import { getIncomes, getIncomeTest } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { QuickActionsConsultation } from "../../components/QuickActions/QuickActionsConsultation"
import { WaitingList } from "../../components/ WaitingList/WaitingList"
import { calculateWaiting } from "../../utils/calculateWaiting"

export const ControlPanelConsult = () => {
    const { store, dispatch } = useGlobalReducer()
    const [isLoading, setIsLoading] = useState()
    const [btn, setBtn] = useState('Waiting')
    const criticalPatient = store.incomes?.filter(s => { if ((s.triage_priority === 1 || s.triage_priority === 2) && (s.state === "Esperando consulta")) return true }).length
    const patientWaiting = store.incomes?.filter(s => s.state === 'Esperando consulta').length
    const pendingTest = store.test.filter(t => t.status !== 'Finalizado').length
    const finaliceTest = store.test.filter(t => t.status === 'Finalizado').length
    const medicalDischarge = store.incomes.filter(income => income.state === 'Alta').length

    const loadPatients = async () => {
        setIsLoading(true)
        const response = await getIncomes(dispatch)

        if (response) {
            setIsLoading(false)
            return
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getIncomeTest(dispatch)
        loadPatients()
    }, [])
    console.log(store.incomes)
    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Panel de control consulta</h2>
            </div>
            <div className="d-flex flex-column container-fluid mt-2 ">
                <h2 className="title w-100 text-start fs-3">Panel de control consulta</h2>
                <p>Gestión del consulta</p>
                <div className="container d-flex">

                    <div className="border border-secondary rounded me-1 mb-2 w-25 container consultation-container ">
                        <h4 className="title title-ordercard mt-1 text-muted">Pacientes en espera</h4>
                        <p className="text-dark fs-4 fw-bolder">
                            <i className="fa-solid fa-user-clock text-secondary fs-4 me-2"></i>
                            <span className="fs-5 title"></span>
                            {patientWaiting ? patientWaiting : 0}
                        </p>
                    </div>
                    <div className="border border-secondary rounded me-1 mb-2 w-25 container consultation-container ">
                        <h4 className="title title-ordercard mt-1 text-muted">Pruebas solicitadas</h4>
                        <p className="text-dark fs-4 fw-bolder">
                            <i className="fa-solid fa-vial-circle-check text-warning fs-4 me-2"></i>
                            <span className="fs-5 title"></span>
                            {pendingTest ? pendingTest : 0}
                        </p>
                    </div>
                    <div className="border border-secondary rounded me-1 mb-2 w-25 container consultation-container ">
                        <h4 className="title title-ordercard mt-1 text-muted">Pruebas finalizadas</h4>
                        <p className="text-dark fs-4 fw-bolder">
                            <i className="fa-solid fa-clipboard-check text-success fs-4 me-2"></i>
                            <span className="fs-5 title"></span>
                            {finaliceTest ? finaliceTest : 0}
                        </p>
                    </div>
                    <div className="border border-secondary rounded mb-2  w-25 container consultation-container">
                        <h4 className="title title-ordercard mt-1 text-muted">Pacientes dados de alta</h4>
                        <p className="text-dark fs-4 fw-bolder">
                            <i className="fa-solid fa-door-open text-primary fs-4 me-2"></i>
                            <span className="fs-5 title"></span>
                            {medicalDischarge ? medicalDischarge : 0}
                        </p>
                    </div>
                </div>
                <div className="container d-flex mt-1">
                    <div className="border border-secondary rounded  me-2 container consultation-container " style={{ height: '625px', maxHeight: '625px', overflowY: 'auto' }}>
                        <h6 className="mt-3 mx-2 fw-bolder fs-5">Actividad reciente</h6>
                        <p className="mx-2">Ultimas acciones realizadas en el sistema</p>
                        <div className="d-flex justify-content-center bg-btn rounded m-2">
                            <button
                                className={`btn btn-custom mx-1 mt-1 mb-1 fw-bolder ${btn === 'Waiting' ? 'active' : ''}`}
                                onClick={() => setBtn('Waiting')}>Lista de espera</button>
                        </div>
                        <div className="">
                            {btn === 'Waiting' && store.incomes
                                .filter(income => income.state === 'Esperando consulta')
                                .slice().reverse().slice(0, 6)
                                .map(income =>
                                    <WaitingList key={income.id} income={income} />)}
                        </div>
                    </div>
                    <div className="border border-secondary rounded  container consultation-container" style={{ maxHeight: '625px' }}>
                        <h6 className="mt-3 mx-2 fw-bolder fs-5">Acciones rapidas</h6>
                        <p className="mx-2">Funciones principales</p>
                        <QuickActionsConsultation criticalPacients={criticalPatient} />
                    </div>
                </div>
            </div>
        </div>
    )
}