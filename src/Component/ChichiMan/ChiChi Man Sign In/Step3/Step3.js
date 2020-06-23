import React, {Component} from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import WizardBottonNavigations from "../Sub/WizardBottonNavigations";
import {
     sendingAllImageFunction,
    sendingImageFunction,
    UpdateChichiManPersonalInfo
} from "../../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";
import CardComponentChichi from "../../../Common/CardComponent/CardComponentChichi";
import {AddImageForm, FormInput, FormSelect, SetDataPersian} from "../../../Common/ComponentFunctional/FormFeilds";


const SignupSchema = Yup.object().shape({

    //
    PhoneNumber: Yup.number()
        .required("شماره تلفن اجباری است!"),
    SSN: Yup.number()
        .required("شماره کد ملی  اجباری است!").min(1000000000,'شماره کد ملی باید ده کاراکتر باشد'),
    // CN: Yup.number()
    //     .required("شماره شناسنامه اجباری است!"),
    // CNPlace: Yup.string()
    //     .required("محل صدور شناسنامه اجباری است!"),
    MartialStatus: Yup.string()
        .required("وضعیت تاهل خود را انتخاب کنید "),
    Name: Yup.string()
        .required("نام اجباری است!"),
    LastName: Yup.string()
        .required("نام خانوادگی اجباری است!"),
    Address: Yup.string()
        .required("آدرس اجباری است!"),

});




const SexOption = [
    { value: "مرد", label: "مرد" },
    { value: "زن", label: "زن" },
    { value: "دیگران", label: "دیگران" },
 ];
const MartialStatusOption = [
    { value: "مجرد", label: "مجرد" },
    { value: "متاهل", label: "متاهل" },
  ];

class Step3 extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:true,ChanceTypeOption:[],
            Img:{'SSN':'',"CN":'','Personal':''},Date:'',ax:{"SSN":"", "CN": "", "Personal": ""},axError:{"SSN":"", "CN": "", "Personal": ""},initialValue:{
                Name:'',
                LastName:'',
                PhoneNumber: "",
                Address:'',
                SSN:'',
                CN:'',
                CNPlace:'',
                Sex:{value: "مرد",label: "مرد"},
                MartialStatus:{value: "مجرد",label: "مجرد"},
            },
            showLoader:false
        }
    }


    // ************update Data***********
    static getDerivedStateFromProps(props, state) {
        console.log('props.info');
        console.log(props.info);
        if (props.info !== state.initialValue && props.info!==''  ) {
            return {
                initialValue: props.info,
                Date: props.info['Birthday']
            };
        }
         return null;
    }




    // **********get image ***********

    GetImag(Type,value){
        let {ax}=this.state;
        ax[Type]=value;
        this.setState({
            ax
        })

    }

    // **********get time ***********
    GetData(Data){
         if (Data!==null){
            let Date=`${Data.year}/${Data.month}/${Data.day}`;
            console.log(Date);
            this.setState({
                Date
            });
        }
     }



    // **********submit function***********

    handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            ...values,
            Sex: values.Sex.value,
            MartialStatus: values.MartialStatus.value,
            // ChanceType: values.ChanceType.value,
            // Name: values.Name.value,
        };

        // **********if update ***********

        if (this.props.info!=='' ) {
            console.log("this is update");
            // ***get Image from url********
            let SSN_IMAGE=this.state.initialValue['SSnImg'].split("/")[6];
            let SERIAL_IMAGE=this.state.initialValue['CNImg'].split("/")[6];
            let ProfilePic=this.state.initialValue['personalImg'].split("/")[6];
            let idimgs=[SSN_IMAGE,SERIAL_IMAGE,ProfilePic];

            let {Date, ax} = this.state;
            // ****sending image******
            let ImgeFiles = [ax['SSN'], ax['CN'], ax['Personal']];
            let ImgeId =await sendingImageFunction(ImgeFiles,idimgs);
             let Data={
                "PhoneNumber":this.props.PhoneNumber,
                "FirstName": payload.Name,
                "LastName": payload.LastName,
                "SSN": payload.SSN.toString(),
                "Serial": payload.CN.toString(),
                "ProfilePic": ImgeId[2],
                "Birthday": Date,
                "Address": payload.Address,
                "MartialStatus": payload.MartialStatus,
                "Sex": payload.Sex,
                "PlaceOfIssue": payload.CNPlace,
                "HomePhone": payload.PhoneNumber.toString(),
                "SSN_IMAGE": ImgeId[0],
                "SERIAL_IMAGE": ImgeId[1]
            };
            console.log(Data);
            let Register = await UpdateChichiManPersonalInfo(JSON.stringify(Data));
            console.log(Register);
            this.setState({
                showLoader: false
            });
            let {state, Description} = Register;
            if (state) {
                success_Notification( "اطلاعات شما با موفقیت ثبت شد");
                let send=document.getElementById("sendItems");
                send.click();
            } else {
               error_Notification(state, Description);
            }

            // **********if submit ***********

        }else {
            console.log("this is submit");

            console.log(payload);
            let {Date, ax, axError} = this.state;
            console.log(Date);
            let axValid = true;
            if (ax['SSN'] === '') {
                axValid = false;
                axError['SSN'] = "عکس کد ملی اجباری است "
            }else {
                axError['SSN'] = ""
            }
            if (ax['CN'] === '') {
                axValid = false;
                axError['CN'] = "عکس شناسنامه اجباری است "
            }else {
                axError['CN'] = ""
            }

            if (ax['Personal'] === '') {
                axValid = false;
                axError['Personal'] = "عکس کاربری اجباری است  "
            }else {
                axError['Personal'] = ""
            }
            this.setState({
                axError
            })

            if (axValid) {

                this.setState({
                    showLoader:true
                });

                // let ImgeFiles = [ax['SSN'], ax['CN'], ax['Personal']];

                // let ImgeId = await sendingAllImageFunction(ImgeFiles);
                let ImgeId = ["5ef06b402313e180fb581691","5ef06b402313e180fb581691","5ef06b402313e180fb581691"];
                console.log(ImgeId);
                let Data={
                    "PhoneNumber":this.props.PhoneNumber,
                    "FirstName": payload.Name,
                    "LastName": payload.LastName,
                    "SSN": payload.SSN.toString(),
                    "Serial": payload.CN.toString(),
                    "ProfilePic": ImgeId[2],
                    "Birthday": Date,
                    "Address": payload.Address,
                    "MartialStatus": payload.MartialStatus,
                    "Sex": payload.Sex,
                    "PlaceOfIssue": payload.CNPlace,
                    "HomePhone": payload.PhoneNumber.toString(),
                    "SSN_IMAGE": ImgeId[0],
                    "SERIAL_IMAGE": ImgeId[1]
                };
                console.log(Data);

                let {state, Description} = await UpdateChichiManPersonalInfo(JSON.stringify(Data));
                 this.setState({
                    showLoader: false
                });
                 if (state) {
                    success_Notification("اطلاعات شما با موفقیت ثبت شد");
                    let send=document.getElementById("sendItems");
                    send.click();
                } else {
                    error_Notification(state, Description);

                }

            }


        }

    };

    render() {


        let{axError}=this.state;
        return (


            <IsLoaderComponent isLoader={this.state.showLoader}>
                <CardComponentChichi header="اطلاعات اولیه ">

                    <Formik
                        initialValues={this.state.initialValue}
                        validationSchema={SignupSchema}
                        onSubmit={this.handleSubmit.bind(this)}
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
                                <div className="w-100 d-flex ">

                                    <FormInput  label='نام' type='text' name='Name' placeHolder="نام چی چی من رو وارد کنید !" DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                    <FormInput  label='نام خانوادگی' type='text' name='LastName' placeHolder="نام خانوادگی چی چی من رو وارد کنید !" DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                </div>
                                <div className="w-100 row m-0 ">

                                    <FormInput  label='آدرس' type='text' name='Address' placeHolder="آدرس را وارد کنید !" DivClass="col-sm-12 col-md-8" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                    <SetDataPersian DivClass="col-sm-12 col-md-4 rowInput" label='تاریخ تولد' Data={this.state.initialValue['Birthday']} GetData={this.GetData.bind(this)}/>


                                </div>
                                <div className="w-100 row flex-wrap m-0 ">
                                    <FormInput  label='شماره تماس منزل' type='number' name='PhoneNumber' placeHolder="011-1111111" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                    <FormInput  label='شماره کد ملی' type='number' name='SSN' placeHolder="شماره ده رقمی  کارت ملی را وارد کنید!" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                    <FormInput  label='شماره شناسنامه' type='number' name='CN' placeHolder="شماره شناسنامه را وارد کنید !" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                    <FormInput  label='صادره از' type='text' name='CNPlace' placeHolder="شماره شناسنامه را وارد کنید !" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                    <FormSelect label={'جنسیت'} name={'Sex'}  option={SexOption} DivClass="col-sm-12 col-md-4" values={values} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} errors={errors} touched={touched} />

                                    <FormSelect label={'وضعیت تاهل'} name={'MartialStatus'}  option={MartialStatusOption} DivClass="col-sm-12 col-md-4" values={values} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} errors={errors} touched={touched} />

                                </div>
                                <div className="w-100 d-flex mt-2 ">

                                    <AddImageForm label='عکس کارت ملی' type='SSN' img={this.state.initialValue['SSnImg']} errors={axError} GetImag={this.GetImag.bind(this)} DivClass="col-sm-12 col-md-4"/>

                                    <AddImageForm label='عکس شناسنامه' type='CN' img={this.state.initialValue['CNImg']} errors={axError} GetImag={this.GetImag.bind(this)} DivClass="col-sm-12 col-md-4"/>

                                    <AddImageForm label='عکس پرسنلی' type='Personal' img={this.state.initialValue['personalImg']} errors={axError} GetImag={this.GetImag.bind(this)} DivClass="col-sm-12 col-md-4"/>
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

export default Step3;
