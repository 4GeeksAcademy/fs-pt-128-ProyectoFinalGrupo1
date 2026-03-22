import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';

export const PopOverTest = ({ income, orders }) => {
    console.log(orders)
    return (
        <OverlayTrigger
            trigger="click"
            rootClose
            key="left"
            placement="left"
            overlay={
                <Popover id="popover-positioned-right">
                    <Popover.Header as="h3" className='text-center title'>Estado de pruebas</Popover.Header>
                    <Popover.Body className='text-center'>
                        {
                            orders.map(order => <p key={order.id} className='fw-semibold'>{order.order_type}: {order.status}</p>)
                        }
                        <div className='text-center'>
                            <Link to={`/test-result/${income}`} className='link-underline-dark text-dark fw-semibold'>Ver resultados</Link>
                        </div>
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