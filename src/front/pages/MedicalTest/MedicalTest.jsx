import { useEffect, useState } from "react"
import { getIncomeTest } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { SpinnerLoad } from "../../components/Spinner/SpinnerLoad"
import './MedicalTest.css'
import { countRequested } from "../../utils/countRequest"
import { StateBtn } from "../../components/StateBtn/StateBtn"
import { UrgencyBtn } from "../../components/UrgencyBtn/UrgencyBtn"
import { renderToStaticNodeStream } from "react-dom/server"
import { SpecialtyBtn } from "../../components/SpecialtyBtn/SpecialtyBtn"



export const MedicalTest = () => {
    const { store, dispatch } = useGlobalReducer()
    const [isLoading, setIsLoading] = useState(false)
    const [btn, setBtn] = useState('StateBtn')

    console.log(store)
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
                    <div className="d-flex flex-column container-fluid mt-2  ">
                        <h2 className="title w-100 text-start fs-3">Control de pruebas</h2>
                        <p>Gestión de pruebas según su estado</p>
                        <div className="container d-flex">
                            <div className="border border-secondary rounded me-1 mb-2 container consultation-container ">
                                <h4 className="title title-ordercard mt-1 text-muted">Pruebas solicitadas</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-file-medical text-primary fs-4 me-2"></i>
                                    {countRequested(store.test, "Solicitada")}
                                </p>
                            </div>
                            <div className="border border-secondary rounded me-1 mb-2 container consultation-container">
                                <h4 className="title title-ordercard mt-1 text-muted">Pruebas en proceso</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-microscope text-success me-2"></i>
                                    {countRequested(store.test, "Precesada")}
                                </p>
                            </div>
                            <div className="border border-secondary rounded mb-2 me-1 container consultation-container">
                                <h4 className="title title-ordercard mt-1 text-muted">pendiente de envío</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-box-archive text-warning fs-4 me-2"></i>
                                    {countRequested(store.test, "Pendiente")}
                                </p>
                            </div>
                            <div className="border border-secondary rounded mb-2 container consultation-container">
                                <h4 className="title title-ordercard mt-1 text-muted">Pruebas finalizadas</h4>
                                <p className="text-dark fs-4 fw-bolder">
                                    <i className="fa-solid fa-check-double text-success fs-4 me-2"></i>
                                    {countRequested(store.test, "Finalizadas")}
                                </p>
                            </div>
                        </div>
                        <div className="container d-flex mt-2">
                            <div className="border border-secondary rounded  me-2 container consultation-container " style={{ maxHeight: '625px', overflowY: 'auto' }}>
                                <h6 className="mt-3 mx-2 fw-bolder fs-5">Actividad reciente</h6>
                                <p className="mx-2 " >Ultimas acciones realizadas en el sistema</p>
                                <div className="d-flex justify-content-center bg-btn rounded m-2">
                                    <button
                                        className={`btn btn-custom mx-1 mt-1 mb-1 fw-bolder ${btn === 'StateBtn' ? 'active' : ''}`}
                                        onClick={() => setBtn('StateBtn')}>Estado</button>
                                    <button className={`btn btn-custom mx-auto mt-1 mb-1 fw-bolder ${btn === 'UrgencyBtn' ? 'active' : ''}`}
                                        onClick={() => setBtn('UrgencyBtn')}>Urgentes</button>
                                    <button className={`btn btn-custom mx-1 mt-1 mb-1 fw-bolder ${btn === 'SpecialtyBtn' ? 'active' : ''}`}
                                        onClick={() => setBtn('SpecialtyBtn')}>Pacientes</button>
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
                            <div className="border border-secondary rounded mt-1 container consultation-container" style={{ minHeight: '610px' }}>
                                comenzar
                                Notificar Incidencia
                                Adjuntar Resultado
                            </div>

                        </div>
                    </div>
                )
            }
        </div >
    )
}