import React, {Component} from 'react';
import {Button, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import NotificationManager from "../../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {DeleteBanner, GetBanners} from "../../../../../functions/ServerConnection";
import {Colxx} from "../../../../../../components/common/CustomBootstrap";
import PreviewPackages from "../../../../Sub/WonderPackageAddHomePage/subPackage/PreviewPackages";
import PreViewBanner from "../../../../Sub/Banner/PreViewBanner/PreViewBanner";
import PreviewMainSlider from "../../../../Sub/SliderAddHomePage/PreviewSliderMAin/PreviewMainSlider";

class BannerHomePagePreview extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,MouseOver:false,Edit:false,bannersList:[],Data:[],Img:''
        };
        this.handelEnter =this.handelEnter.bind(this);
        this.handelLeave =this.handelLeave.bind(this);
    }
    // clickEdit(value){
    //     console.log(value);
    //     this.props.clickPreview(value,this.props.id);
    // }

    static getDerivedStateFromProps(props, state) {
        if (props.items !== state.Data) {
            let Data = [];let Img='';
            // if (props.edit) {
            //     // console.log('Data');
            //     // console.log(props.items.Data);
            //     Data = props.items.Data;
            //     Img = Data[0].Image;
            //     return {
            //         Data,Img
            //     };
            // } else {
                // console.log('Data');
                // console.log(props.items.Data.Items);
                // console.log(props.items.Data );
                // console.log(Data['Image'] );
                Data = props.items.Data;
                Img = Data['Image'];
                return {
                    Data,Img
                };
            // }
        }
        // Return null if the state hasn't changed
        return null;
    }
    ClickEdit(Name){
        // console.log(Name);
        this.props.ChangeComponent(Name,'Banner',this.props.position);
        this.toggleEdit()
    }

    async handelDelete() {
        this.props.deleteComponent(this.props.header,'Banner',this.props.position);

        // console.log(this.props.id);
        // let data= await DeleteBanner(this.props.id);
        // let id=this.props.header;
        // if(data===200){
        //     NotificationManager.success(
        //         "congratulation",
        //         "your Banner is deleted",
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
    toggleEdit = () => {
        this.setState(prevState => ({
            Edit: !prevState.Edit
        }));
    };
    async handelclickEdit() {
        this.setState({
            Edit: true
        });

        let bannersList = await GetBanners();
        console.log(bannersList);
        this.setState({
            bannersList
        });
        // console.log(CategoriesList[0].Items[0].Image);


    }

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
        // let {Data}=this.props.items;
        let {bannersList,Data,Img}=this.state;
        // let {Type}=Data[0];

        return (
            <div   className=' w-100 d-flex flex-column  '  onMouseOver={this.handelEnter.bind(this)} onMouseLeave={this.handelLeave.bind(this)} id={this.props.header} >
                {
                    this.props.Edit?"":
                        <CardTitle className='d-flex'>
                            <div className='mr-auto'>
                                <span className=' simple-icon-trash cursor-pointer' onClick={this.handelclickDelete.bind(this)}></span>
                                <span className='  iconsminds-file-edit cursor-pointer' onClick={this.handelclickEdit.bind(this)}></span>
                            </div>
                            {
                                `${this.props.items.Title}بنر `
                            }
                        </CardTitle>
                }


                <div className=' d-flex flex-column w-100 point-review position-relative h-100'>
                    <div className=' h-75 d-flex '>
                        <div className='height30vh w-100  mt-1 mb-1 pointer   ' >
                            <img src={Img} className='img-self-fill br02'/>
                        </div>
                    </div>
                    {/*<span>{Type.Name}</span>*/}
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

                <Modal
                    isOpen={this.state.Edit}
                    size="md"
                    toggle={this.toggleEdit}
                >
                    <ModalHeader toggle={this.toggleEdit}>
                        Change Banner {this.props.header}

                    </ModalHeader>
                    <ModalBody>
                        <div className='col-12 d-flex '>
                            <div className='col-12 d-flex flex-column justify-content-end'>
                                {
                                    bannersList.length>0?
                                        bannersList.map((cat ,index)=><PreViewBanner id={cat._id} key={index} header={cat.Name} ax ={cat.Image}   clickPreview={this.ClickEdit.bind(this)} select={true} baner={true}/>  ):""
                                }
                            </div>

                        </div>
                    </ModalBody>


                </Modal>
            </div>

        );
    }
}

export default BannerHomePagePreview;