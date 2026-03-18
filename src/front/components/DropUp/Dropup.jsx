import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup } from 'react-bootstrap';
import './Dropup.css'
import { useNavigate } from 'react-router-dom';


export const Dropup = () => {
    return (
        <>


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
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#logOutModal">
                        <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>
                        Cerrar sesión

                    </button>
                </Dropdown.Item>
            </DropdownButton>
        </>
    );
}