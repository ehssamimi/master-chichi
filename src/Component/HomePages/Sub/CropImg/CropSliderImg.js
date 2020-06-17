import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default
// import ax from './../../img/2.jpg'
import {base64StringtoFile,extractImageFileExtensionFromBase64} from './../../../../Component/functions/Functions'
import {CustomInput, FormGroup, InputGroup, Label ,Input} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import ImgComponent from "../../../ChichiMan/ChiChi Man Sign In/Sub/ImgComponent";
import AutoSuggestEdit from "../AutoSuggestEdit/AutoSuggestEdit";
import cakes from "../../../../data/cakes";
import { Formik, Form, Field } from "formik";
import imageCompression from "browser-image-compression";


const cropper = React.createRef(null);

class CropSliderImg extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                src: '',
                cropResult: null,
                type:'',name:'',
                id:'',
                clickButton:false,
                alertTxt:'',
                error:{'name':"",'id':"",'DestinationString':''}
            };
        this.onChangeImage = this.onChangeImage.bind(this);
        this.cropImage = this.cropImage.bind(this);
        this.handelChangeName = this.handelChangeName.bind(this);
    }

    onChangeImage(e)
    {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({
                src: reader.result ,
                type:files[0].type,
                name:files[0].name,
            });
        };
        reader.readAsDataURL(files[0]);
    }

    async cropImage()
    {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }


        // ********set the preview crop img*********


        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        },()=>{

            // console.log(this.cropper.getCroppedCanvas());
            let file= base64StringtoFile(this.state.cropResult,this.state.name,this.state.type);
            // ***this is file to set server*********
            // console.log(file);
            // this.props.GetImgFile(file,this.state.cropResult,this.props.label);
            this.props.GetImgFile(file,this.state.id,this.props.label ,this.state.cropResult);
            // console.log(this.state.id);
            // extractImageFileExtensionFromBase64(this.cropper.getCroppedCanvas())
        });


    }
    handelChange(e, value){
        this.setState({value:value});

        //
        // if (value.length>0) {
        //     let headers = {
        //         'Id': `${Const.ID}`,
        //         'Token': `${Const.Token}`
        //     };
        //     axios.get(`${Const.URL}admin/gameitem/search/${value}`,{headers:headers}).then(responsive=>
        //     {
        //         const {Description} = responsive.data;
        //         // console.log(`https://resource.themaddays.com/admin/gameitem/search/${value}`);
        //
        //         let index;let Device=[];
        //         let Data=JSON.parse(Description);
        //
        //         for (index in Data){
        //             Device.push({title:Data[index].Name ,id:Data[index]._id,Tag:Data[index].Tag,ChanceType:Data[index].ChanceType,Key:Data[index].Key})
        //         }
        //
        //         let dict = {};
        //         for (index in Data){
        //             let id =Data[index].Key;
        //             let Value =Data[index]._id;
        //             dict[id] = Value;
        //             // dict[Value] = id;
        //         }
        //
        //         let DATA=[];
        //         Device.map(item => {
        //             // DATA.push({name: item.title})
        //             DATA.push({name: item.Key})
        //         });
        //         this.setState({
        //             Device,
        //             DATA,dict,originalData:Data
        //         })
        //
        //     }).catch(error=>{console.log(error)});
        // }

    }
    handelChangeName(e){
        // console.log(e.target.value);
        this.setState({
            id:e.target.value
        })
    }

    async handelCrop(){


        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        var validate=true;var alertTxt=''; var error={'name':"",'id':"",'DestinationString':''};
        if (this.state.src==='') {
            validate=false;
            error['name']='لطفا عکس رو انتخاب کنید ';
            // alertTxt+='src is not found ';
        }
          if(this.props.DestinationString===''){
            validate=false;
              error['DestinationString']='لطفا نوع را مشخص کنید  ';

              // alertTxt+='DestinationString is not found ';
        }
         if(this.state.id===''){
            validate=false;
             error['id']='لطفانام اسلایدر انتخاب کنبد';

             // alertTxt+='destination is not found ';
        }
        this.setState({
            error
        });

        // ********set the preview ccrop img*********
        if (validate) {
            let cropResult= this.cropper.getCroppedCanvas().toDataURL();
            // console.log(cropResult);
            // console.log('name');
            // console.log(this.state.name);
            // console.log('type');
            // console.log(this.state.type);
            let file= base64StringtoFile( cropResult,this.state.name,this.state.type);
            console.log('file');
            console.log(file);
            let options = {
                maxSizeMB: 0.1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };
            const compressedFile =  await imageCompression(file, options);
            console.log("new file");
            console.log( compressedFile );


            this.setState(pre=>({
                cropResult: this.cropper.getCroppedCanvas().toDataURL(),
                clickButton:!pre.clickButton
            }),()=>{

                // console.log(this.cropper.getCroppedCanvas());
                let file= base64StringtoFile(this.state.cropResult,this.state.name,this.state.type);
                // console.log(file.size);
                // ***this is file to set server*********
                // console.log(file);
                // this.props.GetImgFile(file,this.state.cropResult,this.props.label);

                // this.props.GetImgFile(file,this.state.id,this.props.label ,this.state.cropResult);

                if (this.state.clickButton===true){
                    this.props.GetData(compressedFile, this.state.id, this.props.label, this.state.cropResult, this.props.DestinationString);
                }
                // console.log(this.state.id);
                // extractImageFileExtensionFromBase64(this.cropper.getCroppedCanvas())
            });
        }else {
            console.log(error)
        }



        // this.setState(pre=>({
        //     clickButton:!pre.clickButton
        // }))

    }


    render(){
        let{label,aspect}=this.props;
        const rightData = cakes.map(item => {
            return {name: item.title}
        });
        return(
            <div>
                {/***********Suggest********/}
                {/*<div className='col-12'>*/}
                {/*<FormGroup className="form-group  position-relative has-float-label w-100 ">*/}
                {/*<Label>*/}
                {/*<IntlMessages id={'نوع محصول'} />*/}
                {/*</Label>*/}

                {/*/!*<AutoSuggestEdit*!/*/}
                {/*/!*placeholder={"type item name"}*!/*/}
                {/*/!*data={rightData}*!/*/}
                {/*/!*onChange={value => this.handelChange(this, value)*!/*/}
                {/*/!*}*!/*/}
                {/*/>*/}

                {/*</FormGroup>*/}
                {/*</div>*/}
                <div className="col-sm-12">
                    {
                        this.state.error['DestinationString']!==''?<span className='fs-08vw color-theme-1  d-flex justify-content-end mb-5'  >{this.state.error['DestinationString']}</span>:''
                    }

                    <FormGroup className="form-group  position-relative has-float-label w-100">
                        <div className='d-flex justify-content-end'>
                            <Label className='z-6'>
                                {/*<IntlMessages id={"مقصد "} />*/}
                                <span >مقصد </span>
                            </Label>
                        </div>
                        <InputGroup className="mb-3">
                            <Input
                                type="text"
                                id="id"
                                name="id"
                                onChange={this.handelChangeName}
                                label={this.state.id ||'انتخاب عکس'}
                            />
                        </InputGroup>


                    </FormGroup>
                    {
                        this.state.error['id']!==''?<span className='fs-08vw color-theme-1 d-flex justify-content-end mb-5'  >{this.state.error['id']}</span>:''
                    }
                </div>


                <div className="col-sm-12">

                    <FormGroup className="form-group  position-relative d-flex">

                        <InputGroup className="mb-3">
                            <CustomInput
                                type="file"
                                id="uploadImage"
                                name="uploadImage"
                                onChange={this.onChangeImage}
                                label={this.state.name ||'انتخاب عکس'}
                            />
                            {/*<InputGroupAddon addonType="append">Upload</InputGroupAddon>*/}
                        </InputGroup>
                        <div className='d-flex justify-content-end   align-items-center'>
                            <Label className='d-flex justify-content-end   align-items-center'>
                                <span>:{label}</span>
                            </Label>
                        </div>
                    </FormGroup>
                </div>

                {/*<input type="file" id="uploadImage" name="uploadImage" onChange={this.onChangeImage} />*/}
                {
                    this.state.error['name']!==''?<span className='fs-08vw color-theme-1 mr-3 d-flex justify-content-end mb-5'  >{this.state.error['name']}</span>:''
                }
                <Cropper
                    style={{ height: 400, width: '100%' }}
                    aspectRatio={aspect}
                    preview=".img-preview"
                    guides={false}
                    src={this.state.src}
                    ref={cropper => { this.cropper = cropper; }}
                />

                {/*<button onClick={this.cropImage} style={{ float: 'right' }} className='btn btn-primary'>*/}
                    {/*crop img*/}
                {/*</button>*/}
                <button onClick={this.handelCrop.bind(this)} className={this.state.clickButton?"btn btn-primary":"btn btn-warning"}>{this.state.clickButton?'send':'crop'}</button>

                {/*<img src={this.state.cropResult} alt="img"/>*/}
                {/*<img src='' id='uploadPreview' alt='aa'/>*/}
            </div>

        );
    }
}

export default CropSliderImg;