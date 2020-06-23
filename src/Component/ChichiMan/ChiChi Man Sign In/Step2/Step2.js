import React, {Component} from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
 import WizardBottonNavigations from "../Sub/WizardBottonNavigations";
import {VerifyChichiManPhoneNumber,GetVerificationCode} from "../../../functions/ServerConnection";
 import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";
import CardComponentChichi from "../../../Common/CardComponent/CardComponentChichi";
import {FormInput} from "../../../Common/ComponentFunctional/FormFeilds";
import {error_Notification, success_Notification} from "../../../functions/componentHelpFunction";
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

    async componentDidMount(){
        // let getCode=await GetVerificationCode(this.props.PhoneNumber);
        const {Description: {Code}} = await GetVerificationCode(this.props.PhoneNumber);
        console.log(Code)

    }


    handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            ...values,

        };
        console.log(payload);
        console.log(this.props.PhoneNumber);

        this.setState({
            showLoader:true
        });
        let {state, Description} = await VerifyChichiManPhoneNumber(this.props.PhoneNumber,payload.CodeNumber);
        this.setState({
            showLoader: false
        });
        if (state) {
            success_Notification("کد شما تایید شد");
            let send=document.getElementById("sendItems");
            send.click();
        } else {
            error_Notification(state, Description);
        }

    };





    render() {
        return (
            <IsLoaderComponent isLoader={this.state.showLoader}>
                <CardComponentChichi header="اهراز هویت ">

                    <Formik
                        initialValues={{
                            CodeNumber: "",
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
                                    <FormInput label='کد اهراز هویت' type='number' name='CodeNumber' placeHolder='کد خود رو وارد کنید !'  DivClass="col-sm-12  " setFieldTouched={setFieldTouched}  errors={errors} touched={touched}/>
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

export default Step2;