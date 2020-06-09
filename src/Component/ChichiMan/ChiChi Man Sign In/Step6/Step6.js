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
 import {sendImg, UpdateChichiManBankInfo} from "../../../functions/ServerConnection";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import Loader from "../../../Common/Loader/Loader";
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



const options = [
    { value: "موتور", label: "موتور" },
    { value: "ماشین", label: "ماشین" },
    { value: "دوچرخه", label: "دوچرخه" },
    // { value: "Gun", label: "Gun" }
];


class Step6 extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:true,
            showLoader:false,
            initialValue:{
                Card:'',
                Hesab:'',
                Shobe: "",
                Shaba:'',
                Bank:'',
                Name:'',
                },
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


    GetImag(Type,value){
        console.log('Type');
        console.log(Type);
        console.log('value');
        console.log(value);

    }

    handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            ...values,
            // ChanceType: values.ChanceType.value,
            // Name: values.Name.value,

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



        // let send=document.getElementById("sendItems");
        // send.click()
        // console.log(values);
        // let headers = {
        //     'Id': `${Const.ID}`,
        //     'Token': `${Const.Token}`
        // };
        // let form = new FormData();
        // form.append('Tag', payload.TagKind);
        // form.append('ChanceType', payload.ChanceType);
        // form.append('ItemType', payload.ItemType);
        // form.append('ImageUrl', payload.ImageUrl);
        // form.append('Key', payload.KeyItem);
        // form.append('Name', payload.Name);
        // axios.post(`${Const.URL}admin/gameitem/add` ,form, {headers:headers}).then(responsive=>
        // {
        //     const {Description}=responsive.data;
        //     if (Description === "D"){
        //         NotificationManager.success(
        //             "Success message",
        //             "Title here",
        //             3000,
        //             null,
        //             null,
        //             "success"
        //         );
        //     }
        //     setTimeout(function () {
        //         window.location.reload()
        //     }, 3000);
        //     setTimeout(function(){ window.location.reload(); }, 3000);
        //     console.log(Description)
        // }).catch(error=>{console.log(error)});
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
                                        <span>اطلاعات مالی</span>
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
                                                <div className="col-sm-4 ">
                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <span>نام صاحب حساب</span>
                                                         </Label>
                                                        <Field className="form-control" name="Name"  onBlur={setFieldTouched}
                                                               placeholder="نام و نام خانوادگی صاحب حساب را وارد کنید !" />
                                                        {errors.Name && touched.Name ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.Name}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-4 ">
                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <span>شماره کارت</span>
                                                         </Label>
                                                        <Field className="form-control" name="Card" type='number' onBlur={setFieldTouched}
                                                               placeholder="شماره کارت را وارد کنید !" />
                                                        {errors.Card && touched.Card ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.Card}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-4 ">
                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <span>شماره حساب</span>
                                                         </Label>
                                                        <Field className="form-control" name="Hesab" type='number' onBlur={setFieldTouched}
                                                               placeholder="شماره حساب را وارد کنید !" />
                                                        {errors.Hesab && touched.Hesab ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.Hesab}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="w-100 d-flex mt-2 ">
                                                <div className="w-100 d-flex ">
                                                    <div className="col-sm-4 ">
                                                        <FormGroup className="form-group has-float-label position-relative">
                                                            <Label>
                                                                <span>نام بانک</span>
                                                             </Label>
                                                            <Field className="form-control" name="Bank"  onBlur={setFieldTouched}
                                                                   placeholder="نام بانک را وارد کنید !" />
                                                            {errors.Bank && touched.Bank ? (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.Bank}
                                                                </div>
                                                            ) : null}
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-sm-4 ">
                                                        <FormGroup className="form-group has-float-label position-relative">
                                                            <Label>
                                                                <span>شعبه</span>
                                                             </Label>
                                                            <Field className="form-control" name="Shobe"  onBlur={setFieldTouched}
                                                                   placeholder="شعبه را وارد کنید !" />
                                                            {errors.Shobe && touched.Shobe ? (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.Shobe}
                                                                </div>
                                                            ) : null}
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-sm-4 ">
                                                        <FormGroup className="form-group has-float-label position-relative">
                                                            <Label>
                                                                <span>شماره شبا</span>
                                                             </Label>
                                                            <Field className="form-control" name="Shaba"  onBlur={setFieldTouched}
                                                                   placeholder="شماره حساب را وارد کنید !" />
                                                            {errors.Shaba && touched.Shaba ? (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.Shaba}
                                                                </div>
                                                            ) : null}
                                                        </FormGroup>
                                                    </div>
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

export default Step6;
