import React, {Component} from 'react';
import HeaderSectionHomePage from "../../ShowPreviewHomePage/HeaderSectionHomePage/HeaderSectionHomePage";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, CardTitle,Card} from "reactstrap";
import {TweenMax} from "gsap/TweenMax";
import {DeleteCategoriey} from "../../../../functions/ServerConnection";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";
import styled from "styled-components";
import HeaderPreviewComponentHomePage from "../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import Loader from "../../Loader/Loader";

// const categoryMainPreview = styled.div`
//   margin-top: ${props =>
//     props.index===0 ? ' ' : '2vh'}
// `


class PreviewCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,MouseOver:false,deleteLoader:false
        };
        this.toggleLarge=this.toggleLarge.bind(this)
    }

    clickEdit(value){
        console.log(value);
        this.props.clickPreview(value,this.props.id);
    }

    async handelDelete() {
        this.setState(prevState => ({
            deleteLoader: !prevState.deleteLoader
        }));
        let data= await DeleteCategoriey(this.props.header);
        let {Description}=data;
        let id=this.props.header;
        this.setState(prevState => ({
            deleteLoader: !prevState.deleteLoader
        }));
        if(data.state===200){
            NotificationManager.success(
                "congratulation",
                "your categories deleted",
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
            NotificationManager.error(
                "خطا",
                `شما نمی توانید این اسللایدر را حذف کنید چون در صفحه   ${Description} استفاده شده است `,
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
        let{ax1,ax2,ax3,ax4}=this.props;
        return (

            <div className='w-100'>
                {
                    (this.props.showLoader === true && this.props.EditName === this.props.header) || (this.state.deleteLoader === true) ?
                        <Loader/>
                        :
                        <div
                            className={['w-100',this.props.index===0?'':'mt-3' ].join(' ')}
                            // className='mt-5'
                            onMouseOver={this.handelEnter.bind(this)} onMouseLeave={this.handelLeave.bind(this)} id={this.props.header} >
                            {/*<HeaderSectionHomePage header={this.props.header}/>*/}
                            {

                                <HeaderPreviewComponentHomePage handelEdit={this.clickEdit.bind(this)} handelclickDelete={this.handelclickDelete.bind(this)}   Name={this.props.header} {...this.props}/>

                                // <CardTitle className='d-flex h-4vh align-items-start '>
                                //
                                //     <div className='d-flex mr-auto  '>
                                //         <div className=' d-flex fs-13vw color-theme-1 m-2 BtnHeaderComponent ' onClick={this.clickEdit.bind(this,this.props.header)}><FaRegEdit /></div>
                                //         <div className=' d-flex  fs-13vw  color-theme-1 m-2 BtnHeaderComponent ' onClick={this.handelclickDelete.bind(this)}><MdDeleteForever/></div>
                                //     </div>
                                //
                                //     <span dir='rtl' className='ml-2 d-flex align-items-end '>
                                //             نام : {this.props.header}
                                //     </span>
                                //
                                // </CardTitle>
                            }
                            <div className=' d-flex w-100 point-review position-relative'>
                                {

                                    this.state.MouseOver? <div className='w-100 h-100   d-flex justify-content-center align-items-center overly'>
                                        <div className=' d-flex justify-content-center align-items-center categoriesIconReview m-2  ' onClick={this.clickEdit.bind(this,this.props.header)}><FaRegEdit /></div>
                                        {
                                            this.props.select ? "" : <div
                                                className=' d-flex justify-content-center align-items-center categoriesIconReview m-2'
                                                onClick={this.handelclickDelete.bind(this)}><MdDeleteForever/></div>
                                        }
                                    </div>:''

                                }
                                <div className='d-flex col-6 flex-column paddingZero'>
                                    <div className='height25vh w-100  mt-1 mb-1'>
                                        <img src={ax1} className='img-self-fill br02'/>
                                    </div>
                                    <div className='height20vh w-100  mt-1 mb-1'>
                                        <img src={ax2} className='img-self-fill br02'/>
                                    </div>
                                </div>
                                <div className='d-flex col-6 flex-column padding-top-Zero padding-bottom-Zero padding-right-Zero pl-2 '>
                                    <div className='height20vh w-100 mt-1 mb-1'>
                                        <img src={ax3} className='img-self-fill br02'/>
                                    </div>
                                    <div className='height25vh w-100 mt-1 mb-1'>
                                        <img src={ax4} className='img-self-fill br02'/>
                                    </div>
                                </div>

                            </div>
                            <Modal
                                isOpen={this.state.deleteItem}
                                size="lg"
                                toggle={this.toggleLarge}
                            >
                                <ModalHeader toggle={this.toggleLarge}>
                                    Delete Category {this.props.header}

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

export default PreviewCategories;