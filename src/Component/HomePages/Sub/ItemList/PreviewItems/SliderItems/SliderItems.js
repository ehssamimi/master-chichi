import React, { Component, Fragment } from "react";
import {Row, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import { Colxx, Separator } from "../../../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../../../../helpers/IntlMessages";
import {items} from "../../../../../../data/carouselItems";
import GlideComponent from "../../../../../../components/carousel/GlideComponent";
import {DeleteCitemList} from "../../../../../functions/ServerConnection";
import NotificationManager from "../../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import HeaderPreviewComponentHomePage from "../../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";
import Loader from "../../../Loader/Loader";
const NoControlCarouselItem = ({ Name, Image, CurrentPrice, PrevPrice }) => {
    return (
        <div className="glide-item">
            <Card>
                <div className="position-relative vh25">
                    <img className="card-img-top img-self-fill " src={Image} alt={Name} />
                    {/*{badges &&*/}
                    {/*badges.map((b, index) => {*/}
                        {/*return (*/}
                            {/*<span*/}
                                {/*key={index}*/}
                                {/*className={`badge badge-pill badge-${*/}
                                    {/*b.color*/}
                                    {/*} position-absolute ${*/}
                                    {/*index === 0*/}
                                        {/*? "badge-top-left"*/}
                                        {/*: "badge-top-left-" + (index + 1)*/}
                                    {/*}`}*/}
                            {/*>*/}
                  {/*{b.title}*/}
                {/*</span>*/}
                        {/*);*/}
                    {/*})}*/}
                </div>
                <CardBody>
                    <h6 className="mb-4">{Name}</h6>
                    <footer>
                        <p className="text-muted text-small mb-0 font-weight-light">
                            {Name}
                        </p>
                        <div className='d-flex'  >
                            <span className='  d-flex mr-auto '>
                                {CurrentPrice}
                                تومان
                            </span>
                            <span className='ml-auto text-muted text-line' >
                                <span>{PrevPrice}</span>
                                <span>تومان</span>



                            </span>

                        </div>

                    </footer>
                </CardBody>
            </Card>
        </div>
    );
};



class SliderItems extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,showLoader:false
        }
    }

    async handelDelete() {
        this.setState(prevState => ({
            showLoader:!prevState.showLoader,
        }));
        this.toggleLarge()

        let data= await DeleteCitemList(this.props.items.Title);
        // let{Data}=this.props.items;
        let id=this.props.Title;
        let {Description}=data;
        if(data.state===200){
            NotificationManager.success(
                "congratulation",
                "your categories deleted",
                3000,
                null,
                null,
                "success"
            );
            this.setState( {
                showLoader:false
            } );
            console.log(data);
            const $el = document.getElementById(`${id}`);
            const duration = 2;
            const from = { opacity: 0};
            TweenMax.to($el, duration, from);
            setTimeout(() => {
                $el.remove();
            }, 2000);

        }else {
            NotificationManager.error(

                "خطا",
                `شما نمی توانید این اسلایدر را حذف کنید چون در صفحه   ${Description} استفاده شده است `,
                4000,
                null,
                null,
                "error"
            );
            this.setState( {
                showLoader:false
            } );
        }
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
    handelEdit(value){
        // console.log(value);
        console.log(value);
        this.props.clickPreview (value);
    }

    render() {
        // console.log(items);
        // console.log(this.props.items);
        let {Data}=this.props.items;
        console.log(this.props.items);
        return (
            <div id={this.props.Title}>
                {
                    this.state.showLoader? <Loader/> :   <Row>
                        <Colxx xxs="12" >
                            {/*********this is first*******/}

                            {/*<CardTitle className='d-flex h-4vh align-items-start '>*/}
                            {/*<div className='d-flex mr-auto  '>*/}
                            {/*<div className=' d-flex fs-13vw color-theme-1 m-2 BtnHeaderComponent ' onClick={this.handelEdit.bind(this,this.props.header)}><FaRegEdit /></div>*/}
                            {/*<div className=' d-flex  fs-13vw  color-theme-1 m-2 BtnHeaderComponent ' onClick={this.handelclickDelete.bind(this)}><MdDeleteForever/></div>*/}
                            {/*</div>*/}

                            {/*<span dir='rtl' className='ml-2 d-flex align-items-end '>*/}
                            {/*نام :  {this.props.items.Title}*/}
                            {/*</span>*/}
                            {/*</CardTitle>*/}


                            <HeaderPreviewComponentHomePage handelEdit={this.handelEdit.bind(this)} handelclickDelete={this.handelclickDelete.bind(this)}   Name={this.props.items.Title} baner={true} {...this.props}/>
                            {/*********this is prev*******/}

                            {/*<CardTitle className='d-flex h-4vh align-items-start '>*/}

                            {/*<div className='d-flex mr-auto  '>*/}
                            {/*<div className=' d-flex fs-13vw color-theme-1 m-2 BtnHeaderComponent ' onClick={this.handelEdit.bind(this,this.props.header)}><FaRegEdit /></div>*/}
                            {/*<div className=' d-flex  fs-13vw  color-theme-1 m-2 BtnHeaderComponent ' onClick={this.handelclickDelete.bind(this)}><MdDeleteForever/></div>*/}
                            {/*</div>*/}

                            {/*<span dir='rtl' className='ml-2 d-flex align-items-end '>*/}
                            {/*نام :  {this.props.items.Title}*/}
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
                                { Data.map(item => {
                                    return (
                                        <div key={item._id}>
                                            <NoControlCarouselItem {...item} />
                                        </div>
                                    );
                                })}
                            </GlideComponent>
                        </Colxx>
                    </Row>
                }

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
        );
    }
}

export default SliderItems;