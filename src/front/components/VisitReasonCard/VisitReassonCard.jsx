export const VisitReasonCard = ({ visitreason, width }) => {
    return (
        <div className={`border border-secondary rounded ms-1 mt-2 container w-50 consultation-container ${width}`}>
            <h2 className="mt-1 mt-1 fs-5 fw-semibold">Motivo de la consulta</h2>
            <p className="p-0">{visitreason}</p>
        </div>
    )
}