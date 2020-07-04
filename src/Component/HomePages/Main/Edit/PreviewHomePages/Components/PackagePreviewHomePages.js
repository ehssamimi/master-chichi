import React, {Component} from 'react';

import {DeletePackage, allPackage} from "../../../../../functions/ServerConnection";
import NotificationManager from "../../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import ax from '../../../../../../assets/img/2574.jpg'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {Button, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PreviewCategories from "../../../../Sub/CategoriesHomePage/PreviewCategories/PreviewCategories";
import PreviewPackages from "../../../../Sub/WonderPackageAddHomePage/subPackage/PreviewPackages";

class PackagePreviewHomePages extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,MouseOver:false,Edit:false,PackageList:[],Data:[]
        };
        this.toggleLarge=this.toggleLarge.bind(this)
    }
    static getDerivedStateFromProps(props, state) {
        if (props.items !== state.Data) {
            let Data = [];
            // if (props.edit) {
            //     Data = props.items.Data;
            //     // console.log('Data');
            //     // console.log(Data);
            //     return {
            //         Data
            //     };
            // } else {
                Data = props.items.Data.Items;
                // console.log('Data');
                // console.log(Data);deleteComponent
                return {
                    Data
                };
            // }
        }
        // Return null if the state hasn't changed
        return null;
    }

    ClickEdit(Name){
        console.log(Name);
        this.props.ChangeComponent(Name,'Package',this.props.position);
        this.toggleEdit()
    }

    async handelDelete() {
        this.props.deleteComponent(this.props.header,'Package',this.props.position);
        // let data= await DeleteCategoriey(this.props.header);
        let id=this.props.header;
        // if(data===200){
        NotificationManager.success(
            "congratulation",
            "your Package deleted",
            3000,
            null,
            null,
            "success"
        );
        // console.log(data);
        // const $el = document.getElementById(`${id}`);
        // const duration = 2;
        // const from = { opacity: 0};
        // TweenMax.to($el, duration, from);
        // setTimeout(() => {
        //     $el.remove();
        // }, 2000)
        // }
        this.toggleLarge()
    }
    handelclickDelete() {
        this.setState({
            deleteItem: true
        })
    }

    async handelclickEdit() {
        this.setState({
            Edit: true
        });

        let PackageList = await allPackage();
        console.log(PackageList);
        this.setState({
            PackageList
        });
        // console.log(CategoriesList[0].Items[0].Image);


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
        let{items}=this.props;
        // console.log('items');

        let{PackageList,Data}=this.state;
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
                                `${this.props.items.Title}پکیچ `
                            }
                        </CardTitle>
                }

                <div className=' d-flex flex-column w-100 point-review position-relative h-100'>
                    <div className=' vh15 d-flex '>
                        <div className='h-100 col-7  paddingZero '  >
                            {/*<img src={items.Data[0].Image} className='img-self-fill br02' />*/}
                            <img src={ Data[0].Image} className='img-self-fill br02' />
                        </div>
                        <div className='h-100 col-5 padding-top-Zero padding-bottom-Zero padding-right-Zero  pl-2 '  >
                            <img src={ Data[1].Image} className='img-self-fill br02 '/>
                        </div>
                    </div>
                    <div className='d-flex vh15 mt-2'   >
                        <div className='h-100 col-12  paddingZero '>
                            <img src={ Data[2].Image} className='img-self-fill br02'/>
                        </div>
                    </div>
                    <div className=' vh15 d-flex mt-2 ' >
                        <div className='h-100 col-5 paddingZero '  >
                            <img src={ Data[3].Image} className='img-self-fill br02 '/>
                        </div>
                        <div className='h-100 col-7   padding-top-Zero padding-bottom-Zero padding-right-Zero  pl-2'   >
                            <img src={typeof Data[4] === 'undefined'? ax: Data[4].Image} className='img-self-fill br02'/>
                        </div>
                    </div>
                </div>
                {/*<div className='d-flex flex-column'></div>*/}
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
                        Change package {this.props.header}

                    </ModalHeader>
                    <ModalBody>
                        <div className='col-12 d-flex '>
                            <div className='col-12 d-flex flex-column justify-content-end'>
                                {
                                    PackageList.length>0?
                                        PackageList.map((cat ,index)=><PreviewPackages select={true} baner={true} id={PackageList[index]._id} key={index} header={cat.Name} ax1={PackageList[index].Items[0].Image} ax2={PackageList[index].Items[1].Image} ax3={PackageList[index].Items[2].Image} ax4={PackageList[index].Items[3].Image}  ax5={PackageList[index].Items[4].Image} clickPreview={this.ClickEdit.bind(this)}/>  ):""

                                }
                            </div>


                        </div>
                    </ModalBody>


                </Modal>
            </div>
        );
    }
}

export default PackagePreviewHomePages;