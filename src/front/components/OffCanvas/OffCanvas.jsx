import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './OffCanvas.css'
import { testsCatalog } from '../../utils/testsCatalog';
import useGlobalReducer from '../../hooks/useGlobalReducer';

export const OffCanvas = ({ handlerChangeOrders }) => {
    const [show, setShow] = useState(false);
    const { store, dispatch } = useGlobalReducer()
    const [openSectionId, setOpenSectionId] = useState({
        id: "",
        open: false
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="" className="border-0 p-0 btn-hover" onClick={handleShow}>
                <i className="fa-solid fa-circle-plus me-2"></i>
                Otras pruebas
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='title'>Pruebas específicas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        testsCatalog.map((tests) => (
                            <div key={tests.id}>
                                <h3 className='title title-offcanvas mb-2 mt-2'
                                    onClick={() => openSectionId === tests.id ? setOpenSectionId("") : setOpenSectionId(tests.id)}>
                                    {tests.category}
                                    <i className="fa-solid fa-angle-right aligment-center"></i>
                                </h3>
                                <div className={`${openSectionId === tests.id ? "d-block" : "d-none"} mt-2`}>
                                    {
                                        tests.items.map((item, index) =>
                                            <div key={index} className="div-check m-1">
                                                <input className="div-check-input mx-1" type="checkbox"
                                                    value=""
                                                    name={item} id={item}
                                                    onChange={handlerChangeOrders}
                                                    checked={store.orders.includes(item)} />
                                                <label className="div-check-label" for={item}>
                                                    {item}
                                                </label>
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                        ))
                    }

                </Offcanvas.Body>
            </Offcanvas >
        </>
    );
}