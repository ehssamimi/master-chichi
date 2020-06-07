import { Modal, ModalBody, ModalHeader} from "reactstrap";
import JustCropImg from "../CropImg/JustCropImg";
import React from "react";



export function ModalCropImage (props){
    let {isOpen,toggle,label,aspect,GetImgFile}=props;
    return<div>
        <Modal
            isOpen={isOpen}
            size="lg"
            toggle={toggle}
        >
            <ModalHeader toggle={toggle}>
            </ModalHeader>
            <ModalBody>
                <div className='col-12 d-flex flex-column'>
                    { <JustCropImg label={label} aspect={aspect} GetImgFile={GetImgFile}  /> }
                </div>
            </ModalBody>
        </Modal>
    </div>
};
