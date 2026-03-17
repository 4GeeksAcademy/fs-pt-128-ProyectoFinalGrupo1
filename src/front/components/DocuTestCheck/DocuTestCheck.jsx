import { useState } from "react";
import { reloadFile } from "../../APIServices/APIServices";
import { changeStatus, getIncomeTest } from "../../APIServices/BACKENDservices";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { SpinnerButton } from "../Spinner/SpinnerButton";
import { SpinnerLoad } from "../Spinner/SpinnerLoad";

export const DocuTestCheck = ({ test, onNext }) => {
    const imageUrl = test.results.replace(".pdf", ".jpg");
    const { store, dispatch } = useGlobalReducer()
    const [selectFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handlerClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('file', selectFile)
        const response = await reloadFile(test.id, formData)
        if (response.ok) {
            setLoading(false)
            setIsLoading(true)
            await getIncomeTest(dispatch)
            setIsLoading(false)
            setSelectedFile(null)
        }
        if (!response.ok) {
            setLoading(false)
            setError(response.error)
            return
        }
    }

    console.log(test.results)
    return (
        <>
            <div className="container d-flex justify-content-between align-items-center p-0 mt-2">
                <h2 className="title fs-4">Resultados de: {test.order_type}</h2>
                <div class="d-flex">
                    <input class="form-control border rounded form-control-sm " id="formFileSm" type="file" onChange={handleChange} />
                    <button className="btn btn-sm ms-2 btn-dark" onClick={handlerClick}>
                        {loading ? <SpinnerButton text={'Actualizando...'} /> : 'Actualizar'}
                    </button>
                </div>
            </div>
            <div className="border border-secondary rounded mt-2 container w-100 consultation-container" >
                {
                    isLoading ?
                        (<SpinnerLoad className="w-100 mt-2 me-0" style={{ height: '63vh ' }} />) :
                        (<div className="w-100 mt-2 me-0" style={{ height: '63vh ', overflowY: 'auto', overflowX: 'hidden' }}>
                            <img src={imageUrl} alt="Documentación" className="w-100" />
                        </div>)
                }
            </div>
            <div className="d-flex justify-content-center mt-1">
                <button className="btn btn-sm btn-dark" onClick={onNext}>Continuar</button>
            </div>
        </>

    )
}