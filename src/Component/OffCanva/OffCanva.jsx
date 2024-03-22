import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';

export const OffCanva = (props) => {

    let { show, handleClose, placement, children } = props

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement={placement}>
                {children}
            </Offcanvas>
        </>
    )
}

