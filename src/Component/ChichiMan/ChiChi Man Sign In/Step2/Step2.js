import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
     CardTitle
} from "reactstrap";
 import {Colxx} from "../../../../components/common/CustomBootstrap";

import WizardBottonNavigations from "../Sub/WizardBottonNavigations";
import {VerifyChichiManPhoneNumber,GetVerificationCode} from "../../../functions/ServerConnection";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import Loader from "../../../Common/Loader/Loader";
 // import * as Const from "../../../Const";
const SignupSchema = Yup.object().shape({

    CodeNumber: Yup.number()
        .required("کد هراز هویت اجباری است!").min(1000,'باید 4 رقم باشد').max(9999, 'باید 4 رقمی  باشد '),

});
class Step2 extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:true,ChanceTypeOption:[],showLoader:false
        }
    }
    // componentDidMount(){
    //     let headers = {
    //         'Id': `${Const.ID}`,
    //         'Token': `${Const.Token}`
    //     };
    //
    //     axios.get(`${Const.URL}admin/gameitem/chancetype/get` , {headers:headers}).then(responsive=>
    //     {
    //         const {Description}=responsive.data;
    //
    //         let DES=JSON.parse(Description);
    //
    //         let keys=Object.keys(DES);let i;let ChanceTypeOption=[];
    //
    //         for(i in keys){
    //             let row={ value:keys[i], label: keys[i] };
    //             ChanceTypeOption.push(row);
    //         }
    //         this.setState({
    //             ChanceTypeOption
    //         });
    //         console.log(ChanceTypeOption)
    //
    //     }).catch(error=>{console.log(error)});
    //
    //     TweenMax.staggerFrom( '.rowInput', 1, {autoAlpha:0, y: 100} ,0.1);﻿﻿﻿
    // }
    async componentDidMount(){
        // let getCode=await GetVerificationCode(this.props.PhoneNumber);
        const {Description: {Code}} = await GetVerificationCode(this.props.PhoneNumber);
        console.log(Code)

    }


    handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            ...values,
            // TagKind: values.TagKind.value,
            // ChanceType: values.ChanceType.value,
            // Name: values.Name.value,

        };
        console.log(payload);
        console.log(this.props.PhoneNumber);


        // let send=document.getElementById("sendItems");
        // send.click()




        this.setState({
            showLoader:true
        });
        let Register = await VerifyChichiManPhoneNumber(this.props.PhoneNumber,payload.CodeNumber);
        console.log(Register);
        this.setState({
            showLoader: false
        });
        let {state, Description} = Register;
        if (state) {
            NotificationManager.success(
                "congratulation",
                "کد شما تایید شد",
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
                :
            <div dir='rtl'>
                <Row className="mb-4">
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <div className='d-flex justify-content-start'>
                                        <span>اهراز هویت</span>
                                    </div>
                                </CardTitle>

                                <Formik
                                    initialValues={{
                                        CodeNumber: "",
                                        // TagKind: {value: "موتور",label: "موتور"},
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
                                            <div className="w-100 d-flex  justify-content-center">
                                                <div className="col-12  " >
                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <span>کد اهراز هویت</span>
                                                         </Label>
                                                        <Field className="form-control" name="CodeNumber" type='number'  onBlur={setFieldTouched}
                                                               placeholder="کد خود رو وارد کنید !" />
                                                        {errors.CodeNumber && touched.CodeNumber ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.CodeNumber}
                                                            </div>
                                                        ) : null}
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

export default Step2;