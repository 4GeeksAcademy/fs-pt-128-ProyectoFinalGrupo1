import { useEffect, useState } from "react"
import { getIncomeTest, postOrders } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { SpinnerLoad } from "../../components/Spinner/SpinnerLoad"
import './MedicalTest.css'
import { countRequested } from "../../utils/countRequest"
import { StateBtn } from "../../components/StateBtn/StateBtn"
import { UrgencyBtn } from "../../components/UrgencyBtn/UrgencyBtn"
import { SpecialtyBtn } from "../../components/SpecialtyBtn/SpecialtyBtn"
import { QuickActions } from "../../components/QuickActions/QuickActions"
import { isRecentEnough } from "../../utils/isRecentEnough"



export const MedicalTest = () => {
    const { store, dispatch } = useGlobalReducer()
    const [isLoading, setIsLoading] = useState(false)
    const [btn, setBtn] = useState('StateBtn')

    const criticalPacient1 = store.test.filter(t => (Number(t.urgency) === 1)).length
    const criticalPacient2 = store.test.filter(t => (Number(t.urgency) === 2)).length
    const criticalPacient = criticalPacient1 + criticalPacient2
    const oldestPatient = store.test.filter(t => t.status == 'Solicitada').sort((a, b) => a.id - b.id).slice(0, 6).length
    const sendPending = store.test.filter(t => t.status === 'Pendiente').length
    const pendingCount = store.test.filter(t => {
        const isFinalized = t.status === 'Finalizado'
        const isRecent = isRecentEnough(t.created_at);

        if (isFinalized) return true
        if (isFinalized && isRecent) return true
        return false
    }).length;

    useEffect(() => {
        getIncomeTest(dispatch)
    }, [])

    return (
        <div>
            <div className="border-bottom mt-2 d-flex align-items-center" style={{ height: '53px' }} >
                <h2 className="title w-100 text-start fs-6">Control de pruebas</h2>
            </div>

            {
                isLoading ? (
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
                        <h2 className="title">Cagando datos del paciente...</h2>
                        <SpinnerLoad />
                    </div>
                ) : (
                    <div className="d-flex flex-column container-fluid mt-2 ">
                        <h2 className="title w-100 text-start fs-3">Control de pruebas</h2>
                        <p>Gestión de pruebas según su estado</p>
                        <div className="container d-flex">
                            <div className="border border-secondary rounded me-1 mb-2 w-25 container consultation-container ">
                                <h4 className="title title-ordercard mt-1 text-muted">Pruebas solicitadas</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-file-medical text-primary fs-4 me-2"></i>
                                    {countRequested(store.test, "Solicitada")}
                                </p>
                            </div>
                            <div className="border border-secondary rounded me-1 mb-2  w-25 container consultation-container">
                                <h4 className="title title-ordercard mt-1 text-muted">Pruebas en proceso</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-microscope text-success me-2"></i>
                                    {countRequested(store.test, "En proceso")}
                                </p>
                            </div>
                            <div className="border border-secondary rounded mb-2 me-1  w-25 container consultation-container">
                                <h4 className="title title-ordercard mt-1 text-muted">pendiente de envío</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-box-archive text-warning fs-4 me-2"></i>
                                    {countRequested(store.test, "Pendiente")}
                                </p>
                            </div>
                            <div className="border border-secondary rounded mb-2  w-25 container consultation-container">
                                <h4 className="title title-ordercard mt-1 text-muted">Pruebas finalizadas</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-check-double text-success fs-4 me-2"></i>
                                    {pendingCount}
                                </p>
                            </div>
                        </div>
                        <div className="container d-flex mt-1">
                            <div className="border border-secondary rounded  me-2 container consultation-container " style={{ height:'625px', maxHeight: '625px', overflowY: 'auto' }}>
                                <h6 className="mt-3 mx-2 fw-bolder fs-5">Actividad reciente</h6>
                                <p className="mx-2">Ultimas acciones realizadas en el sistema</p>
                                <div className="d-flex justify-content-center bg-btn rounded m-2">
                                    <button
                                        className={`btn btn-custom mx-1 mt-1 mb-1 fw-bolder ${btn === 'StateBtn' ? 'active' : ''}`}
                                        onClick={() => setBtn('StateBtn')}>Estado</button>
                                    <button className={`btn btn-custom mx-auto mt-1 mb-1 fw-bolder ${btn === 'UrgencyBtn' ? 'active' : ''}`}
                                        onClick={() => setBtn('UrgencyBtn')}>Urgentes</button>
                                    <button className={`btn btn-custom mx-1 mt-1 mb-1 fw-bolder ${btn === 'SpecialtyBtn' ? 'active' : ''}`}
                                        onClick={() => setBtn('SpecialtyBtn')}>Especialidades</button>
                                </div>
                                <div className="">
                                    {
                                        btn === 'StateBtn' && <StateBtn test={store.test} />
                                    }
                                    {
                                        btn === 'UrgencyBtn' && <UrgencyBtn urgency={store.test.urgency} test={store.test} />
                                    }
                                    {
                                        btn === 'SpecialtyBtn' && <SpecialtyBtn test={store.test} />
                                    }
                                </div>

                            </div>
                            <div className="border border-secondary rounded  container consultation-container" style={{ maxHeight: '625px' }}>
                                <h6 className="mt-3 mx-2 fw-bolder fs-5">Acciones rapidas</h6>
                                <p className="mx-2 " >Funciones principales</p>
                                <QuickActions criticalPacient={criticalPacient} oldestPatient={oldestPatient} sendPending={sendPending} />
                            </div>

                        </div>
                    </div>
                )
            }
        </div >
    )
}