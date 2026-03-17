import { useState } from "react"
import { SpinnerButton } from "../Spinner/SpinnerButton"
import { getIncomeTest, uploadFile } from "../../APIServices/BACKENDservices"

export const ExecutationAndDocu = ({ income, test, onNext }) => {
    const [selectFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleChange = (e) => {
        setSelectedFile(e.target.files[0])
    }
    console.log(selectFile);

    const handlerSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('file', selectFile)
        const response = await uploadFile(test.id, formData)
        if (response.ok) {
            setLoading(false)
            onNext()
        } if (!response.ok) {
            setLoading(false)
            setError(response.error)
        }
    }
    return (
        <form className="container" onSubmit={handlerSubmit}>
            <div className="border border-secondary rounded mt-2 container w-100 consultation-container">
                <h2 className="mt-1 mt-1 fs-5 fw-semibold">Observaciones Clinicas</h2>
                <textarea
                    className="form-control rounded-1 mb-2 p-3 shadow bg-body-tertiary rounded"
                    name="diagnosis"

                    id="razonDeConsulta"
                    rows="4"
                ></textarea>
            </div>
            <div className="border border-secondary rounded mt-2 container w-100 consultation-container">
                <h2 className="mt-1 mt-1 fs-5 fw-semibold">Incidencias durante la prueba</h2>
                <textarea
                    className="form-control rounded-1 mb-2 p-3 shadow bg-body-tertiary rounded"
                    name="tratamiento"

                    id="razonDeConsulta"
                    rows="4"
                ></textarea>
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="formFileMultiple" className="form-label">Subida de resultados</label>
                <input className="form-control border" type="file" id="formFileMultiple" multiple onChange={handleChange} />
            </div>
            <div className="d-flex justify-content-center mt-2">
                <button className="btn btn-dark text-center">{loading ?
                    (<SpinnerButton text={'Enviando datos'} />)
                    : 'Dar alta al paciente'}</button>
            </div>
        </form>
    )
}