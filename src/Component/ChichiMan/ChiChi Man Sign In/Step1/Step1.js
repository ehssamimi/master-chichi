import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { WithWizard } from 'react-albus';
// import axios from "axios";
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
import WizardBottonNavigations from "../Sub/WizardBottonNavigations";
import {RegisterChichiMan} from "../../../functions/ServerConnection";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import Loader from "../../../Common/Loader/Loader";
import PersianDataPicker from "../../../Common/PersianClassCalender/PersianDataPicker";




 const SignupSchema = Yup.object().shape({

    TagKind: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("نوع وسیله نقلیه اجباری است!"),

    PhoneNumber: Yup.number()
        .required("شماره تلفن اجباری است!").min(1000000000,'شماره تلفن باید یازده کاراکتر باشد').max(100000000000,'شماره تلفن نباید بیشتر از 11 کاراکتر باشد')

});

const options = [
    { value: "موتور", label: "موتور" },
    { value: "ماشین", label: "ماشین" },
    { value: "دوچرخه", label: "دوچرخه" },
];




class Step1 extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:true,ChanceTypeOption:[],showLoader:false
        }
    }



    handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            ...values,
            TagKind: values.TagKind.value,
            // ChanceType: values.ChanceType.value,
            // Name: values.Name.value,

        };
        console.log(payload.PhoneNumber);
        this.props.GetPhoneNumber("0"+payload.PhoneNumber.toString());

        // let send=document.getElementById("sendItems");
        //     send.click();

        console.log("0"+payload.PhoneNumber.toString());
        let Data={
            // "PhoneNumber": payload.PhoneNumber.toString(),
            "PhoneNumber":"0"+payload.PhoneNumber.toString(),
        };
        console.log(Data);
        this.setState({
            showLoader:true
        });
        let Register = await RegisterChichiMan(JSON.stringify(Data));
        console.log(Register);
        this.setState({
            showLoader: false
        });
        let {state, Description} = Register;
        if (state) {
            NotificationManager.success(
                "congratulation",
                "کد مورد نظر به شماره شما ارسال شد",
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


    };





    render() {
        return (
            this.state.showLoader?
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='col-6'>
                        <Loader/>
                    </div>
                </div>
               : <div dir='rtl'>
                <Row className="mb-4">
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <div className='d-flex justify-content-start'>
                                        <span>ثبت شماره موبایل</span>
                                     </div>

                                </CardTitle>

                                <Formik
                                    initialValues={{
                                        PhoneNumber: "",
                                        TagKind: {value: "موتور",label: "موتور"},
                                    }}
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
                                            {/*<div className="w-100 d-flex ">*/}
                                                {/*<div className="col-sm-6 ">*/}
                                                    {/*<FormGroup className="form-group has-float-label">*/}
                                                        {/*<Label>*/}
                                                            {/*<span>نوع وسیله نقلیه</span>*/}
                                                         {/*</Label>*/}
                                                        {/*<FormikReactSelect*/}
                                                            {/*name="TagKind"*/}
                                                            {/*id="TagKind"*/}
                                                            {/*value={values.TagKind}*/}
                                                            {/*options={options}*/}
                                                            {/*onChange={setFieldValue}*/}
                                                            {/*onBlur={setFieldTouched}*/}
                                                        {/*/>*/}
                                                        {/*{errors.TagKind && touched.TagKind ? (*/}
                                                            {/*<div className="invalid-feedback d-block">*/}
                                                                {/*{errors.TagKind}*/}
                                                            {/*</div>*/}
                                                        {/*) : null}*/}
                                                    {/*</FormGroup>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-sm-6 ">*/}

                                                    {/*<FormGroup className="form-group has-float-label position-relative">*/}
                                                        {/*<Label>*/}
                                                            {/*<span>شماره موبایل</span>*/}
                                                         {/*</Label>*/}
                                                        {/*<Field className="form-control" name="PhoneNumber" type='number'  onBlur={setFieldTouched}*/}
                                                               {/*placeholder="09**-***-****" />*/}
                                                        {/*{errors.PhoneNumber && touched.PhoneNumber ? (*/}
                                                            {/*<div className="invalid-feedback d-block">*/}
                                                                {/*{errors.PhoneNumber}*/}
                                                            {/*</div>*/}
                                                        {/*) : null}*/}
                                                    {/*</FormGroup>*/}

                                                {/*</div>*/}

                                            {/*</div>*/}
                                            <PersianDataPicker/>


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

export default Step1;