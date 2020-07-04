import React, { Component } from "react";
import {Row, Card, CardBody } from "reactstrap";
import { Colxx } from "../../../../../../components/common/CustomBootstrap";
import GlideComponent from "../../../../../../components/carousel/GlideComponent";
import {DeleteItemList} from "../../../../../functions/ServerConnection";
 import HeaderPreviewComponentHomePage from "../../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";
 import {formatNumber} from "../../../../../functions/Functions";
import {
    error_Notification,
     RemoveElement2,
    success_Notification
} from "../../../../../functions/componentHelpFunction";
import {ModalDelete} from "../../../../../Common/Modals/ModalDelete/ModalDelete";
import IsLoaderComponent from "../../../../../Common/Loader/IsLoader/IsLoaderComponent";
const NoControlCarouselItem = ({ Name, Image, CurrentPrice, PrevPrice }) => {
    return (
        <div className="glide-item  ">
            <Card>
                <div className="position-relative h-15em">
                    <img className="card-img-top img-self-fill " src={Image} alt={Name} />
                </div>
                <h6 className="mt-3 d-flex justify-content-center">{Name}</h6>

                <CardBody>
                    <footer>

                        {
                            CurrentPrice!==PrevPrice?
                                <div className='d-flex'  >
                            <span className='  d-flex mr-auto '>
                                {formatNumber(CurrentPrice)+" "}
                                ت
                            </span>
                                    <span className='ml-auto   text-line redColor' >
                                         <span>{formatNumber(PrevPrice)+" "}</span>
                                         <span> ت </span>
                                    </span>

                                </div>:
                                <div>
                                    <span className='    d-flex justify-content-center   text-center' >
                                         <span>{formatNumber(PrevPrice)+" "}</span>
                                         <span>ت</span>
                                    </span>
                                </div>
                        }


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
        console.log("delete")

        this.setState( {
            showLoader:true
        });

        let {state ,Description } = await DeleteItemList(this.props.items.Title);

        if(state===200){
            success_Notification("ایتم مورد نظر حذف شد!")
            RemoveElement2(this.props.Title)

        }else {
            error_Notification("خطا" ,`شما نمی توانید این اسلایدر را حذف کنید چون در صفحه   ${Description} استفاده شده است `)

        }
        this.setState( {
            showLoader:false
        } );
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
    handelEdit(value){

        this.props.clickPreview (value);
    }

    render() {

        let {Data}=this.props.items;
        // console.log(this.props.items);
        return (
            <div id={this.props.Title} dir="ltr">
                <IsLoaderComponent isLoader={this.state.showLoader} >
                    <Row>
                        <Colxx xxs="12" >
                            <HeaderPreviewComponentHomePage handelEdit={this.handelEdit.bind(this)} handelclickDelete={this.handelclickDelete.bind(this)}   Name={this.props.items.Title} baner={true} {...this.props}/>

                        </Colxx>
                        <Colxx xxs="12" className="pl-0 pr-0 mb-5">
                            <GlideComponent settings={
                                {
                                    gap: 5,
                                    perView:3,
                                    type: "carousel",
                                    breakpoints: {
                                        480: { perView: 1 },
                                        800: { perView: 3 },
                                        1200: { perView: 3 }
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
                </IsLoaderComponent>


                <ModalDelete isOpen={this.state.deleteItem} toggle={()=>{this.toggleLarge()}} item={"لیست ایتم ها "}  deleteComponent={this.handelDelete.bind(this)}/>

            </div>
        );
    }
}

export default SliderItems;