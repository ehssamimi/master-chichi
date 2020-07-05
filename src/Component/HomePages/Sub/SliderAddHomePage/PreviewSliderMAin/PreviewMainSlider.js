import React, { Component } from "react";
import {Row, Card, CardBody } from "reactstrap";
import { Colxx } from "../../../../../components/common/CustomBootstrap";
import GlideComponent from "../../../../../components/carousel/GlideComponent";
import {DeleteSlider} from "../../../../functions/ServerConnection";
  import HeaderPreviewComponentHomePage from "../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";
import Loader from "../../Loader/Loader";
import {ModalDelete} from "../../../../Common/Modals/ModalDelete/ModalDelete";
import {RemoveElement2, success_Notification} from "../../../../functions/componentHelpFunction";
const NoControlCarouselItem = ({ Destination, Image, Position,DestinationId}) => {
    return (
        <div className="glide-item">
            <Card>
                <div className="position-relative h-15em">
                    <img className="card-img-top img-self-fill " src={Image} alt={Image} />
                </div>
                <CardBody className="d-flex ">
                    <div className="w-100 d-flex align-items-center">
                        <span className="FS-c-2">{Destination==="Category"?"دسته بندی":"محصول"}</span>

                        <div className='  d-inline-block ml-auto' >
                            <span className='  d-flex  FS-c-1'>
                                موقعیت:
                                {Position}
                            </span>
                        </div>
                     </div>

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
        let {state,Description}= await DeleteSlider(this.props.slider.Name);
        this.setState(prevState => ({
            deleteLoader: !prevState.deleteLoader
        }));
        if(state===200){
            success_Notification("اسلایدر مورد نظر حذف شد!")
            RemoveElement2(this.props.slider.Name)
        }
        this.toggleLarge()
    }


    toggleLarge = () => {
        this.setState(prevState => ({
            deleteItem: !prevState.deleteItem
        }));
    };


    render() {
          let {Items}=this.props.slider;
         return (

            <div className='w-100' dir="ltr">
                {
                    (this.props.showLoader===true && this.props.EditName===this.props.slider.Name) || (this.state.deleteLoader===true)?
                        <Loader/>
                        :   <div id={this.props.slider.Name}>
                            <Row>
                                <Colxx xxs="12" >

                                    <HeaderPreviewComponentHomePage handelEdit={ (name)=>{this.props.clickEdit(name)}} handelclickDelete={this.toggleLarge.bind(this)}   Name={this.props.slider.Name} {...this.props}/>

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

                            <ModalDelete isOpen={this.state.deleteItem} toggle={()=>{this.toggleLarge()}} item={"اسلایدر "}  deleteComponent={this.handelDelete.bind(this)}/>

                        </div>
                }

            </div>

        );
    }
}

export default PreviewMainSlider;