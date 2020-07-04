import React, {Component} from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";

import WizardBottonNavigations from "../Sub/WizardBottonNavigations";
import {
    // sendImg, sendingAllImageFunction,
    sendingImageFunction,
    UpdateChichiManVehicleInfo
} from "../../../functions/ServerConnection";
 import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";
import CardComponentChichi from "../../../Common/CardComponent/CardComponentChichi";
import {AddImageForm, FormInput, FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";
import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";
 const SignupSchema = Yup.object().shape({

    Kind: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("نوع وسیله نقلیه اجباری است!"),

    DLN: Yup.number()
        .required("شماره گواهینامه اجباری است!"),
    VCN: Yup.string()
        .required("شماره کارت اجباری است!"),
    Plaque: Yup.string()
        .required("شماره پلاک اجباری است!"),

});



const options = [
    { value: "موتور", label: "موتور" },
    { value: "ماشین", label: "ماشین" },
    { value: "دوچرخه", label: "دوچرخه" },
 ];




class Step4 extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:true,ChanceTypeOption:[],
             ax:{"VCImg":"", "DLImg": "" },axError:{"VCImg":"", "DLImg": "" },initialValue:{Kind: {value: "موتور",label: "موتور"},
                DLN:'',
                VCN: "",
                Plaque:'' },
            showLoader:false
        }
    }


    // ************update Data***********
    static getDerivedStateFromProps(props, state) {
        console.log(props.info);
        console.log('props.info');
        if (props.info !== state.initialValue && props.info!==''  ) {
            return {
                initialValue: props.info,
             };
        }
        return null;
    }


    componentDidMount(){
        console.log(this.props.info)
    }

    GetImag(Type,value){
        // console.log('Type');
        //         // console.log(Type);
        //         // console.log('value');
        //         // console.log(value);
        let {ax}=this.state;
        ax[Type]=value;
        this.setState({
            ax
        },()=>{
            // console.log(ax)
            // console.log(ax['SSN'])
        })

    }

    handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            ...values,
          Kind: values.Kind.value,
            // ChanceType: values.ChanceType.value,
            // Name: values.Name.value,

        };
        console.log(payload);

        if (this.props.info!=='' ) {
            console.log("thi is update");

            let VCImg_IMAGE=this.state.initialValue['VCImg'].split("/")[6];
            let DLImg_IMAGE=this.state.initialValue['DLImg'].split("/")[6];
             let idimgs=[VCImg_IMAGE,DLImg_IMAGE];

            let {Date, ax} = this.state;

            let ImgeFiles = [ax['VCImg'], ax['DLImg']];


            let ImgeId =await sendingImageFunction(ImgeFiles,idimgs);

            let Data={

                "PhoneNumber": this.props.PhoneNumber,
                "DeliveryType": payload.Kind,
                "PlateNumber": payload.Plaque.toString(),
                "CardNumber": payload.VCN.toString(),
                "VehicleCardImage": ImgeId[0],
                "LicenseNumber": payload.DLN.toString(),
                "LicenseImage": ImgeId[1]

            };
            console.log(Data);
            let {state, Description} = await UpdateChichiManVehicleInfo(JSON.stringify(Data));
            this.setState({
                showLoader: false
            });
            if (state) {
                success_Notification("اطلاعات شما با موفقیت ثبت شد");
                let send=document.getElementById("sendItems");
                send.click();
            } else {
                error_Notification(state, Description)

            }

            // **********if submit ***********

        }else {
            let {Date, ax, axError} = this.state;
            console.log(Date);
            console.log(ax);
            let axValid = true;
            if (ax['VCImg'] === '') {
                axValid = false;
                axError['VCImg'] = "عکس کارت ماشین اجباری است  "
            }else {
                axError['VCImg'] = ""
            }
            if (ax['DLImg'] === '') {
                axValid = false;
                axError['DLImg'] = "عکس گواهینامه اجباری است "
            }else {
                axError['DLImg'] = ""
            }
            this.setState({
                axError
            });

            if (axValid) {
                this.setState({
                    showLoader:true
                });
                let ImgeFiles = [ax['VCImg'], ax['DLImg'] ];
                // let ImgeId =await sendingAllImageFunction(ImgeFiles)
                console.log(ImgeFiles)

                let ImgeId = ["5ef06b402313e180fb581691","5ef06b402313e180fb581691"];
                let Data={
                    "PhoneNumber": this.props.PhoneNumber,
                    "DeliveryType": payload.Kind,
                    "PlateNumber": payload.Plaque.toString(),
                    "CardNumber": payload.VCN.toString(),
                    "VehicleCardImage": ImgeId[0],
                    "LicenseNumber": payload.DLN.toString(),
                    "LicenseImage": ImgeId[1]
                };
                console.log(Data);
                let {state, Description} = await UpdateChichiManVehicleInfo(JSON.stringify(Data));
                this.setState({
                    showLoader: false
                });
                if (state) {
                    success_Notification("اطلاعات شما با موفقیت ثبت شد");
                    let send=document.getElementById("sendItems");
                    send.click();
                } else {
                    error_Notification(state, Description)

                }

            }

        }

    };


    render() {
        let{axError}=this.state;
         return (
             <IsLoaderComponent isLoader={this.state.showLoader}>
                 <CardComponentChichi header="اطلاعات نقلیه ">
                     <Formik
                         initialValues={this.state.initialValue}
                         validationSchema={SignupSchema}
                         onSubmit={this.handleSubmit}
                     >
                         {({
                               handleSubmit,
                               setFieldValue,
                               setFieldTouched,
                               handleChange,
                               handleBlur,
                               values,
                               errors,
                               touched,
                               isSubmitting
                           }) => (
                             <Form className="av-tooltip tooltip-label-bottom">
                                 <div className="w-100 row m-0 ">

                                     <FormInput  label='شماره گواهینامه' type='number' name='DLN' placeHolder="کد ده رقمی شماره گواهینامه" DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                     <FormSelect label={'نوع وسیله نقلیه'} name={'Kind'}  option={options} DivClass="col-sm-12 col-md-6" values={values} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} errors={errors} touched={touched} />

                                     <FormInput  label='کارت ماشین' type='text' name='VCN' placeHolder="شماره کارت وسیله نقلیه را وارد کنید !" DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                     <FormInput  label='پلاک' type='text' name='Plaque' placeHolder="پلاک وسیله نقلیه را وارد کنید !" DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>


                                 </div>

                                 <div className="w-100 d-flex ">

                                     <AddImageForm label='عکس کارت ماشین' type='VCImg' img={this.state.initialValue['VCImg']} errors={axError} GetImag={this.GetImag.bind(this)} DivClass="col-sm-12 col-md-6"/>

                                     <AddImageForm label='عکس گواهینامه' type='DLImg' img={this.state.initialValue['DLImg']} errors={axError} GetImag={this.GetImag.bind(this)} DivClass="col-sm-12 col-md-6"/>

                                 </div>

                                 <WizardBottonNavigations {...this.props}/>

                             </Form>
                         )}
                     </Formik>

                 </CardComponentChichi>
             </IsLoaderComponent>




        );
    }
}

export default Step4;
