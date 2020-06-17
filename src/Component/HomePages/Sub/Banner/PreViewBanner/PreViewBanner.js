import React, {Component} from 'react';
import HeaderSectionHomePage from "../../ShowPreviewHomePage/HeaderSectionHomePage/HeaderSectionHomePage";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {DeleteBanner} from "../../../../functions/ServerConnection";
import HeaderPreviewComponentHomePage from "../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import Loader from "../../Loader/Loader";

class PreViewBanner extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,MouseOver:false,showLoader:false
        };
        this.handelEnter =this.handelEnter.bind(this);
        this.handelLeave =this.handelLeave.bind(this);
    }
    clickEdit(value){
        console.log(value);
        this.props.clickPreview(value,this.props.id);
    }

    async handelDelete() {
        this.setState(prevState => ({
            showLoader:!prevState.showLoader,
        }));
        console.log(this.props.id);
        let data= await DeleteBanner(this.props.id);
        let {Description}=data;

        let id=this.props.header;
        if(data.state===200){
            this.setState(prevState => ({
                showLoader:!prevState.showLoader,
            }));
            NotificationManager.success(
                "congratulation",
                "your Banner is deleted",
                3000,
                null,
                null,
                "success"
            );
            console.log(data);
            const $el = document.getElementById(`${id}`);
            const duration = 2;
            const from = { opacity: 0};
            TweenMax.to($el, duration, from);
            setTimeout(() => {
                $el.remove();
            }, 2000)
        }else {
            this.setState(prevState => ({
                showLoader:!prevState.showLoader,
            }));
            NotificationManager.error(
                "خطا",
                `شما نمی توانید این بنر را حذف کنید چون در صفحه   ${Description} استفاده شده است `,
                4000,
                null,
                null,
                "error"
            );
        }
        this.toggleLarge()
    }
    handelclickDelete() {
        this.setState({
            deleteItem: true
        })
    }

    toggleLarge = () => {
        this.setState(prevState => ({
            deleteItem: !prevState.deleteItem
        }));
    };
    handelEnter(){
        this.setState({
            MouseOver:true
        })
    }
    handelLeave(){
        this.setState({
            MouseOver:false
        })
    }


    render() {
        let{ax}=this.props;
        return (
            <div>
                {this.state.showLoader?<Loader/>:
                    <div   className={['w-100','d-flex','flex-column',this.props.index===0?'':'mt-3' ].join(' ')}  onMouseOver={this.handelEnter.bind(this)} onMouseLeave={this.handelLeave.bind(this)} id={this.props.header} >
                        {/*<HeaderSectionHomePage header={this.props.header}/>*/}
                        <HeaderPreviewComponentHomePage handelEdit={this.clickEdit.bind(this)} handelclickDelete={this.handelclickDelete.bind(this)} Name={this.props.header} baner={true} {...this.props}/>

                        <div className=' d-flex flex-column w-100 point-review position-relative h-100'>
                            {
                                this.props.baner?"":
                                this.state.MouseOver? <div className='col-12 height30vh   d-flex justify-content-center align-items-center overly'>
                                    {/*<div className=' d-flex justify-content-center align-items-center categoriesIconReview m-2' onClick={this.clickEdit.bind(this,this.props.header)}><FaRegEdit /></div>*/}
                                    <div className=' d-flex justify-content-center align-items-center categoriesIconReview m-2' onClick={this.handelclickDelete.bind(this)}><MdDeleteForever/></div>
                                </div>:''
                            }
                            <div className=' height30vh d-flex '>
                                <div className='h-100 w-100  mt-1 mb-1 pointer ' >
                                    <img src={ax} className='img-self-fill br02'/>
                                </div>
                            </div>
                        </div>
                        <Modal
                            isOpen={this.state.deleteItem}
                            size="lg"
                            toggle={this.toggleLarge}
                        >
                            <ModalHeader toggle={this.toggleLarge}>
                                Delete Package {this.props.header}

                            </ModalHeader>
                            <ModalBody>
                                Are u sure?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handelDelete.bind(this)}>
                                    Yes
                                </Button>{" "}
                                <Button color="secondary" onClick={this.toggleLarge}>
                                    Cancel
                                </Button>
                            </ModalFooter>

                        </Modal>
                    </div>
                }
            </div>



        );
    }
}

export default PreViewBanner;