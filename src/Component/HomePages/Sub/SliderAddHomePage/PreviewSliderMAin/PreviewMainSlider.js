import React, { Component, Fragment } from "react";
import {Row, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import { Colxx, Separator } from "../../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../../../helpers/IntlMessages";
import {items} from "../../../../../data/carouselItems";
import GlideComponent from "../../../../../components/carousel/GlideComponent";
import {DeleteSlider} from "../../../../functions/ServerConnection";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
 import HeaderPreviewComponentHomePage from "../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";
import Loader from "../../Loader/Loader";
const NoControlCarouselItem = ({ Destination, Image, Position,DestinationId}) => {
    return (
        <div className="glide-item">
            <Card>
                <div className="position-relative vh25">
                    <img className="card-img-top img-self-fill " src={Image} alt={Image} />
                    {/*Destination: null*/}
                    {/*DestinationId: null*/}
                    {/*Image: "http://chichiapp.ir:3005/download/5d9884457c1e36d6e452598e"*/}
                    {/*Position: 4*/}
                </div>
                <CardBody>
                    <h6 className="mb-4">{Destination}</h6>
                    <footer>
                        <p className="text-muted text-small mb-0 font-weight-light">
                            DestinationId: {DestinationId}
                        </p>
                        <div className='d-flex'  >
                            <span className='  d-flex  '>
                                {Position}
                                Position:
                            </span>


                        </div>

                    </footer>
                </CardBody>
            </Card>
        </div>
    );
};



class PreviewMainSlider extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,deleteLoader:false
        }
    }


    async handelDelete() {
        this.setState(prevState => ({
            deleteLoader: !prevState.deleteLoader
        }));
        let data= await DeleteSlider(this.props.slider.Name);
        // let{Data}=this.props.items;
        let {Description}=data;
        let id=this.props.slider.Name;
        this.setState(prevState => ({
            deleteLoader: !prevState.deleteLoader
        }));
        if(data.state===200){
            NotificationManager.success(

                "congratulation",
                "your Slider deleted",
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
    handelEdit(name){
        // console.log(name);
        this.props.clickEdit(name);
    }

    render() {
        // console.log(items);
        // console.log(this.props.slider);
        let {Items}=this.props.slider;
        // console.log(Items);
        return (

            <div className='w-100'>
                {
                    (this.props.showLoader===true&&this.props.EditName===this.props.slider.Name) || (this.state.deleteLoader===true)?
                        <Loader/>
                        :   <div id={this.props.slider.Name}>
                            <Row>
                                <Colxx xxs="12" >

                                    <HeaderPreviewComponentHomePage handelEdit={this.handelEdit.bind(this)} handelclickDelete={this.handelclickDelete.bind(this)}   Name={this.props.slider.Name} {...this.props}/>


                                    {/*<CardTitle className='d-flex h-4vh align-items-start '>*/}

                                    {/*<div className='d-flex mr-auto  '>*/}
                                    {/*<div className=' d-flex fs-13vw color-theme-1 m-2 BtnHeaderComponent ' onClick={this.handelEdit.bind(this,this.props.header)}><FaRegEdit /></div>*/}
                                    {/*<div className=' d-flex  fs-13vw  color-theme-1 m-2 BtnHeaderComponent ' onClick={this.handelclickDelete.bind(this)}><MdDeleteForever/></div>*/}
                                    {/*</div>*/}

                                    {/*<span dir='rtl' className='ml-2 d-flex align-items-end '>*/}
                                    {/*نام :  {this.props.slider.Name}*/}
                                    {/*</span>*/}

                                    {/*</CardTitle>*/}


                                </Colxx>
                                <Colxx xxs="12" className="pl-0 pr-0 mb-5">
                                    <GlideComponent settings={
                                        {
                                            gap: 5,
                                            perView:2,
                                            type: "carousel",
                                            breakpoints: {
                                                480: { perView: 1 },
                                                800: { perView: 2 },
                                                1200: { perView: 2 }
                                            },
                                            hideNav: false
                                        }
                                    }>
                                        { Items.map((item,index) => {
                                            return (
                                                <div key={index}>
                                                    <NoControlCarouselItem {...item} />
                                                </div>
                                            );
                                        })}
                                    </GlideComponent>
                                </Colxx>
                            </Row>
                            <Modal
                                isOpen={this.state.deleteItem}
                                size="lg"
                                toggle={this.toggleLarge}
                            >
                                <ModalHeader toggle={this.toggleLarge}>
                                    Delete Slider {this.props.header}

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

export default PreviewMainSlider;