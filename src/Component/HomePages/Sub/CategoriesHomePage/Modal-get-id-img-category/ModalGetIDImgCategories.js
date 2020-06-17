import React, {Component} from 'react';

 import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default
// import ax from './../../img/2.jpg'
 import {CustomInput, FormGroup, InputGroup, Label, Input, Row, Card, CardBody, CardTitle} from "reactstrap";

import cakes from "../../../../../data/cakes";
import { Formik, Form, Field } from "formik";
import imageCompression from 'browser-image-compression';
import * as Yup from "yup";
import {RegisterChichiMan,GetCategoriesNameID} from "../../../../functions/ServerConnection";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";
import Loader from "../../Loader/Loader";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import {FormikReactSelect} from "../../../../../containers/form-validations/FormikFields";


const SignupSchema = Yup.object().shape({

    ImgAttr: Yup.object()
        // .shape({
        //     label: Yup.string().required(),
        //     value: Yup.string().required()
        // })
         .required("نوع وسیله نقلیه اجباری است!"),

    // PhoneNumber: Yup.number()
    //     .required("شماره تلفن اجباری است!").min(1000000000,'شماره تلفن باید یازده کاراکتر باشد').max(100000000000,'شماره تلفن نباید بیشتر از 11 کاراکتر باشد')

});

// const options = [
//     { value: "موتور", label: "موتور" },
//     { value: "ماشین", label: "ماشین" },
//     { value: "دوچرخه", label: "دوچرخه" },
// ];



class ModalGetIdImgCategories extends Component {



    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            options:[],
            all:[],error:''
        }
    }
    async componentDidMount(){
        let product=await GetCategoriesNameID();

        console.log(product);
        console.log("aaaaaaaaaaaaaaa");
        let options=[];let all=[];
        for (let i = 0; i < product.length; i++) {
           let rowAll={destination:product[i]['_id'],value:product[i]['name'],image:product[i]['image']}
           let row={value: product[i]['name'],label: product[i]['name'],destination:product[i]['_id'],image:product[i]['image']};
            options.push(row);
            all.push(rowAll);
        }
        console.log(options);
        this.setState({
            options,all
        })


    }



    handleSubmit = async (values, { setSubmitting }) => {
        console.log("aaaaaaaaaaaa");

        console.log(values)
        var validate=true;
        if (values.ImgAttr.value==='') {
            validate=false;
            this.setState({
                error:"فیلد انتخاب نام اجباری است"
            })
        }else {
            validate=true;
            this.setState({
                error:''
            })
        }


        if (validate) {
             const payload = {
                ...values,
                ImgAttr: values.ImgAttr.value,
                // ChanceType: values.ChanceType.value,
                // Name: values.Name.value,

            };

            console.log(values.ImgAttr);
            let{ImgAttr}=values;
            // file,Destination , label ,base64;
            // let row={value: product[i]['name'],label: product[i]['name'],destination:product[0]['_id'],image:product[0]['image']};
            let res = ImgAttr['image'].split("/");
             this.props.GetImgFile(res[6], ImgAttr['destination'], this.props.label, ImgAttr['image']);
        }

    };





    render() {
        let{options,error}=this.state;
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
                                            <span>{this.props.label}</span>
                                        </div>

                                    </CardTitle>

                                    <Formik
                                        initialValues={{
                                             ImgAttr: {
                                                label: '',
                                                value: ''
                                            },
                                            // ImgAttr:  options.length>1?options[0]:{value:'',label:""}

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
                                                <div className="w-100   ">
                                                    <div className="col-sm-6 offset-3">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <span>انتخاب دسته بندی</span>
                                                            </Label>
                                                            <FormikReactSelect
                                                                name="ImgAttr"
                                                                id="ImgAttr"
                                                                value={values.ImgAttr}
                                                                options={this.state.options}
                                                                onChange={setFieldValue}
                                                                onBlur={setFieldTouched}
                                                            />
                                                            {error.length>1 && touched.ImgAttr ? (
                                                                <div className="invalid-feedback d-block">
                                                                    {error}
                                                                </div>
                                                            ) : null}
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-12'>
                                                        <button className='btn btn-secondary' type='submit'>submit</button>

                                                    </div>


                                                </div>

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

export default ModalGetIdImgCategories;