import React, {Component} from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import WizardBottonNavigations from "../Sub/WizardBottonNavigations";
 import {  UpdateChichiManBankInfo} from "../../../functions/ServerConnection";
 import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";
import CardComponentChichi from "../../../Common/CardComponent/CardComponentChichi";
import {FormInput} from "../../../Common/ComponentFunctional/FormFeilds";
const SignupSchema = Yup.object().shape({
    //
    // Kind: Yup.object()
    //     .shape({
    //         label: Yup.string().required(),
    //         value: Yup.string().required()
    //     })
    //     .nullable()
    //     .required("نوع وسیله نقلیه اجباری است!"),

    Card: Yup.number()
        .required("شماره کارت اجباری است!"),
    Hesab: Yup.number()
        .required("شماره حساب اجباری است!"),
    Shobe: Yup.string()
        .required("شعبه اجباری است!"),
    Shaba: Yup.string()
        .required("شماره شبا اجباری است!"),
    Bank: Yup.string()
        .required("نام بانک اجباری است!"),
    Name: Yup.string()
        .required("نام و نام خانوادگی صاخب حساب اجباری است!"),

});

class Step6 extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:true,
            showLoader:false,
            initialValue:{Card:'', Hesab:'', Shobe: "", Shaba:'', Bank:'', Name:''},
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




    handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            ...values,
         };
        console.log(payload);

        this.setState({
            showLoader:true
        });



         let Data={
            "PhoneNumber": this.props.PhoneNumber,
            "Name": payload.Name,
            "CardNumber": payload.Card,
            "AccountNumber": payload.Hesab,
            "BankName": payload.Bank,
            "IBAN": payload.Shaba,
            "BankBranch": payload.Shobe
        };
        console.log(Data);

        let Register = await UpdateChichiManBankInfo(JSON.stringify(Data));
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
            error_Notification(state, Description)

        }

    };


    render() {
        return (

            <IsLoaderComponent isLoader={this.state.showLoader}>
                <CardComponentChichi header="اطلاعات مالی">
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
                                    <FormInput  label='نام صاحب حساب' type='text' name='Name' placeHolder="نام و نام خانوادگی صاحب حساب را وارد کنید !" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                    <FormInput  label='شماره کارت' type='number' name='Card' placeHolder="شماره کارت را وارد کنید !" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                    <FormInput  label='شماره حساب' type='number' name='Hesab' placeHolder="شماره حساب را وارد کنید !" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                </div>
                                <div className="w-100 d-flex mt-2 ">
                                    <div className="w-100 d-flex ">
                                        <FormInput  label='نام بانک' type='text' name='Bank' placeHolder="نام بانک را وارد کنید !" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                        <FormInput  label='شعبه' type='text' name='Shobe' placeHolder="نام شعبه را وارد کنید !" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                        <FormInput  label='شماره شبا' type='text' name='Shaba' placeHolder="شماره شبا را وارد کنید !" DivClass="col-sm-12 col-md-4" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                    </div>
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

export default Step6;
