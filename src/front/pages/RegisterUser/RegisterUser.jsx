export const RegisterUser = () => {
    return (
        <main className="container mt-5">
            <div className="border rounded p-3">
                <div className="d-flex justify-content-center">
                    <h2 className="mt-2 mb-2">Administrador de usuarios</h2>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </main >
    )
}