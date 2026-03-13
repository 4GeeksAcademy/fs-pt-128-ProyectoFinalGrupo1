import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup } from 'react-bootstrap';
import './Dropup.css'
import { useNavigate } from 'react-router-dom';


export const Dropup = () => {

    const navigate = useNavigate()
    const logOut = (e) => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        
                        <div className="modal-body text-center">
                            
                            <h1 className="modal-title fs-5" id="exampleModalLabel">¿Cerrar sesión?</h1>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={logOut}>Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </div>

            <DropdownButton
                as={ButtonGroup}
                key="up"
                id="dropdown-button-drop-up"
                drop="up"
                variant="outline-dark"
                title={<i className="fa-solid fa-angle-up"></i>}
                className="custom-dropdown"
            >
                {/* <Dropdown.Divider /> */}
                <Dropdown.Item eventKey="1" className='text-danger d-flex align-items-center' >
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>
                        Cerrar sesión

                    </button>
                </Dropdown.Item>
            </DropdownButton>



        </>
    );
}