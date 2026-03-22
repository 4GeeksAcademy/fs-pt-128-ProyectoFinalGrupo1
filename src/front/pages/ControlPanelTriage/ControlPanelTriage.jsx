import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { getIncomes } from "../../APIServices/BACKENDservices";
import { calculateWaiting } from "../../utils/calculateWaiting";
import { calculateMedia } from "../../utils/calculateMedia";
import { QuickActionsTriage } from "../../components/QuickActions/QuickActionsTriaje";
import { PatientWaitingCard } from "../../components/PatientWaitingCard/PatientWaitingCard";
import { PatientCriticalCard } from "../../components/PatientCriticalCard/PatientCriticalCard";
import { SpinnerLoad } from "../../components/Spinner/SpinnerLoad";

export const ControlPanelTriage = () => {

    const { store, dispatch } = useGlobalReducer()
    const [isLoading, setIsLoading] = useState()
    const [btn, setBtn] = useState('Waiting')

    const patientWaiting = store.incomes?.filter(s => s.state === 'En espera de triaje').length
    const criticalPatient = store.incomes?.filter(s => { if ((s.triage_priority === 1 || s.triage_priority === 2) && (s.state === 'En espera de triaje')) return true }).length
    const timeWaiting = calculateWaiting(calculateMedia(store.incomes))
    const valoratedPatients = store.incomes?.filter(s => s.state == 'Esperando consulta').length
    const criticalPacients = store.incomes.filter(income =>
        (Number(income.triage_priority) === 1 || Number(income.triage_priority) === 2)
        && income.state === 'En espera de triaje'
    ).length
    const oldestPatient = store.incomes.filter(income => income.state == 'En espera de triaje').sort((a, b) => a.id - b.id).slice(0, 6).length

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
        loadPatients()
        const interval = setInterval(() => {
            loadPatients()
        }, 300000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
                    <h2 className="title">Cargando datos del paciente...</h2>
                    <SpinnerLoad />
                </div>
            ) :
                (<div>
                    <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                        <h2 className="title w-100 text-start fs-6">Panel de control triaje</h2>
                    </div>
                    <div className="d-flex flex-column container-fluid mt-2 ">
                        <h2 className="title w-100 text-start fs-3">Panel de control triaje</h2>
                        <p>Gestión del triaje</p>
                        <div className="container d-flex">
                            <div className="border border-secondary rounded me-1 mb-2 w-25 container consultation-container ">
                                <h4 className="title title-ordercard mt-1 text-muted">Pacientes en espera</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-user-clock text-secondary fs-4 me-2"></i>
                                    {patientWaiting ? patientWaiting : 0}
                                </p>
                            </div>
                            <div className="border border-secondary rounded me-1 mb-2  w-25 container consultation-container">
                                <h4 className="title title-ordercard mt-1 text-muted">Pacientes criticos</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-triangle-exclamation text-danger fs-4 me-2"></i>
                                    {criticalPatient ? criticalPatient : 0}
                                </p>
                            </div>
                            <div className="border border-secondary rounded mb-2 me-1  w-25 container consultation-container">
                                <h4 className="title title-ordercard mt-1 text-muted">Pacientes valorados</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-user-check text-warning fs-4 me-2"></i>
                                    {valoratedPatients}
                                </p>
                            </div>
                            <div className="border border-secondary rounded mb-2  w-25 container consultation-container">
                                <h4 className="title title-ordercard mt-1 text-muted">Tiempo medio de espera</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className={`fa-solid fa-hourglass-half 
                                ${(parseInt(timeWaiting) >= 41 || timeWaiting?.includes('horas')) ?
                                            'text-danger' : parseInt(timeWaiting) >= 21 ?
                                                'text-warning' : 'text-success'} fs-4 me-2`}></i>
                                    <span className="fs-5 title">{timeWaiting}</span>
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
                                        onClick={() => setBtn('Waiting')}>En espera</button>
                                    <button
                                        className={`btn btn-custom mx-1 mt-1 mb-1 fw-bolder ${btn === 'Critical' ? 'active' : ''}`}
                                        onClick={() => setBtn('Critical')}>Pacientes criticos</button>

                                </div>
                                <div className="">
                                    {btn === 'Waiting' && <PatientWaitingCard incomes={store.incomes} />}
                                    {btn === 'Critical' && store.incomes.filter(s => (Number(s.triage_priority) < 3) && s.state === 'En espera de triaje')
                                        .sort((a, b) => a.triage_priority - b.triage_priority)
                                        .map(income => <PatientCriticalCard key={income.id} income={income} />)}
                                </div>
                            </div>
                            <div className="border border-secondary rounded  container consultation-container" style={{ maxHeight: '625px' }}>
                                <h6 className="mt-3 mx-2 fw-bolder fs-5">Acciones rapidas</h6>
                                <p className="mx-2 " >Funciones principales</p>
                                <QuickActionsTriage criticalPacients={criticalPacients} oldestPatient={oldestPatient} />
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}