export const TriageCard = ({ valoration_triage, nurse }) => {
    return (
        <div className="container">
            <div className="border border-secondary rounded mt-2 container w-100 consultation-container">
                <h2 className="mt-1 mt-1 fs-5 fw-semibold">Valoración de triaje realizada por: {nurse} </h2>
                <p className="p-0 mb-1 label-custom">{valoration_triage == null ? 'No paso aun por triaje' : valoration_triage}</p>
            </div>
        </div>
    )
}