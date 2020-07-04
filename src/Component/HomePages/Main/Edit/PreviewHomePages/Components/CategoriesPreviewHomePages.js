import React, {Component} from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ax from './../../../../../../assets/img/simpleProduct.jpg'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, CardTitle} from "reactstrap";
import {TweenMax} from "gsap/TweenMax";
import {DeleteCategoriey, GetCategoriesAll} from "../../../../../functions/ServerConnection";
import NotificationManager from "../../../../../../components/common/react-notifications/NotificationManager";
import PreviewCategories from "../../../../Sub/CategoriesHomePage/PreviewCategories/PreviewCategories";
import {Colxx} from "../../../../../../components/common/CustomBootstrap";

class CategoriesPreviewHomePages extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,MouseOver:false,Edit:false,CategoriesList:[],
            Data:[]
        };
        this.toggleLarge=this.toggleLarge.bind(this);
        this.ClickEdit=this.ClickEdit.bind(this);
        this.toggleEdit=this.toggleEdit.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.items !== state.Data) {
            let Data = [];
            // if (props.edit) {
            //     Data = props.items.Data;
            //     return {
            //         Data
            //     };
            // } else {
                Data = props.items.Data.Items;
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
        this.props.ChangeComponent(Name,'Category',this.props.position);
        this.toggleEdit()
    }

    async handelDelete() {
        this.props.deleteComponent(this.props.header,'Category',this.props.position);
        // let data= await DeleteCategoriey(this.props.header);
        // let id=this.props.header;
        //     NotificationManager.success(
        //         "congratulation",
        //         "your categories deleted",
        //         3000,
        //         null,
        //         null,
        //         "success"
        //     );
        //     // console.log(data);
        //     const $el = document.getElementById(`${id}`);
        //     const duration = 2;
        //     const from = { opacity: 0};
        //     TweenMax.to($el, duration, from);
        //     setTimeout(() => {
        //         $el.remove();
        //     }, 2000);
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
        })

            let CategoriesList = await GetCategoriesAll();
            console.log(CategoriesList);
            this.setState({
                CategoriesList
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
        // console.log(items);
        // console.log('items..Data.Items[0]');
        // console.log(items.Data.Items[0].Image);
        let {CategoriesList,Data}=this.state;
        // console.log(Data);
        return (
            <div   className=' w-100'  onMouseOver={this.handelEnter.bind(this)} onMouseLeave={this.handelLeave.bind(this)} id={this.props.header} >
                {
                    this.props.Edit?"":
                        <CardTitle className='d-flex'>
                            <div className='mr-auto'>
                                {/*<span className=' simple-icon-trash cursor-pointer' onClick={this.handelclickDelete.bind(this)}></span>*/}
                                <span className=' simple-icon-trash cursor-pointer' onClick={this.handelDelete.bind(this)}></span>
                                <span className='  iconsminds-file-edit cursor-pointer' onClick={this.handelclickEdit.bind(this)}></span>
                            </div>
                            {
                                `${this.props.items.Title}دسته بندی `
                            }
                        </CardTitle>
                }

                <div className=' d-flex w-100 point-review position-relative'>

                    {/*{*/}
                        {/*this.state.MouseOver? <div className='w-100 h-100   d-flex justify-content-center align-items-center overly'>*/}
                            {/*<div className=' d-flex justify-content-center align-items-center categoriesIconReview m-2' onClick={this.clickEdit.bind(this,this.props.header)}><FaRegEdit /></div>*/}
                            {/*<div className=' d-flex justify-content-center align-items-center categoriesIconReview m-2' onClick={this.handelclickDelete.bind(this)}><MdDeleteForever/></div>*/}
                        {/*</div>:''*/}
                    {/*}*/}
                    <div className='d-flex col-6 flex-column paddingZero'>
                        <div className='height25vh w-100  mt-1 mb-1'>
                            {/*<img src={items.Data[0].Image || items.Data.Items[0].Image || ax} className='img-self-fill br02'/>*/}
                            <img src={Data[0].Image} className='img-self-fill br02'/>
                        </div>
                        <div className='height20vh w-100  mt-1 mb-1'>
                            <img src={Data[1].Image} className='img-self-fill br02'/>
                        </div>
                    </div>
                    <div className='d-flex col-6 flex-column padding-top-Zero padding-bottom-Zero padding-right-Zero pl-2 '>
                        <div className='height20vh w-100 mt-1 mb-1'>
                            <img src={Data[2].Image} className='img-self-fill br02'/>
                        </div>
                        <div className='height25vh w-100 mt-1 mb-1'>
                            <img src={Data[3].Image} className='img-self-fill br02'/>
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

                <Modal
                    isOpen={this.state.Edit}
                    size="md"
                    toggle={this.toggleEdit}
                >
                    <ModalHeader toggle={this.toggleEdit}>
                        Change Category {this.props.header}

                    </ModalHeader>
                    <ModalBody>
              <div className='col-12 d-flex '>
                  <div className='col-12 d-flex flex-column justify-content-end'>
                      {
                          CategoriesList.length>0?
                              CategoriesList.map((cat ,index)=><PreviewCategories select={true} baner={true} id={CategoriesList[index]._id} key={index} header={cat.Name} ax1={CategoriesList[index].Items[0].Image} ax2={CategoriesList[index].Items[1].Image} ax3={CategoriesList[index].Items[2].Image} ax4={CategoriesList[index].Items[3].Image} clickPreview={this.ClickEdit.bind(this)}/>  ):""

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

export default CategoriesPreviewHomePages;