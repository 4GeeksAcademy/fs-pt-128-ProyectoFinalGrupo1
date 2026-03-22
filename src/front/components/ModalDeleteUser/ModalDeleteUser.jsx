import { deleteUser, getUser } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"

export const ModalDeleteUser = ({ user }) => {

    const { store, dispatch } = useGlobalReducer()
    const handlerClick = async () => {
        await deleteUser(user)
        await getUser(dispatch)
        return
    }

    return (
        <>
            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                <i className="fa-solid fa-trash"></i>
            </button>

            <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title border-0 title fs-6" id="deleteUserModalLabel">Se va a proceder con la eliminación</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body border-0 ">
                            ¿Desea continuar con la eliminación del usuario?
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button"
                                class="btn btn-danger"
                                onClick={handlerClick}
                                data-bs-dismiss="modal">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}