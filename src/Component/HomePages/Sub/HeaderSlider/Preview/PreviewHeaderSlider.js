import React, { Component, Fragment } from "react";
import {Row, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import { Colxx, Separator } from "../../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../../../helpers/IntlMessages";
import {items} from "../../../../../data/carouselItems";
import GlideComponent from "../../../../../components/carousel/GlideComponent";
import {DeleteHeaderSlider} from "../../../../functions/ServerConnection";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import HeaderPreviewComponentHomePage from "../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";
import Loader from "../../Loader/Loader";
import RowShowShowColEdit from "../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import RowShowShowEditWithoutLabel from "../../../../Common/RowShowShowColEdit/RowShowShowEditWithoutLabel";
const NoControlCarouselItem = ({ Destination, Image, Position,DestinationId}) => {
    return (
        <div className="glide-item">
            <Card className="br10px">
                <div className="position-relative vh25 height12rem br10px-inside">
                    <img className="card-img-top img-self-fill br10px-inside" src={Image} alt={Image} />

                </div>
                <div className="d-flex p-3 justify-content-between">


                    <RowShowShowColEdit label={"نوع"} value={Destination}/>
                    <RowShowShowColEdit label={"موقعیت"} value={Position}/>
                    {/*<footer>*/}
                        {/*<p className="text-muted text-small mb-0 font-weight-light">*/}
                            {/*/!*DestinationId: {DestinationId}*!/*/}
                         {/*<RowShowShowColEdit label={"موقعیت"} value={Position}/>*/}
                        {/*</p>*/}

                    {/*</footer>*/}
                </div>
            </Card>
        </div>
    );
};



class PreviewHeaderSlider extends Component {
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
        let data= await DeleteHeaderSlider(this.props.slider.Name);
        // let{Data}=this.props.items;
        console.log('data Delete');
        console.log(data);
        let {Description}=data
        this.setState(prevState => ({
            deleteLoader: !prevState.deleteLoader
        }));
        let id=this.props.slider.Name;

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

                "error",
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
        console.log(Items);

        // console.log('header'+this.props.header);
        // console.log('Name'+this.props.slider.Name);
        return (
            <div className='w-100'>
            {
            (this.props.showLoader === true && this.props.EditName === this.props.slider.Name) || (this.state.deleteLoader === true) ?
                <Loader/>
                :
                <div id={this.props.slider.Name}>
                    <Row>
                        <Colxx xxs="12">

                            <HeaderPreviewComponentHomePage handelEdit={this.handelEdit.bind(this)}
                                                            handelclickDelete={this.handelclickDelete.bind(this)}
                                                            Name={this.props.slider.Name} {...this.props}/>


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
                                    perView: 2,
                                    type: "carousel",
                                    breakpoints: {
                                        480: {perView: 1},
                                        800: {perView: 2},
                                        1200: {perView: 2}
                                    },
                                    hideNav: false
                                }
                            }>
                                {Items.map((item, index) =>
                                        // {
                                        //     return (
                                        <div key={index}
                                             id={item._id}
                                        >
                                            <NoControlCarouselItem {...item} />
                                        </div>
                                    //     );
                                    // }
                                )
                                }
                            </GlideComponent>
                        </Colxx>
                    </Row>
                    <Modal
                        isOpen={this.state.deleteItem}
                        size="lg"
                        toggle={this.toggleLarge}
                    >
                        <ModalHeader toggle={this.toggleLarge}>
                            حذف  {this.props.header}

                        </ModalHeader>
                        <ModalBody>
                            ایا مطمئن هستید؟
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handelDelete.bind(this)}>
                                بلی
                            </Button>{" "}
                            <Button color="secondary" onClick={this.toggleLarge}>
                                بی خیال
                            </Button>
                        </ModalFooter>

                    </Modal>
                </div>
    }
            </div>
        );
    }
}

export default PreviewHeaderSlider;