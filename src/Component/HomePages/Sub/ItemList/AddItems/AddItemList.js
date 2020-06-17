import React, {Component} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {GetDestination, GetQueryKeys} from "../../../../functions/ServerConnection";

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
import IntlMessages from "../../../../../helpers/IntlMessages";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import {
    FormikReactSelect,
} from "../../../../../containers/form-validations/FormikFields";
// import * as Const from "../../../Const";
const SignupSchema = Yup.object().shape({

    QueryKey: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("نوع query اجباری است!"),

    Title: Yup.string()
        .required("عنوان اجباری است!")

});

const options = [
    { value: "Top", label: "Top" },
    { value: "Best", label: "Best" },
    { value: "Most", label: "Most" },
];




class AddItemList extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            loaderActive:true,ChanceTypeOption:[],selectData:[]
        }
    }
    async componentDidMount(){

        let Destination = await GetQueryKeys();
        let selectData = [];
        for (let i = 0; i < Destination.length; i++) {
             let row = {label: Destination[i], value: Destination[i], key: i};
            selectData.push(row);
        }
        this.setState({
            selectData
        })
    }



    handleSubmit = (values, { setSubmitting }) => {
        const payload = {
            ...values,
            QueryKey: values.QueryKey.value,
        };
        // console.log(payload);
        this.props.GetItemsValue(payload)

    };





    render() {
        return (
            <div dir='rtl'>
                <Row className="mb-4">
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <div className='d-flex justify-content-start'>
                                        <IntlMessages id="اضافه کردن ایتم لیست" />
                                    </div>

                                </CardTitle>

                                <Formik
                                    initialValues={{
                                        Title: "",
                                        QueryKey: { value: " ", label: " " },
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
                                        <Form className="av-tooltip tooltip-label-bottom col-12">
                                            <div className="w-100 d-flex ">
                                                <div className="col-sm-6 ">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>
                                                            <IntlMessages id="کلید کوئری" />
                                                        </Label>
                                                        <FormikReactSelect
                                                            name="QueryKey"
                                                            id="QueryKey"
                                                            value={values.QueryKey}
                                                            options={this.state.selectData}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.QueryKey && touched.QueryKey ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.QueryKey}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-6 ">

                                                    <FormGroup className="form-group has-float-label position-relative">
                                                        <Label>
                                                            <IntlMessages id="عنوان" />
                                                        </Label>
                                                        <Field className="form-control" name="Title"   onBlur={setFieldTouched}
                                                               placeholder="عنوان را بنویسید" />
                                                        {errors.Title && touched.Title ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.Title}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>

                                                </div>

                                            </div>
                                            <button type='submit' className='btn btn-primary ml-3'>ارسال</button>
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

export default AddItemList;