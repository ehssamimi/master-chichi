import React, {Component} from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import WizardBottonNavigations from "../Sub/WizardBottonNavigations";
import {
    sendingAllImageFunction,
    sendingImageFunction,
    UpdateChichiManContactInfo
} from "../../../functions/ServerConnection";
 import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";
import CardComponentChichi from "../../../Common/CardComponent/CardComponentChichi";
import {AddImageForm, FormInput, FormSelect, SetDataPersian} from "../../../Common/ComponentFunctional/FormFeilds";
const SignupSchema = Yup.object().shape({


    form: Yup.number()
        .required("شماره فرم اجباری است!"),
    // attachNumber: Yup.number()
    //     .required("شماره پیوست اجباری است!"),
    sabet: Yup.number()
        .required("ثبت میزان حقوق ثابت اجباری است!"),
    // darsad: Yup.number()
    //     .required("ثبت میزان حقوق درصدی اجباری است!"),

});

const options = [
    { value: "فعال", label: "فعال" },
    { value: "غیر فعال", label: "غیر فعال" },
    { value: "نا مشخص", label: "نامشخص" },
    // { value: "Gun", label: "Gun" }
];


class Step5 extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:true,
            Img:{'contract':'',"safte":'',"soePishine":''},  ax:{'contract':'',"safte":'',"soePishine":''},axError:{'contract':'',"safte":'',"soePishine":''},
            initialValue:{    form: '',
                attachNumber:'',
                sabet: "",
                darsad:'',
                Kind: {value: "فعال", label: "فعال"}},
            showLoader:false,Date:{}
        }
    }

    // ************update Data***********
    static getDerivedStateFromProps(props, state) {
        console.log(props.info);
        console.log('props.info');
        if (props.info !== state.initialValue && props.info!==''  ) {
            return {
                initialValue: props.info,
                Date:props.info['Date']
            };
        }
        return null;
    }



    GetImag(Type,value){
        let {ax}=this.state;
        ax[Type]=value;
        this.setState({
            ax
        },()=>{
            // console.log(ax)
            // console.log(ax['SSN'])
        })
        // console.log('Type');
        // console.log(Type);
        // console.log('value');
        // console.log(value);

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
            // let ImgeFiles = [ax['contract'], ax['safte'] , ax['soePishine'] ];

            let contract_IMAGE=this.state.initialValue['contract'].split("/")[6];
            let safte_IMAGE=this.state.initialValue['safte'].split("/")[6];
            let soePishine_IMAGE=this.state.initialValue['soePishine'].split("/")[6];
            let idimgs=[contract_IMAGE,safte_IMAGE,soePishine_IMAGE];

            let {Date, ax} = this.state;

            let ImgeFiles = [ax['contract'], ax['safte'] , ax['soePishine'] ];
            let ImgeId =await sendingImageFunction(ImgeFiles,idimgs);
            let Data={

                "PhoneNumber": this.props.PhoneNumber,
                "Image": ImgeId[0].toString(),
                "Status": payload.Kind,
                "BasePayment": payload.darsad.toString(),
                "EndOfContract": Date['end'],
                "BeginOfContract": Date['begin'],
                "Percentage": payload.sabet.toString(),
                "FormNumber": payload.form.toString(),
                "AttachmentNumber": payload.attachNumber.toString(),
                "SoePishineImage": ImgeId[2],
                "Safteh": ImgeId[1]

            };
            console.log(Data);
            let Register = await UpdateChichiManContactInfo(JSON.stringify(Data));
            console.log(Register);
            this.setState({
                showLoader: false
            });
            let {state, Description} = Register;
            if (state) {
                success_Notification("اطلاعات شما با موفقیت ثبت شد")

                let send=document.getElementById("sendItems");
                send.click();
            } else {
                error_Notification(state, Description);

            }

            // **********if submit ***********

        }else {
            let {Date, ax, axError} = this.state;
            let axValid = true;

            if (ax['contract'] === '') {
                axValid = false;
                axError['contract'] = "عکس  قرارداد اجباری است  "
            }else {
                axError['contract'] = ""
            }
            if (ax['safte'] === '') {
                axValid = false;
                axError['safte'] = "عکس سفته اجباری است "
            }else {
                axError['safte'] = ""
            }
            if (ax['soePishine'] === '') {
                axValid = false;
                axError['soePishine'] = "عکس سوپیشینه اجباری است "
            }else {
                axError['soePishine'] = ""
            }

            this.setState({
                axError
            })

            if (axValid) {
                this.setState({
                    showLoader:true
                });
                let ImgeFiles = [ax['contract'], ax['safte'] , ax['soePishine'] ];
                // let ImgeId = await sendingAllImageFunction(ImgeFiles);
                console.log(ImgeFiles);
                let ImgeId = ["5ef06b402313e180fb581691","5ef06b402313e180fb581691","5ef06b402313e180fb581691"];
                console.log(ImgeId);
                let Data={
                    "PhoneNumber": this.props.PhoneNumber,
                    "Image": ImgeId[0].toString(),
                    "Status": payload.Kind,
                    "BasePayment": payload.darsad.toString(),
                    "EndOfContract": Date['end'],
                    "BeginOfContract": Date['begin'],
                    "Percentage": payload.sabet.toString(),
                    "FormNumber": payload.form.toString(),
                    "AttachmentNumber": payload.attachNumber.toString(),
                    "SoePishineImage": ImgeId[2],
                    "Safteh": ImgeId[1]
                };
                console.log(Data);
                console.log(axError);

                let {state, Description} = await UpdateChichiManContactInfo(JSON.stringify(Data));
                this.setState({
                    showLoader: false
                });
                if (state) {
                    success_Notification("اطلاعات شما با موفقیت ثبت شد")
                    let send=document.getElementById("sendItems");
                    send.click();
                } else {
                   error_Notification(state, Description)
                }

            }
        }

    };
    GetData(Data,type){
        console.log(type);
        console.log(Data);
        if (type!==null){
            let date=`${type.year}/${type.month}/${type.day}`;
            console.log(date);
            let {Date}=this.state;
            Date[Data]=date;
            this.setState({
                Date
            },()=>{
                console.log(this.state.Date);
            });
        }
        // console.log(date)
    }


    render() {
        let{axError}=this.state;
        return (
            <IsLoaderComponent isLoader={this.state.showLoader}>
                <CardComponentChichi header="اطلاعات اولیه ">
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

                                <div className="w-100 d-flex ">

                                    <FormInput  label='شماره نامه/فرم' type='number' name='form' placeHolder="شماره نامه/فرم را وارد کنید!" DivClass="col-sm-12 col-md-3" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                    <SetDataPersian DivClass="col-sm-12 col-md-3 rowInput" label='از تاریخ' Data={this.state.initialValue['Date'] !==undefined?this.state.initialValue['Date']['begin']:undefined} GetData={this.GetData.bind(this,'begin')}/>

                                    <SetDataPersian DivClass="col-sm-12 col-md-3 rowInput" label='تا تاریخ' Data={this.state.initialValue['Date'] !==undefined?this.state.initialValue['Date']['end']:undefined} GetData={this.GetData.bind(this,'end')}/>

                                    <FormSelect label={'وضعیت'} name={'Kind'}  option={options} DivClass="col-sm-12 col-md-4" values={values} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} errors={errors} touched={touched} />

                                </div>
                                <div className="w-100 d-flex ">
                                    <FormInput  label='شماره پیوست' type='number' name='attachNumber' placeHolder="شماره نامه/فرم را وارد کنید!" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                    <FormInput  label='حقوق ثابت' type='number' name='darsad' placeHolder="قرارداد درصدی را وارد کنید!" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                    <FormInput  label='قرارداد درصدی' type='number' name='sabet' placeHolder="درصد قرار داد را وارد کنید!" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                </div>

                                <div className="w-100 d-flex ">
                                    <AddImageForm label='عکس قرارداد' type='contract' img={this.state.initialValue['contract']} errors={axError} GetImag={this.GetImag.bind(this)} DivClass="col-sm-12 col-md-4"/>
                                    <AddImageForm label='عکس سفته' type='safte' img={this.state.initialValue['safte']} errors={axError} GetImag={this.GetImag.bind(this)} DivClass="col-sm-12 col-md-4"/>
                                    <AddImageForm label='عکس سوپیشینه' type='soePishine' img={this.state.initialValue['soePishine']} errors={axError} GetImag={this.GetImag.bind(this)} DivClass="col-sm-12 col-md-4"/>
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

export default Step5;
