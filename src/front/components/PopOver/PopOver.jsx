import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const PopOver = ({ patient, allergies }) => {
    return (
        <OverlayTrigger
            trigger="click"
            rootClose
            key="right"
            placement="right"
            overlay={
                <Popover id="popover-positioned-right">
                    <Popover.Header as="h3">Alergias paciente: {patient}</Popover.Header>
                    <Popover.Body>
                        {allergies?.replace("{", "").replace("}", "")}
                    </Popover.Body>
                </Popover>
            }
        >
            <Button className="btn  btn-sm text-danger border border-0 text-decoration-none bg-transparent p-0 ">
                <i className="fa-solid fa-pills me-1"></i>
                Ver más
            </Button>
        </OverlayTrigger>
    );
}
