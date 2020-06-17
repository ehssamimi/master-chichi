
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
import imageCompression from 'browser-image-compression';


const cropper = React.createRef(null);

class JustCropImg extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                src: '',clickButton:false,
                cropResult: null,
                type:'',name:'',
                 error:{'name':"",'DestinationString':''}
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


        if (files[0]!==undefined){
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

    }

    async cropImage()
    {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        var validate=true; ; var error={'name':"",'DestinationString':''};
        if (this.state.src==='') {
            validate=false;
            error['name']='لطفا عکس رو انتخاب کنید ';
            // alertTxt+='src is not found ';
        }
        // if(this.props.DestinationString===''){
        //     validate=false;
        //     error['DestinationString']='لطفا نوع را مشخص کنید  ';
        //
        //     // alertTxt+='DestinationString is not found ';
        // }

        this.setState({
            error
        });

        // ********set the preview ccrop img*********
        if (validate) {
            // console.log('cropResult');
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

                // ***this is file to set server*********
                // console.log(file);
                // this.props.GetImgFile(file,this.state.cropResult,this.props.label);

                // this.props.GetImgFile(file,this.state.id,this.props.label ,this.state.cropResult);

                if (this.state.clickButton===true){
                    // this.props.GetImgFile(file, this.state.id, this.props.label, this.state.cropResult);
                    this.props.GetImgFile(compressedFile, this.state.id, this.props.label, this.state.cropResult);
                }
                // console.log(this.state.id);
                // extractImageFileExtensionFromBase64(this.cropper.getCroppedCanvas())
            });
        }else {
            console.log(error)
        }

        // this.setState({
        //     cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        // },()=>{
        //
        //     // console.log(this.cropper.getCroppedCanvas());
        //     let file= base64StringtoFile(this.state.cropResult,this.state.name,this.state.type);
        //     // ***this is file to set server*********
        //     // console.log(file);
        //     // this.props.GetImgFile(file,this.state.cropResult,this.props.label);
        //     this.props.GetImgFile(file,this.state.id,this.props.label ,this.state.cropResult);
        //     // console.log(this.state.id);
        //     // extractImageFileExtensionFromBase64(this.cropper.getCroppedCanvas())
        // });



        // ********set the preview ccrop img*********

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

                    <FormGroup className="form-group  position-relative   w-100">
                        <div className='d-flex justify-content-start'>
                            <Label>
                                <span> {label} </span>

                                {/*<IntlMessages id={label} />*/}
                            </Label>
                        </div>
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

                    </FormGroup>
                    {
                        this.state.error['name']!==''?<span className='fs-08vw color-theme-1 mr-3 d-flex justify-content-end mb-5 text-center'  >{this.state.error['name']}</span>:''
                    }
                </div>

                {/*<input type="file" id="uploadImage" name="uploadImage" onChange={this.onChangeImage} />*/}

                <Cropper
                    style={{ height: 400, width: '100%' }}
                    aspectRatio={aspect}
                    preview=".img-preview"
                    guides={false}
                    src={this.state.src}
                    ref={cropper => { this.cropper = cropper; }}
                />
                {
                    this.state.clickButton?"":   <button onClick={this.cropImage}   className='btn btn-secondary mt-2 '>
                        انتخاب عکس
                    </button>
                }

                {/*<button onClick={this.handelCrop.bind(this)} className={this.state.clickButton?"btn btn-primary":"btn btn-warning"}>{this.state.clickButton?'send':'crop'}</button>*/}

                {/*<img src={this.state.cropResult} alt="img"/>*/}
                {/*<img src='' id='uploadPreview' alt='aa'/>*/}
            </div>

        );
    }
}

export default JustCropImg;