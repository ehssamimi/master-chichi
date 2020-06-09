import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle
} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import {
    FormikReactSelect,
} from "../../../../containers/form-validations/FormikFields";
// import * as Const from "../../../Const";
import ImgComponent from "../Sub/ImgComponent";
import {WithWizard} from "react-albus/lib";
import WizardBottonNavigations from "../Sub/WizardBottonNavigations";
import {sendImg, UpdateChichiManPersonalInfo, UpdateChichiManVehicleInfo} from "../../../functions/ServerConnection";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import Loader from "../../../Common/Loader/Loader";
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
    // { value: "Gun", label: "Gun" }
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
            console.log(ImgeFiles);
            console.log(idimgs);
            let ImgeId = [];
            let idax
            for (let i = 0; i < ImgeFiles.length; i++) {
                if (ImgeFiles[i]!==''){
                    idax = await sendImg(ImgeFiles[i], 'Public');
                    console.log(idax);
                } else {
                    idax=idimgs[i]
                }
                ImgeId.push(idax);
            }
            let Data={

                "PhoneNumber": this.props.PhoneNumber,
                "DeliveryType": payload.Kind,
                "PlateNumber": payload.Plaque.toString(),
                "CardNumber": payload.VCN.toString(),
                // "VehicleModel": "string",
                // "VehicleColor": "string",
                "VehicleCardImage": ImgeId[0],
                "LicenseNumber": payload.DLN.toString(),
                "LicenseImage": ImgeId[1]

            };
            console.log(Data);
            let Register = await UpdateChichiManVehicleInfo(JSON.stringify(Data));
            console.log(Register);
            this.setState({
                showLoader: false
            });
            let {state, Description} = Register;
            if (state) {
                NotificationManager.success(
                    "congratulation",
                    "اطلاعات شما با موفقیت ثبت شد",
                    3000,
                    null,
                    null,
                    "success"
                );
                let send=document.getElementById("sendItems");
                send.click();
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
            }, () => {

            });

            if (axValid) {
                this.setState({
                    showLoader:true
                });
                let ImgeFiles = [ax['VCImg'], ax['DLImg'] ];
                let ImgeId = []

                for (let i = 0; i < ImgeFiles.length; i++) {
                    let idax = await sendImg(ImgeFiles[i], 'Public');
                    console.log(idax);
                    ImgeId.push(idax);
                }
                console.log(ImgeId);

                let Data={
                    "PhoneNumber": this.props.PhoneNumber,
                    "DeliveryType": payload.Kind,
                    "PlateNumber": payload.Plaque.toString(),
                    "CardNumber": payload.VCN.toString(),
                    // "VehicleModel": "string",
                    // "VehicleColor": "string",
                    "VehicleCardImage": ImgeId[0],
                    "LicenseNumber": payload.DLN.toString(),
                    "LicenseImage": ImgeId[1]
                };
                console.log(Data);
                console.log(axError);
                // let send=document.getElementById("sendItems");
                // send.click();
                // VehicleCardImage  LicenseImage
                let Register = await UpdateChichiManVehicleInfo(JSON.stringify(Data));
                console.log(Register);
                this.setState({
                    showLoader: false
                });
                let {state, Description} = Register;
                if (state) {
                    NotificationManager.success(
                        "congratulation",
                        "اطلاعات شما با موفقیت ثبت شد",
                        3000,
                        null,
                        null,
                        "success"
                    );
                    let send=document.getElementById("sendItems");
                    send.click();
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






    };


    render() {
        let{axError}=this.state;
         return (
            this.state.showLoader?
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='col-6'>
                        <Loader/>
                    </div>
                </div>
                :
            <div dir='rtl'>
                <Row className="mb-4">
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <div className='d-flex justify-content-start'>
                                       <span>اطلاعات نقلیه</span>
                                    </div>
                                </CardTitle>

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
                                                <div className="col-sm-6 ">
                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <span>شماره گواهینامه</span>

                                                         </Label>
                                                        <Field className="form-control" name="DLN" type='number'   onBlur={setFieldTouched}
                                                               placeholder="کد ده رقمی شماره گواهینامه" />
                                                        {errors.DLN && touched.DLN ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.DLN}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-6 ">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>
                                                            <span>نوع وسیله نقلیه</span>
                                                        </Label>
                                                        <FormikReactSelect
                                                            name="Kind"
                                                            id="Kind"
                                                            value={values.Kind}
                                                            options={options}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.Kind && touched.Kind ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.Kind}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="w-100 d-flex ">
                                                <div className="col-sm-6 ">
                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <span>کارت ماشین</span>
                                                        </Label>
                                                        <Field className="form-control" name="VCN" type='text'   onBlur={setFieldTouched}
                                                               placeholder="شماره کارت وسیله نقلیه را وارد کنید !" />
                                                        {errors.VCN && touched.VCN ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.VCN}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-6 ">
                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <span>پلاک</span>
                                                         </Label>
                                                        <Field className="form-control" name="Plaque" type='text'  onBlur={setFieldTouched}
                                                               placeholder="پلاک وسیله نقلیه را وارد کنید !" />
                                                        {errors.Plaque && touched.Plaque ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.Plaque}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                            </div>

                                            <div className="w-100 d-flex ">
                                                <div className="col-sm-6 ">
                                                    <FormGroup className="form-group  position-relative ">
                                                        <div className='d-flex justify-content-start'>
                                                            <Label>
                                                                <span>عکس کارت ماشین</span>

                                                                {/*<IntlMessages id="عکس کارت ماشین" />*/}
                                                            </Label>
                                                        </div>

                                                    <ImgComponent Type='VCImg' GetData={this.GetImag.bind(this)} img={this.state.initialValue['VCImg']}/>
                                                        {
                                                            axError["VCImg"].length>1?<span className=" invalid-feedback d-block">{axError["VCImg"]} </span>:""
                                                        }
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-6">
                                                    <FormGroup className="form-group  position-relative ">
                                                        <div className='d-flex justify-content-start'>
                                                            <Label>
                                                                <span>عکس گواهینامه</span>
                                                                {/*<IntlMessages id="عکس گواهینامه" />*/}
                                                            </Label>
                                                        </div>
                                                    <ImgComponent  Type='DLImg' GetData={this.GetImag.bind(this)} img={this.state.initialValue['DLImg']}/>
                                                        {
                                                            axError["DLImg"].length>1?<span className=" invalid-feedback d-block">{axError["DLImg"]} </span>:""
                                                        }
                                                     </FormGroup>
                                                </div>

                                            </div>

                                            <WizardBottonNavigations {...this.props}/>

                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>

            </div>
        );
    }
}

export default Step4;
