export const SpinnerButton = ({ text }) => {
    return (
        <div className="d-flex align-items-center">
            {text}
            <span className="spinner-border spinner-border-sm ms-2" aria-hidden="true"></span>
        </div>

    )
}