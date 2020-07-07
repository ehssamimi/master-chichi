import React, { useEffect} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";

const ModalWithChild = (props) => {

    let{isOpen,toggle,Header}=props

    return (
        <Modal
            isOpen={isOpen}
            size="lg"
            toggle={toggle}
        >
            <ModalHeader toggle={toggle}>
                {
                    Header!==undefined?
                        Header:""
                }
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
