export const SpinnerLoad = () => {
    return (
        <div className="text-center">
            <h3>Cargando nuevo documento...</h3>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}