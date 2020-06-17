import React, {Component} from 'react';
import {Row, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import { Colxx, Separator } from "../../../../../../components/common/CustomBootstrap";
import GlideComponent from "../../../../../../components/carousel/GlideComponent";
import {DeleteCitemList, allHeaderSlider} from "../../../../../functions/ServerConnection";
import NotificationManager from "../../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import ax from './../../../../../../assets/img/4th.jpg'
import PreviewItems from "../../../../Sub/ItemList/PreviewItems/PreviewItems";
import PreviewMainSlider from "../../../../Sub/SliderAddHomePage/PreviewSliderMAin/PreviewMainSlider";
import PreviewHeaderSlider from "../../../../Sub/HeaderSlider/Preview/PreviewHeaderSlider";
import PreviewCategories from "../../../../Sub/CategoriesHomePage/PreviewCategories/PreviewCategories";
 import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// const NoControlCarouselItem = ({ Type, Image,Position }) => {
//     return (
//         <div className="glide-item">
//             <Card>
//                 <div className="position-relative vh25">
//                     <img className="card-img-top img-self-fill " src={Image || ax} alt={Image ||ax} />
//                     {/*<span>{Position}</span>*/}
//                     {/*{badges &&*/}
//                     {/*badges.map((b, index) => {*/}
//                     {/*return (*/}
//                     {/*<span*/}
//                     {/*key={index}*/}
//                     {/*className={`badge badge-pill badge-${*/}
//                     {/*b.color*/}
//                     {/*} position-absolute ${*/}
//                     {/*index === 0*/}
//                     {/*? "badge-top-left"*/}
//                     {/*: "badge-top-left-" + (index + 1)*/}
//                     {/*}`}*/}
//                     {/*>*/}
//                     {/*{b.title}*/}
//                     {/*</span>*/}
//                     {/*);*/}
//                     {/*})}*/}
//                 </div>
//
//
//             </Card>
//             {/*<span>{Type.Name}</span>*/}
//         </div>
//     );
// };
const NoControlCarouselItem = ({ Destination, Image }) => {
    return (
        <div className="glide-item col-12 cursor-pointer" >
            <Card>
                <div className="position-relative vh25">
                    <img className="card-img-top img-self-fill " src={Image} alt={Image} />
                    {/*Destination: null*/}
                    {/*DestinationId: null*/}
                    {/*Image: "http://chichiapp.ir:3005/download/5d9884457c1e36d6e452598e"*/}
                    {/*Position: 4*/}

                </div>

            </Card>
        </div>
    );
};



class HeaderSliderPreview extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,Data:[],Edit:false,itemsList:[]
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.items !== state.Data) {
            let Data = [];
            // if ( props.edit) {
            //     // console.log('Data');
            //     // console.log(props.items.Data);
            //     Data = props.items.Data;
            //     return {
            //         Data
            //     };
            // } else {
                // console.log('Data');
                // console.log(props.items.Data.Items);
                Data = props.items.Data.Items;
                // Data = props.items.Data ;
                return {
                    Data
                };
            // }
            // Data = props.items.Data;
            // return {
            //     Data
            // };
        }
        // Return null if the state hasn't changed
        return null;
    }


    async handelDelete() {
        this.props.deleteComponent(this.props.header,'HeaderSlider',this.props.position);

        // let data= await DeleteCitemList(this.props.items.Title);
        // // let{Data}=this.props.items;
        // let id=1;
        //
        // if(data===200){
        //     NotificationManager.success(
        //
        //         "congratulation",
        //         "your categories deleted",
        //         3000,
        //         null,
        //         null,
        //         "success"
        //     );
        //     console.log(data);
        //     const $el = document.getElementById(`${id}`);
        //     const duration = 2;
        //     const from = { opacity: 0};
        //     TweenMax.to($el, duration, from);
        //     setTimeout(() => {
        //         $el.remove();
        //     }, 2000)
        // }
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

    async handelclickEdit() {
        this.setState({
            Edit: true
        });

        let itemsList = await allHeaderSlider();
        // console.log(itemsList);
        this.setState({
            itemsList
        });
    }

    ClickEdit(Name) {
        console.log(Name);
        this.props.ChangeComponent(Name, 'HeaderSlider', this.props.position);
        this.toggleEdit()
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            Edit: !prevState.Edit
        }));
    };

    render() {
        // console.log(items);
        // console.log(this.props.items);
        // let {Data}=this.props.items;
        let {Data,itemsList}=this.state;
        // console.log('Data');
        // console.log(Data);
        // console.log('props.items.Data');
        // console.log(this.props.items.Data);
        return (
            <div>
                <Row>
                    <Colxx xxs="12" id={1}>
                        {
                            this.props.Edit?"":
                                <CardTitle className='d-flex'>
                                    <div className='mr-auto'>
                                        <span className=' simple-icon-trash cursor-pointer' onClick={this.handelclickDelete.bind(this)}></span>
                                        <span className='  iconsminds-file-edit cursor-pointer' onClick={this.handelclickEdit.bind(this)}></span>
                                    </div>
                                    {
                                        `${this.props.items.Title}اسلایدر بالای صفحه  `
                                    }
                                </CardTitle>
                        }

                    </Colxx>
                    <Colxx xxs="12" className="pl-0 pr-0 mb-5">

                        <Carousel
                            additionalTransfrom={0}
                            arrows
                            autoPlaySpeed={3000}
                            centerMode={false}
                            className=""
                            containerClass="container-with-dots"
                            // customDot={<CustomDot />}
                            dotListClass=""
                            draggable
                            focusOnSelect={false}
                            infinite
                            itemClass=""
                            keyBoardControl
                            minimumTouchDrag={80}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            responsive={{
                                desktop: {
                                    breakpoint: {
                                        max: 3000,
                                        min: 1024
                                    },
                                    items: 2,
                                    partialVisibilityGutter: 40
                                },
                                mobile: {
                                    breakpoint: {
                                        max: 464,
                                        min: 0
                                    },
                                    items: 1,
                                    partialVisibilityGutter: 30
                                },
                                tablet: {
                                    breakpoint: {
                                        max: 1024,
                                        min: 464
                                    },
                                    items: 2,
                                    partialVisibilityGutter: 30
                                }
                            }}
                            showDots={true}
                            sliderClass=""
                            slidesToSlide={1}
                            swipeable
                        >
                            {Data.map((item,key) => {
                                return (
                                    <div key={key}  >
                                        <NoControlCarouselItem {...item} />
                                    </div>
                                );
                            })}

                        </Carousel>

                        {/*<GlideComponent settings={*/}
                            {/*{*/}
                                {/*gap: 5,*/}
                                {/*perView:2,*/}
                                {/*type: "carousel",*/}
                                {/*breakpoints: {*/}
                                    {/*480: { perView: 1 },*/}
                                    {/*800: { perView: 2 },*/}
                                    {/*1200: { perView: 2 }*/}
                                {/*},*/}
                                {/*hideNav: false*/}
                            {/*}*/}
                        {/*}>*/}
                            {/*{ Data.map(item => {*/}
                                {/*return (*/}
                                    {/*<div key={item.Position}>*/}
                                        {/*<NoControlCarouselItem {...item} />*/}
                                    {/*</div>*/}
                                {/*);*/}
                            {/*})}*/}
                        {/*</GlideComponent>*/}
                    </Colxx>
                </Row>
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
                <Modal
                    isOpen={this.state.Edit}
                    size="md"
                    toggle={this.toggleEdit}
                >
                    <ModalHeader toggle={this.toggleEdit}>
                        Change ItemList {this.props.header}

                    </ModalHeader>
                    <ModalBody>
                        <div className='col-12 d-flex '>
                            <div className='col-12 d-flex flex-column justify-content-end'>
                                {
                                    itemsList.length > 0 ?
                                        itemsList.map((slider, index) => <PreviewHeaderSlider id={slider._id} key={index} header={slider.Name} slider={slider} clickEdit={this.ClickEdit.bind(this)} select={true} baner={true}/>) : ""
                                }
                            </div>
                            <div className='col-6'>

                            </div>

                        </div>
                    </ModalBody>


                </Modal>
            </div>
        );
    }
}

export default HeaderSliderPreview;