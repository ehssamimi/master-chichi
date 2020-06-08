import React, {Component} from 'react';
import Loader from "../../Common/Loader/Loader";
import {Card, CardBody, CardTitle, FormGroup, Label, Row} from "reactstrap";
import {Colxx} from "../../../components/common/CustomBootstrap";
import { Form, Formik} from "formik";
import {FormInput,FormSelect} from './../../Common/ComponentFunctional/FormFeilds'
import {error_Notification, success_Notification,categoryDetails,} from "../../functions/componentHelpFunction";
import {FormikReactSelect} from "../../../containers/form-validations/FormikFields";
import * as Yup from "yup";
import {sendImg, ProductDetail, getAllCategories, AddProduct, UpdateProduct} from "../../functions/ServerConnection";
import ax from './../../../assets/img/4th.jpg'
import {ModalCropImage} from "../../Common/ComponentFunctional/ModalsCollection";




// *****validation Feilds****
const SignupSchema = Yup.object().shape({
    Count: Yup.number().positive('تعداد محصول باید عدد مثبت  باشد').integer('تعداد محصول باید عدد صحیح باشد')
        .required("تعداد محصول اجباری است!"),
    Price: Yup.number()
        .positive("قیمت باید عدد مثبت باشد")
        .required("قیمت اجباری است!"),
    Name: Yup.string()
        .required("نام اجباری است!"),
    Manufacture: Yup.string()
        .required("نام تولید کننده اجباری است!"),
    Description: Yup.string()
        .required("توضیحات محصول اجباری است!"),
});


const ISOffOption = [
    { value: false , label: "تخفیف ندارد" },
    { value: true , label: "تخفیف دارد" },
];
const initialValues={
    Name:'',
    Manufacture:'',
    Count: "",
    Price:'',
    percent:'',
    Category:{ },
    sub_category:{label:"",value:"" },
    isOff:{value: false ,label: "تخفیف ندارد"},
    Description:"" ,
    Attribute:""
}


class ContentProductAdd extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            isOpen: false,
            CategoryOption: [],
            catValue: '',
            Subs: {},
            SubsOption: [],
            ax1File: "",
            ax1: ax,
            axError: '',
            catError:{'cat':"",'sub':""},
            showLoader: false,
            initialData:initialValues
            ,id:'',updateImage:''
        }
    }

    async componentDidMount() {
        let categories = await getAllCategories();
//      **********Map Category to separate Category and sub category then add to Option drop down
        if (categories.Description!=='Network Error'){
            var catSeprate =    categoryDetails(categories);
             var CategoryOption = catSeprate.cat;
             var Subs = catSeprate.subCat;

        }else {
            error_Notification('Network Error');
        }

        // ***********get params Id********
        const {match: {params}} = this.props;
        console.log(params);
        var initialData="";

          // ***********if update***********
        if (params.Id===':Id'){
            // ************************** set initial  *********************
            initialData=initialValues

        }else {
            // **************************initial value for update*********************
            let Description = await ProductDetail(params.Id);
            let productDetail = Description['Description'];
            initialData = {
                Name: productDetail['Name'],
                UniqueName: productDetail['UniqueValue'],
                Manufacture: productDetail['Manufacture'],
                Count: productDetail['Count'],
                Price: productDetail['PrevPrice'],
                percent: productDetail['Off']['Percentage'],
                Category: {value: productDetail['Category'], label: productDetail['Category']},
                sub_category: {value: productDetail['SubCategory'], label: productDetail['SubCategory']},
                isOff: productDetail['Off']['Enable'] === false ? {value: false, label: "تخفیف ندارد"} : {
                    value: true,
                    label: "تخفیف دارد"
                },
                Images: productDetail['Images'][0],
                Description: productDetail['Description'],
                Attribute: productDetail['Attribute']
             };
            console.log('update-initial');
            var catValue={value: productDetail['Category'], label: productDetail['Category']};
            var updateImage=productDetail['Images'][0].split('/')

         }
        this.setState({
            CategoryOption,Subs,initialData,catValue,ax1:params.Id===':Id'?ax: initialData['Images'],id:params.Id===':Id'?"":params.Id,updateImage:params.Id===':Id'?"":updateImage[6]
        })

        // **************************sample*********************
        // _id: "5d907a3a007049cfe08e3f88"
        // UniqueValue: "برنج ارزون↵"
        // Name: "برنج ارزون↵"
        // Count: 19
        // SalesCount: null
        // ViewCount: 0
        // Create_at: "2019-09-29 14:02:38.988889"
        // Updated_at: "2019-09-29 14:02:38.988906"
        // Attribute: "۱۰ گرم"
        // Manufacture: "ارزون↵"
        // PrevPrice: 1000
        // CurrentPrice: 2572
        // Description: "description1"
        // Category: "گروه ۲"
        // Images: ["http://chichiapp.ir:3005/download/5d9884457c1e36d6e452598e"]
        // Off: {Enable: true, Percentage: 0.1}

    }
// **********Handel open modal for get image*********
    toggleLarge = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    // **********get image from modal and close it*********
    GetImgFile(file,Destination , label ,base64){
                this.setState({
                    ax1File:file ,ax1:base64
                });

        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }



// **************Change sub-category from change category ************
    onChange = (event,value) => {
        let {Subs}=this.state;
        let Options=Subs[value.value];
        this.setState({
            catValue:value ,SubsOption:Options
        });
    };

    handleSubmit = async (values, { setSubmitting }) => {
        console.log("start sending");
        const payload = {
            ...values,
            isOff: values.isOff.value,
            Category: values.Category.value,
            sub_category: values.sub_category.value,
        };

// **************check its update or just add **********

        // **************update product **********
        if (this.state.id.length>2){
            console.log("update ")
            this.setState({
                showLoader: true
            });
            // var idax;
             let {  ax1File ,catValue,updateImage} = this.state;
            let off=payload.percent.toString().length>1?payload.percent>1?payload.percent/100:payload.percent:0.0;
            // console.log('ax1File');
            // console.log(ax1File);

            var productImg= updateImage;
            console.log('img');
            console.log(productImg);
            if (ax1File !== ''){
                console.log("waiting to upload .....");
                productImg=await sendImg(ax1File, 'Public')

            }
            console.log('productImg');
            console.log(productImg);



            let Data={
                    "Id": this.state.id,
                    "UniqueValue": this.state.initialData['UniqueName'],
                    "Name":payload.Name,
                    "Attribute": payload.Attribute,
                    "Manufacture": payload.Manufacture,
                    "Count": payload.Count.toString(),
                    "Price": payload.Price,
                    "Description":payload.Description,
                    "Category":catValue.value,
                    "SubCategory": payload.sub_category,
                    "Images": [
                        // ax1File === ''?this.state.updateImage:await sendImg(ax1File, 'Public')
                        productImg
                    ],
                    "Off":off || 0.0,
                    "IsOffEnable": payload.isOff,
                };

            console.log("data");
            console.log(Data);
            // console.log('updateImage');
            // console.log(Data["Images"]);
            // console.log("update item");
                let Register = await UpdateProduct(JSON.stringify(Data));

            this.setState({
                showLoader: false
            });
                let {state, Description} = Register;
                if (state ) {
                // if (true ) {
                    success_Notification( "اطلاعات شما با موفقیت ثبت شد")

                } else {
                    error_Notification(Description)

                }
        // **************add product **********
        } else {
             let {  ax1File, axError,catValue,catError} = this.state;
             // ****check validation form for category sub-category image**********
            let axValid = true;
            if (ax1File === '') {
                axValid = false;
                axError = "عکس محصول اجباری است "
            }else {
                axError = ""
            }

            if (catValue === undefined) {
                axValid = false;
                catError.cat = "دسته بندی اجباری است"
            }else {
                catError.cat = ""
            }
            if (payload.sub_category === '') {
                axValid = false;
                catError.sub = "زیر دسته اجباری است"
            }else {
                catError.sub = ""
            }
            this.setState({
                axError,catError
            });
            // **********send validate data*********
            if (axValid) {
                 this.setState({
                    showLoader:true
                });
                 // *****upload Img**
                console.log(ax1File)
                console.log("befor upload image ")
                 let idax = await sendImg(ax1File, 'Public');
                // *****upload Data**
                 console.log(idax);
                console.log("after upload image ")
                let off=payload.percent.toString().length>1?payload.percent>1?payload.percent/100:payload.percent:0.0;
                console.log("off");
                console.log(off);


                let Data={
                    "UniqueValue": payload.Name,
                    "Name":payload.Name,
                    "Attribute": payload.Attribute,
                    "Manufacture": payload.Manufacture,
                    "Count": payload.Count.toString(),
                    "Price": payload.Price,
                    "Description":payload.Description,
                    "Category":catValue.value,
                    "Images": [
                        // "5ede0e129f6972c502c0be92"
                        idax.toString()
                    ],
                    "Off": off || 0.0,
                    "IsOffEnable": payload.isOff,
                    "SubCategory": payload.sub_category
                };

                let Register = await AddProduct(JSON.stringify(Data));

                this.setState({
                    showLoader: false
                });

                let {state, Description} = Register;
                if (state ) {
                    success_Notification( "اطلاعات شما با موفقیت ثبت شد")

                } else {
                    error_Notification(Description)

                }
            }
        }


    };
    render() {

        let{axError,ax1,CategoryOption,SubsOption,catError,initialData,isOpen}=this.state;

         return (
            this.state.showLoader || Object.entries(CategoryOption).length===0?   // *******checking for submit form or get category Option is then loader start then loader close**********
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
                                            <span>اطلاعات محصول</span>
                                         </div>
                                    </CardTitle>
                                    <Formik
                                        initialValues={
                                            initialData
                                        }
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
                                            <Form className="av-tooltip tooltip-label-bottom w-100 row m-0" >
                                                <div className="col-sm-12 col-md-3 ">
                                                    {/*********show image and open modal ***********/}
                                                    <FormGroup className="form-group  position-relative">
                                                        <div className='d-flex justify-content-start col-12'>
                                                            <Label  className='d-flex  ml-2 mr-2'>
                                                                <span className='ml-auto  '>عکس محصول</span>
                                                            </Label>
                                                        </div>
                                                        <div className='d-flex col-12 flex-column paddingZero  '>
                                                            <div className="col-12">
                                                                <div className=' w-100  mt-1 mb-1 pointer h-15-vw'
                                                                     onClick={this.toggleLarge.bind(this, '1')}>
                                                                    <img src={ax1} className='img-self-fill br02'/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                         {axError.length>1 && touched.Category ? (
                                                            <div className="invalid-feedback d-block">
                                                                {axError}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </div>

                                                <div className="col-sm-12 col-md-9 d-flex flex-column justify-content-between">

                                                    <div className="w-100 row m-0 ">

                                                            <FormInput  label='نام' type='text' name='Name' placeHolder='نام محصول را وارد کنید !' DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                                            <FormInput  label='تولید' type='text' name='Manufacture' placeHolder='کارخانه تولیدی را مشخص کنید !' DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                                            <FormInput   label='قیمت' type='number' name='Price' placeHolder='قیمت  محصول را وارد کنید !' DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                                            <FormInput label='تعداد' type='number' name='Count'  placeHolder='تعداد محصول  را مشخص کنید !' DivClass="col-sm-12 col-md-6" setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>


                                                        <div className="col-sm-12 col-md-6  ">

                                                            <FormGroup className="form-group has-float-label">

                                                                <Label>
                                                                    <span>دسته بندی</span>
                                                                </Label>
                                                                <FormikReactSelect
                                                                    name="Category"
                                                                    id="Category"
                                                                    value={this.state.catValue}
                                                                    options={CategoryOption}
                                                                    onChange={this.onChange.bind( values.Category) }
                                                                    onBlur={setFieldTouched}
                                                                />
                                                                {catError['cat'].length>1 && touched.Category ? (
                                                                    <div className="invalid-feedback d-block">
                                                                        {catError['cat']}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </div>

                                                        <div className="col-sm-12 col-md-6 ">

                                                               <FormGroup className="form-group has-float-label">
                                                                    <Label>
                                                                        <span>زیر دسته بندی</span>
                                                                    </Label>
                                                                    <FormikReactSelect
                                                                        name="sub_category"
                                                                        id="sub_category"
                                                                        className={ SubsOption.length!==0?'':'pointer-none'}
                                                                        value={values.sub_category}
                                                                        options={SubsOption}
                                                                        onChange={setFieldValue}
                                                                        onBlur={setFieldTouched}
                                                                    />
                                                                    {catError['sub'].length>1 && touched.sub_category ? (
                                                                        <div className="invalid-feedback d-block">
                                                                            {catError['sub']}
                                                                        </div>
                                                                    ) : null}
                                                                </FormGroup>


                                                        </div>


                                                            <FormInput  label='مشخصات' type='text' name='Attribute' placeHolder='مشخصات محصول را وارد کنید' DivClass="col-sm-12  " setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                                            <FormInput label='توضیحات' component='textarea' rows="3"  type='text' name='Description' placeHolder='توضیحات را وارد کنید' DivClass="col-sm-12 "  setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>

                                                            <FormSelect label={'تخفیف'} name={'isOff'}  option={ISOffOption} DivClass="col-sm-12 col-md-6" values={values} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} errors={errors} touched={touched} />

                                                        {
                                                            // **********check is off is set then set the number*******
                                                            values.isOff.value === true ?
                                                                    <FormInput label='چند درصد' type='number' name='percent' placeHolder='درصد را مشخص کنید !' DivClass="col-sm-12 col-md-6 " setFieldTouched={setFieldTouched} errors={errors} touched={touched}/>
                                                                :""
                                                        }
                                                    </div>
                                                    <button className="btn btn-success text-center" type="submit">
                                                        فرستادن
                                                    </button>
                                                </div>

                                             </Form>
                                        )}
                                    </Formik>
                                </CardBody>
                            </Card>
                        </Colxx>
                    </Row>

                    {/********Modal for get image**********/}
                    <ModalCropImage isOpen={isOpen} toggle={this.toggleLarge} label={'انتخاب عکس'} aspect={1/1} GetImgFile={this.GetImgFile.bind(this)}  />
                </div>
        );
    }
}

export default ContentProductAdd;