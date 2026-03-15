import { useEffect, useState } from "react"
import { getIncomeTest } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { SpinnerLoad } from "../../components/Spinner/SpinnerLoad"
import './MedicalTest.css'

export const MedicalTest = () => {
    const { store, dispatch } = useGlobalReducer()
    const [isLoading, setIsLoading] = useState(false)
    const countRequested = () => {
        let counter = 0
        for (let test of store.test) {
            if (test.status === "Solicitada") {
                counter += 1
            }
        }
        return counter
    }
    const requested = countRequested()
    console.log(store)
    useEffect(() => {
        getIncomeTest(dispatch)
    }, [])
    return (
        <div>
            {
                isLoading ? (
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
                        <h2>Cagando datos del paciente...</h2>
                        <SpinnerLoad />
                    </div>
                ) : (
                    <div className="d-flex flex-column container mt-2 ">
                        <h2 className="title w-100 text-center">Control de pruebas</h2>
                        <div className="container d-flex">
                            <div className="border border-secondary rounded me-1 mt-2 container consultation-container">
                                <h4 className="title title-ordercard">Pruebas solicitadas</h4>
                                <p className="text-dark">{requested}</p>
                            </div>
                            <div className="border border-secondary rounded me-1 mt-2 container consultation-container">
                                <h4 className="title title-ordercard">Pruebas en proceso</h4>
                            </div>
                            <div className="border border-secondary rounded mt-2 container consultation-container">
                                <h4 className="title title-ordercard">Pruebas pendiente de envío</h4>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}