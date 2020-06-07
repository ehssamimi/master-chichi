import React, {Component} from 'react';
import {FormGroup, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import ax1 from './../../../assets/img/4th.jpg'
import JustCropImg from "../../Common/CropImg/JustCropImg";
 import {sendImg} from "../../functions/ServerConnection";
import {AddCategory} from './../../functions/ServerConnection'
import Loader from "../../Common/Loader/Loader";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";

class ContentCategoryAdd extends Component {
    constructor(props) {
        super(props);
        this.state={modalLarge:false, Destination1: "", ax1File:"" ,ax1:ax1, name:'',error:{name :"", ax:""},loader:false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    toggleLarge = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    handleChange(event) {
         this.setState({name: event.target.value});
    }

   async handleSubmit(event) {
         event.preventDefault();
         // ***** check validate form***********
         var  validate=true;
        let{name,ax1File}=this.state;
        console.log(name);
        console.log(ax1File);
        if (name.length<1){
            validate = false;
            let {error} = this.state;
            error['name'] = "اسم باید مشخص شود ";
            this.setState({
                error
            })
        }else {
            let {error} = this.state;
            error['name'] = "";
            this.setState({
                error
            })
        }
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
       // ***** submit form if validation is true***********

        if (validate===true){
            this.setState({
                loader:true
            });
             let{name,ax1File}=this.state;
            let idax = await sendImg(ax1File, 'Public');
            let Data={
                "name": name,
                "image": idax
            };
             let addCat=await AddCategory(JSON.stringify(Data));
            this.setState({
                loader:false
            });

            let{state,Description}= addCat ;
            if (state===200){
                NotificationManager.success(
                    "congratulation",
                    "your category add",
                    3000,
                    null,
                    null,
                    "success"
                );
            } else {
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
    GetImgFile(file,Destination , label ,base64){
        // console.log(file);
        // console.log(Destination);
        // console.log(label);


                this.setState({
                    Destination1:Destination, ax1File:file ,ax1:base64
                });



        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }
    render() {
        let{isOpen,ax1,name,error,loader}=this.state;
        return (
            loader?
                <div className='d-flex col-6 justify-content-center h-25vh'>
                    <Loader/>
                </div>
            :
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className='col-6'>

                            {/********get name of category**********/}
                            <FormGroup className="form-group has-float-label position-relative">
                                <Label>
                                    <span>نام</span>
                                </Label>
                                <input type="text" className="form-control" value={ name || ''}
                                       onChange={this.handleChange}/>
                            </FormGroup>
                        </div>
                        {/********open modal for get image of category**********/}

                        <div className="col-6">
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
                        {/********show errors of form to get name and image**********/}
                        <div className='d-flex flex-column col-6'>
                            {
                                error['name'].length>1?<span className='alert alert-danger mt-3 col-12'>{error['name']}</span>:""
                            }
                            {
                                error['ax'].length>1?<span className='alert alert-danger mt-3 col-12'>{error['ax']}</span>:""
                            }

                        </div>
                    </div>

                </form>
                {/********  modal for get image of category**********/}

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
                                <JustCropImg label='انتخاب عکس' aspect={1/1} GetImgFile={this.GetImgFile.bind(this)}  />
                            }
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ContentCategoryAdd;