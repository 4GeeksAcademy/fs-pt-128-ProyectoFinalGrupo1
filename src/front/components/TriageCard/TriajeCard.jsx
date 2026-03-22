export const TriageCard = ({ valoration_triage, nurse }) => {
    return (
        <div className="container">
            <div className="border border-secondary rounded mt-2 container w-100 consultation-container">
                <h2 className="mt-1 mt-1 fs-5 fw-semibold">Valoración de triaje realizada por: {nurse} </h2>
                <p className="border border bg-white shadow-sm rounded mt-2 mb-2 d-flex container">{valoration_triage == null ? 'No paso aun por triaje' : valoration_triage}</p>
            </div>
        </div>
    )
}