import React, {Component} from 'react';
import {  Card, CardBody, CardSubtitle, CardText} from "reactstrap";
import {NavLink} from "react-router-dom";
import ThumbnailLetters from "../../../../../../components/cards/ThumbnailLetters";
import {DeleteChichiMan} from "../../../../../functions/ServerConnection";

class ChichiManInfoCard extends Component {
    async deleteToggle(id) {

        // let {state,Description} = await DeleteChichiMan(id)
        this.props.updateList();
    }
    render() {
        let{chichiMan}=this.props;


        return (
            <div className={this.props.class} dir='rtl'>

                    <Card className="d-flex flex-row mb-4 br-rounded w-100">
                        <NavLink to={`/chichi-man/${this.props.header}/${this.props.id}`}>
                        {
                            chichiMan['image'].length>0?  <div className='align-self-center list-thumbnail-letters  rounded-circle'>
                                <img src={chichiMan['image']} alt='image' className='img-self-fill br-rounded '/>
                            </div>:<ThumbnailLetters rounded text={chichiMan['name']}/>
                        }
                        </NavLink>
                         <div className=" d-flex flex-grow-1 min-width-zero">
                            {/*<CardBody className=" pl-0 pr-0   row m-0 text-center align-self-center">*/}
                            <div className="pl-0 pr-0   row m-0 text-center align-self-center w-100">
                                <NavLink to={`/chichi-man/${this.props.header}/${this.props.id}`} style={{width:"100%"}}>
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
                                        className='badge  remove_category col-6 d-flex justify-content-center FS-c-0  cursor-pointer' style={{zIndex:"9999999"}}
                                        onClick={this.deleteToggle.bind(this,chichiMan["_id"])}  > حذف
                                    </button>

                                </div>
                            </div>

                            {/*</CardBody>*/}
                        </div>
                    </Card>
                {/*</NavLink>*/}
            </div>
        );
    }
}

export default ChichiManInfoCard;