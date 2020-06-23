import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import WizardBottonNavigations from "../Sub/WizardBottonNavigations";
import {RegisterChichiMan} from "../../../functions/ServerConnection";
import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";
import CardComponentChichi from "../../../Common/CardComponent/CardComponentChichi";
import {FormInput, FormSelect} from "../../../Common/ComponentFunctional/FormFeilds";




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
         this.props.GetPhoneNumber("0"+payload.PhoneNumber.toString());
         let Data={
             "PhoneNumber":"0"+payload.PhoneNumber.toString(),
        };
        console.log(Data);
        this.setState({
            showLoader:true
        });
        let {state, Description} =await RegisterChichiMan(JSON.stringify(Data));
         this.setState({
            showLoader: false
        });
         if (state) {
             success_Notification("کد مورد نظر به شماره شما ارسال شد")
             let send=document.getElementById("sendItems");
            send.click();
        } else {
             error_Notification(state, Description)
        }
    };





    render() {
        return (
            <IsLoaderComponent isLoader={this.state.showLoader}>
                <CardComponentChichi header="ثبت شماره تلفن همراه ">
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
                                <div className="w-100 d-flex ">

                                    <FormSelect label={'نوع وسیله نقلیه'} name={'TagKind'}  option={options} DivClass="col-sm-12 col-md-6" values={values} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} errors={errors} touched={touched} />

                                    <FormInput  label='شماره موبایل' type='number' name='PhoneNumber' placeHolder="09**-***-****" DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

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

export default Step1;