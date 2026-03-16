import './StateBtn.css'

export const StateBtn = ({ test }) => {

    const calculateTime = (time) => {
        const diffMs = new Date() - new Date(time);
        const diffMin = Math.floor(diffMs / 60000);
        if (diffMin < 1) return 'Ahora mismo'
        else if (diffMin < 60) return `Hace ${diffMin} minutos`
        else if (diffMin < 1440) return `Hace ${Math.floor(diffMin / 24)} horas`
        else if (diffMin < 2880) return `Hace ${Math.floor(diffMin / 1440)} dias`
    }

    return (
        <div>
            {
                test.slice().reverse().slice(0, 6).map(t =>
                    <div key={t.id} className="bg-white border d-flex justify-content-between rounded m-2 p-2">
                        <div className="rounded-circle  bg-light d-flex align-items-center justify-content-center" style={{ width: '70px', height: '50px' }}>
                            <i className="fa-regular fa-file-lines fs-4 mx-3"></i>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-start w-100 ms-3">
                            <h3 className="m-0  order-text fw-bolder">{t.order_type}</h3>
                            <p className="m-0 fs-6 text-muted">{t.patient_name}</p>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p className="m-0 rounded-pill text-white text-orderstatus text-uppercase px-2">{t.status}</p>
                            <p className="m-0 text-muted text-hour">{calculateTime(t.created_at)}</p>
                        </div>
                    </div>
                )
            }

        </div>

    )
}