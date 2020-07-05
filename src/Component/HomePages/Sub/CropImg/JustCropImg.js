import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
 import {base64StringtoFile} from '../../../functions/Functions'
import {CustomInput, FormGroup, InputGroup, Label } from "reactstrap";
 import imageCompression from 'browser-image-compression';


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
        let validate=true, error={'name':"",'DestinationString':''};
        if (this.state.src==='') {
            validate=false;
            error['name']='لطفا عکس رو انتخاب کنید ';
         }

        this.setState({
            error
        });

        // ********set the preview ccrop img*********
        if (validate) {
             let cropResult= this.cropper.getCroppedCanvas().toDataURL();

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

                if (this.state.clickButton===true){
                     this.props.GetImgFile(compressedFile, this.state.id, this.props.label, this.state.cropResult);
                }

            });
        }else {
            console.log(error)
        }


    }


    render(){
        let{label,aspect}=this.props;

        return(
            <div>

                <div className="col-sm-12">

                    {/*****form to select img**********/}

                    <FormGroup className="form-group  position-relative   w-100">
                        <div className='d-flex justify-content-start'>
                            <Label>
                                <span> {label} </span>
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
                         </InputGroup>
                        {this.state.error['name']? (
                            <div className="invalid-feedback d-block">
                                {this.state.error['name']}
                            </div>
                        ) : null}
                    </FormGroup>

                </div>

                {/*****crop the selected image**********/}
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

            </div>

        );
    }
}

export default JustCropImg;