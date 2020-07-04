 import React, {Component} from 'react';
import {  Modal, ModalBody, ModalHeader} from "reactstrap";
import ax1 from './../../../assets/img/4th.jpg'
import JustCropImg from "../../Common/CropImg/JustCropImg";
 import {GetImageId, sendImg} from "../../functions/ServerConnection";
import {getCategoryDetailwithId,UpdateCategory} from './../../functions/ServerConnection'
import Loader from "../../Common/Loader/Loader";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
 import RowShowShowColEdit from "../../Common/RowShowShowColEdit/RowShowShowColEdit";
 import {error_Notification} from "../../functions/componentHelpFunction";



class ContentCategoryUpdate extends Component {
    constructor(props) {
        super(props);
        this.state={modalLarge:false, Destination1: "", ax1File:"" , name:'',ax1:ax1,error:{  ax:""},loader:false,id:''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount(){
        const {match: {params}} = this.props;
        // ****************Get Category Detail with ID**********
        let DetailCategory=await getCategoryDetailwithId(params.Id);
        // **********checking to get validate Data*********
         if (DetailCategory['Description']!==undefined){
            NotificationManager.error(
                "error",
                DetailCategory['Description'],
                3000,
                null,
                null,
                "error"
            );
        }
        this.setState({
            ax1: DetailCategory['image'],
            name: DetailCategory['name'],
            id: DetailCategory['_id']
        });
     }
    // *********handel modal for get image********
    toggleLarge = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };


    // ******handel subimt form for update category********
    async handleSubmit(event) {
        event.preventDefault();
        var  validate=true;
        let{ax1File}=this.state;
        if (ax1File.length<1){
            validate = false;
            let {error} = this.state;
            error['ax'] = "عکس باید انتخاب شود  ";
            this.setState({
                error
            })
        }else {
            let {error} = this.state;
            error['ax'] = "";
            this.setState({
                error
            })
        }
        // ***********if validation is true then submit form*********
            if (validate===true){
                this.setState({
                    loader:true
                });
                let{ax1File}=this.state;
                // let idax = await sendImg(ax1File, 'Public');
                let idax =   await GetImageId(ax1File, 'Public');



                let updateCat=await UpdateCategory(this.state.id ,idax);
                this.setState({
                    loader:false
                });
                let{state,Description}= updateCat ;
                if (state===200){
                NotificationManager.success(
                    "congratulation",
                    "your category update",
                    3000,
                    null,
                    null,
                    "success"
                );
            }else {
                NotificationManager.error(
                    "error",
                    Description,
                    3000,
                    null,
                    null,
                    "error"
                );
            }

        }
    }
    // *********GET image values function and close modal for get image********
    GetImgFile(file,Destination , label ,base64){
        switch(label) {
            case 'عکس اول':
                this.setState({
                    Destination1:Destination, ax1File:file ,ax1:base64
                });
                break;
            default:
                console.log("cant know why? but your sucks")
        }
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }
    render() {
        let{isOpen,ax1,error,loader}=this.state;
        return (
            loader?<div className='d-flex col-6 justify-content-center h-25vh'>
                    <Loader/>
                </div>:
                <div  >
                    <form onSubmit={this.handleSubmit}>
                        <div className="d-flex flex-column align-items-center justify-content-center">

                            <div className="col-6">
                                <div className='d-flex col-12 d-flex justify-content-center m-2'>
                                    <RowShowShowColEdit label='اسم' value={this.state.name} col='col-12 d-flex justify-content-center'/>
                                </div>
                                <div className='d-flex col-12 flex-column paddingZero  '>
                                    <div className="col-12 p-0">
                                        <div className=' w-100    mb-1 pointer h-30vh'
                                             onClick={this.toggleLarge.bind(this, '1')}>
                                            <img src={ax1} className='img-self-fill br02'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary'>ارسال</button>
                            <div className='d-flex flex-column col-6'>
                                {
                                    error['ax'].length>1?<span className='alert alert-danger mt-3 col-12'>{error['ax']}</span>:""
                                }
                            </div>
                        </div>

                    </form>

                    <Modal
                        isOpen={ isOpen}
                        size="lg"
                        toggle={this.toggleLarge}
                    >
                        <ModalHeader toggle={this.toggleLarge}>
                        </ModalHeader>
                        <ModalBody>
                            <div className='col-12 d-flex flex-column'>
                                {
                                    <JustCropImg label='عکس اول' aspect={1/1} GetImgFile={this.GetImgFile.bind(this)}  />
                                }
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
        );
    }
}

export default ContentCategoryUpdate;