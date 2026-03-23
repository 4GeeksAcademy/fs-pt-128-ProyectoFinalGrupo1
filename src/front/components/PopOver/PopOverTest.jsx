import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';

export const PopOverTest = ({ patient, orders }) => {
    
    return (
        <OverlayTrigger
            trigger="click"
            rootClose
            key="left"
            placement="left"
            overlay={
                <Popover id="popover-positioned-right">
                    <Popover.Header as="h3">Pruebas: {patient}</Popover.Header>
                    <Popover.Body>
                        {
                            orders.map(order => <p key={order.id}>{order.order_type}: {order.status == 'Finalizado' ?
                                <Link to={`/test-result/${order.id_income}`}>Ver resultados</Link> : order.status}</p>)
                        }
                    </Popover.Body>
                </Popover>
            }
        >
            <Button className="btn  btn-sm text-dark border border-0 text-decoration-none bg-transparent p-0 ">
                <i className="fa-solid fa-flask me-1"></i>
                Ver más
            </Button>
        </OverlayTrigger>
    );
}