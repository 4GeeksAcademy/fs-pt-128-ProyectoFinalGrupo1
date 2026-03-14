export const SpinnerButton = ({ text }) => {
    return (
        <>
            {text}
            <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
        </>

    )
}