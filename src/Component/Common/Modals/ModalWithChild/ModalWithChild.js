import React, { useEffect} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";

const ModalWithChild = (props) => {

    let{isOpen,toggle}=props

    return (
        <Modal
            isOpen={isOpen}
            size="lg"
            toggle={toggle}
        >
            <ModalHeader toggle={toggle}>
            </ModalHeader>
            <ModalBody>
                {
                    props.children
                }
            </ModalBody>
        </Modal>
    );
};

export default ModalWithChild;
