import React, {Component} from 'react';
import Destination from "../../Destination/Destination";
import {addBaner, GetImageId } from "../../../../functions/ServerConnection";
import {FormGroup } from "reactstrap";
import ax from './../../../../../assets/img/4th.jpg'
 import {HandelResponse} from "../../../../functions/componentHelpFunction";
import {TextInput} from "../../../../Common/ComponentFunctional/Forms/textInput/TextInput";
import {ModalCropImage} from "../../../../Common/ComponentFunctional/ModalsCollection";
import IsLoaderComponent from "../../../../Common/Loader/IsLoader/IsLoaderComponent";

class AddBanerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            ax:ax ,axFile:'',name:'',Destination:'',DestinationString:'',modalLarge:false,showLoader:false,error:{name:"",DestinationString:"",img:''}
        };
         this.handelSend = this.handelSend.bind(this);
     }

    validateForm=(callback)=> {
         let Errors={name:"",DestinationString:"",img:''};
        let formValidate=true;

        let {axFile, name, DestinationString} = this.state;


        if (name.length===0) {
            formValidate = false;
            Errors['name'] = "اسم باید مشخص شود   ";
        }
        if (DestinationString.length===0) {
            formValidate = false;
            Errors['DestinationString'] = " مقصد درستی مشخص نشده! ";
        }
        if (axFile.length===0) {
            formValidate = false;
            Errors['img'] = " عکس بنر باید انتخاب شود ";
        }


        console.log("Error");
        console.log(Errors);

        this.setState({
            error:Errors
        },()=>{
            console.log(this.state.Errors)
        })
        return callback(formValidate)
    };


    async handelSend() {
        this.validateForm(async (validate)=> {
            if (validate) {
                let {axFile, name, DestinationString,Destination} = this.state;
                this.setState(prevState => ({
                    showLoader:!prevState.showLoader,
                }));

                 let img =  await GetImageId(axFile, 'Public');

                let {state,Description } = await addBaner(name, img, DestinationString, Destination);
                HandelResponse(state,Description,"بنر جدید ثبت شد ");
                this.setState(prevState => ({
                    showLoader:!prevState.showLoader,
                }));
                if (state===200){
                    this.props.updateListComponents();
                }
                console.log(Description);


            } else {
                console.log(this.state.Errors)
            }
        })


    }

    GetDestinationString(DestinationString , Destination){
         this.setState({
            DestinationString,Destination
        })
    }

    toggleLarge = () => {
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    };

    GetImgFile(file,Destination , label , Base64){

        this.setState({
            ax:Base64, axFile:file
        });
        this.toggleLarge()
    }
    render() {
        let{error}=this.state;
        return (
            <div className='w-100'>
                <IsLoaderComponent isLoader={  this.state.showLoader}>
                    <div>
                        {/*****get name*****/}
                        <FormGroup className="form-group  position-relative has-float-label w-100">

                            <TextInput id={"name"} placeholder={"نام مورد نظر را وارد کنید"}
                                       error={error['name']} label={"انتخاب نام"}
                                       onChange={(e,a)=>{this.setState({name:e})}}
                            />
                        </FormGroup>
                        {/*****get destination*****/}

                        <FormGroup className="form-group  position-relative   w-100">

                            <Destination GetDestinationString={this.GetDestinationString.bind(this)}
                            />
                            {error['DestinationString']? (
                                <div className="invalid-feedback d-block">
                                    {error['DestinationString']}
                                </div>
                            ) : null}
                        </FormGroup>
                        {/*****get image*****/}

                        <div className='d-flex col-12 flex-column paddingZero   '>
                            <div className='col-12'>
                                <div className='height30vh   mt-1 mb-1 pointer   '
                                     onClick={()=>{this.toggleLarge()}}>
                                    <img src={this.state.ax} className='img-self-fill br02'/>
                                </div>
                                {error['img']? (
                                    <div className="invalid-feedback d-block">
                                        {error['img']}
                                    </div>
                                ) : null}
                                <button className='btn btn-primary' onClick={this.handelSend}>ارسال</button>
                            </div>
                        </div>
                        {/*****  image modal*****/}
                        <ModalCropImage  isOpen={this.state.modalLarge}  toggle={this.toggleLarge}  label={"اضافه کردن عکس "} aspect={3 / 1}  GetImgFile={this.GetImgFile.bind(this)} />

                    </div>
                </IsLoaderComponent>

            </div>

        );
    }
}

export default AddBanerHomePage;