import React, {Component} from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {DeleteCategoriey} from "../../../../functions/ServerConnection";
import HeaderPreviewComponentHomePage from "../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";
import {ModalDelete} from "../../../../Common/Modals/ModalDelete/ModalDelete";
import {RemoveElement2, success_Notification} from "../../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../../Common/Loader/IsLoader/IsLoaderComponent";



class PreviewCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,MouseOver:false,deleteLoader:false
        };
     }



    async handelDelete() {
        this.setState(prevState => ({
            deleteLoader: !prevState.deleteLoader
        }));
        let data= await DeleteCategoriey(this.props.header);

        this.setState(prevState => ({
            deleteLoader: !prevState.deleteLoader
        }));


        if(data.state===200){
            success_Notification("دسته بندی مورد نظر حذف شد !")
            RemoveElement2(this.props.header)
        }
        this.toggleLarge()

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
                <IsLoaderComponent isLoader={ (this.props.showLoader === true && this.props.EditName === this.props.header) || (this.state.deleteLoader === true)}>
                    <div className={['w-100',this.props.index===0?'':'mt-3' ].join(' ')} onMouseOver={this.handelEnter.bind(this)} onMouseLeave={this.handelLeave.bind(this)} id={this.props.header} >

                        <HeaderPreviewComponentHomePage handelEdit={(value)=>{this.props.clickPreview(value,this.props.id)}} handelclickDelete={()=>{this.toggleLarge()}}   Name={this.props.header} {...this.props}/>

                        <div className=' d-flex w-100 point-review position-relative'>
                            {

                                this.state.MouseOver? <div className='w-100 h-100   d-flex justify-content-center align-items-center overly'>
                                    <div className=' d-flex justify-content-center align-items-center categoriesIconReview m-2  '
                                         onClick={()=>{this.props.clickPreview(this.props.header,this.props.id)}}
                                    ><FaRegEdit /></div>
                                    {
                                        this.props.select ? "" : <div
                                            className=' d-flex justify-content-center align-items-center categoriesIconReview m-2'
                                            onClick={()=>{this.toggleLarge()}}><MdDeleteForever/></div>
                                    }
                                </div>:''

                            }
                            <div className='d-flex col-6 flex-column paddingZero'>
                                <div className='h-20em w-100 pl-1   mb-1'>
                                    <img src={ax1} className='img-self-fill br02' alt="ax1"/>
                                </div>
                                <div className='h-15em w-100 pl-1  mb-1'>
                                    <img src={ax2} className='img-self-fill br02' alt="ax2"/>
                                </div>
                            </div>
                            <div className='d-flex col-6 flex-column padding-top-Zero padding-bottom-Zero padding-right-Zero pl-2 '>
                                <div className='h-15em w-100   mb-1'>
                                    <img src={ax3} className='img-self-fill br02' alt="ax3"/>
                                </div>
                                <div className='h-20em w-100   mb-1'>
                                    <img src={ax4} className='img-self-fill br02' alt="ax4"/>
                                </div>
                            </div>

                        </div>

                        <ModalDelete isOpen={this.state.deleteItem} toggle={()=>{this.toggleLarge()}} item={"دسته بندی "}  deleteComponent={this.handelDelete.bind(this)}/>

                    </div>

                </IsLoaderComponent>


            </div>

        );
    }
}

export default PreviewCategories;