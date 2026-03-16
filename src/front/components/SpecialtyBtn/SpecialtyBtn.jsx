export const SpecialtyBtn = ({ test }) => {

    const tests = [];
    const testsList = new Set();

    test.forEach(t => {
        if (!testsList.has(t.order_type)) {
            testsList.add(t.order_type);
            tests.push({
                name: t.order_type,
                total: 1,
                urgency: t.urgency < 3 ? 1 : 0,
            });
        } else {
            const s = tests.find(s => s.name === t.order_type);
            s.total++;
            if (t.urgency < 3) s.urgencys++;
        }
    });
    return (
        <div>
            {
                tests.map((t) => (
                    <div key={t.name} className="bg-white border rounded p-2 m-2 shadow-sm d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center " style={{ width: '60px', height: '60px' }}>
                                <i className='fa-regular fa-file-lines fs-3 text-dark'></i>
                            </div>

                            <div className="ms-3">
                                <h4 className="mb-0 title order-text  fw-bold">{t.name.toUpperCase()}</h4>
                                <span className="text-muted small">{t.total} pruebas en total</span>
                            </div>
                        </div>

                        <div className="text-end">
                            {t.urgency > 0 && (
                                <div className="badge text-uppercase bg-danger rounded-pill mb-1 d-block">
                                    <p className="m-0">{t.urgency} Urgentes</p>
                                </div>
                            )}
                            <button className="btn btn-sm btn-outline-dark mt-2">
                                Ver lista →
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}