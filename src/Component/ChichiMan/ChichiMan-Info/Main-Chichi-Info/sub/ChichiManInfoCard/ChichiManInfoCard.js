 import React, {useState} from 'react';

import {Card, CardBody, CardSubtitle, CardText} from "reactstrap";
import {NavLink} from "react-router-dom";
import ThumbnailLetters from "../../../../../../components/cards/ThumbnailLetters";
import {DeleteChichiMan} from "../../../../../functions/ServerConnection";
import {error_Notification, RemoveElement, success_Notification} from "../../../../../functions/componentHelpFunction";
import {ModalDelete} from "../../../../../Common/Modals/ModalDelete/ModalDelete";



const ChichiManInfoCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);


    const deleteToggle=async(id)=> {

        let {state,Description} = await DeleteChichiMan(id);
        console.log(Description);
        if (state===200){
            success_Notification("چی چی من حذف شد!");
            RemoveElement( props.id);
            setIsOpen(!isOpen)
        }else {
            error_Notification(state,Description)
        }
        // this.props.updateList();

    }

    let{chichiMan,id}=props;

    return (
        <div className={props.class} dir='rtl' id={id}>

            <Card className="d-flex flex-row mb-4 br-rounded w-100">
                <NavLink to={`/chichi-man/${props.header}/${id}`}>
                    {
                        chichiMan['image'].length>0?  <div className='align-self-center list-thumbnail-letters  rounded-circle'>
                            <img src={chichiMan['image']} alt='image' className='img-self-fill br-rounded ' style={{height:"6rem"}}/>
                        </div>:<ThumbnailLetters rounded text={chichiMan['name']}/>
                    }
                </NavLink>
                <div className=" d-flex flex-grow-1 min-width-zero">
                    <div className="pl-0 pr-0   row m-0 text-center align-self-center w-100">
                        <NavLink to={`/chichi-man/${props.header}/${id}`} style={{width:"100%"}}>
                            <div className=" d-flex flex-grow-1 min-width-zero w-100">
                                <div className="col-sm-12 col-lg-6">
                                    <CardSubtitle className="truncate mb-1">{chichiMan['name']}</CardSubtitle>
                                    <CardText className="text-muted text-small mb-2">{chichiMan['phoneNumber']} </CardText>
                                </div>
                                <div className="col-sm-12 col-lg-6 p-0">
                                    <CardSubtitle className="truncate mb-1">{chichiMan['vehicle']}</CardSubtitle>
                                    <CardText className="text-muted text-small mb-2">{chichiMan['Plaque']}</CardText>
                                </div>
                            </div>
                        </NavLink>
                        <div className="col-12 d-flex justify-content-center">
                            <button
                                className='badge  remove_category col-6 d-flex justify-content-center FS-c-0  cursor-pointer' style={{zIndex:"2"}}
                                onClick={()=>{setIsOpen(!isOpen)}}  > حذف
                            </button>

                        </div>
                    </div>
                </div>
            </Card>
             <ModalDelete isOpen={isOpen} toggle={()=>{setIsOpen(!isOpen)}} item={"چی چی من"}  deleteComponent={()=>{deleteToggle( chichiMan["_id"])}}/>
        </div>
    );
};

export default ChichiManInfoCard;

