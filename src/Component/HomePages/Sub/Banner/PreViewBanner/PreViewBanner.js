import React, {Component} from 'react';
import { MdDeleteForever } from "react-icons/md";
import {DeleteBanner} from "../../../../functions/ServerConnection";
import HeaderPreviewComponentHomePage from "../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";
import {ModalDelete} from "../../../../Common/Modals/ModalDelete/ModalDelete";
import {error_Notification, RemoveElement2, success_Notification} from "../../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../../Common/Loader/IsLoader/IsLoaderComponent";

class PreViewBanner extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteItem:false,MouseOver:false,showLoader:false
        };
        this.handelEnter =this.handelEnter.bind(this);
        this.handelLeave =this.handelLeave.bind(this);
    }
    clickEdit(value){
        console.log(value);
        this.props.clickPreview(value,this.props.id);
    }

    async handelDelete() {
        this.setState(prevState => ({
            showLoader:true
        }));
         let {state ,Description }= await DeleteBanner(this.props.id);

        if(state===200){
            success_Notification("بنر مورد نظر حذف شد!")
            RemoveElement2(this.props.header)
        }else {
            error_Notification("خطا" ,`شما نمی توانید این اسلایدر را حذف کنید چون در صفحه   ${Description} استفاده شده است `)
        }

        this.setState(prevState => ({
            showLoader:false,
        }));
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
        let{ax}=this.props;
        return (
            <div dir="ltr"  id={this.props.header}>

                <IsLoaderComponent isLoader={this.state.showLoader}>
                    <div   className={['w-100','d-flex','flex-column',this.props.index===0?'':'mt-3' ].join(' ')}  onMouseOver={this.handelEnter.bind(this)} onMouseLeave={this.handelLeave.bind(this)} >
                         <HeaderPreviewComponentHomePage handelEdit={this.clickEdit.bind(this)} handelclickDelete={()=>{this.toggleLarge()}} Name={this.props.header} baner={true} {...this.props}/>

                        <div className=' d-flex flex-column w-100 point-review position-relative h-100'>
                            {
                                this.props.baner?"":
                                    this.state.MouseOver? <div className='col-12 height30vh   d-flex justify-content-center align-items-center overly'>
                                         <div className=' d-flex justify-content-center align-items-center categoriesIconReview m-2' onClick={()=>{this.toggleLarge()}}><MdDeleteForever/></div>
                                    </div>:''
                            }
                            <div className=' height30vh d-flex '>
                                <div className='h-100 w-100  mt-1 mb-1 pointer ' >
                                    <img src={ax} className='img-self-fill br02'/>
                                </div>
                            </div>
                        </div>


                        <ModalDelete isOpen={this.state.deleteItem} toggle={()=>{this.toggleLarge()}} item={"بنر "}  deleteComponent={this.handelDelete.bind(this)}/>


                    </div>
                </IsLoaderComponent>

            </div>



        );
    }
}

export default PreViewBanner;