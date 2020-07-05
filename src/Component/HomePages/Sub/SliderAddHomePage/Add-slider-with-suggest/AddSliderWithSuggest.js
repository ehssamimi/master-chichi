import React, {Component} from 'react';
import Destination from "../../Destination/Destination";
import JustCropImg from "../../CropImg/JustCropImg";

class AddSliderWithSuggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DestinationString:'',file:'',Destination:'' , label:'' ,Base64:'',error:''
        };
    }


    GetDestinationString(DestinationString , Destination){
        this.setState({
            DestinationString,Destination
        })
    }
    GetImgFile(file,Destination , label ,Base64){
        this.setState({
            file , label ,Base64
        })
    }

    HandelSend() {
        let {file, Destination, label, Base64, DestinationString} = this.state;
        if (DestinationString===''|| Destination==='') {
           this.setState({
               error:"باید مقصد انتخاب شود "
           })
        }else {
            this.props.GetData(file, Destination, label, Base64, DestinationString);
            this.setState({
                error:""
            })
        }

    }


    render() {
        return (
            <div className='col-12'>
                {/****specific destination of image type and product********/}
                 <Destination GetDestinationString={this.GetDestinationString.bind(this)}/>
                {this.state.error ? (
                    <div className="invalid-feedback d-block">
                        {this.state.error }
                    </div>
                ) : null}
                {/**********get image for destination********/}
                <JustCropImg  label={this.props.header} aspect={3/2} GetImgFile={this.GetImgFile.bind(this)}/>

                {
                    this.state.file!==''?  <button className='btn  btn-primary mt-2' onClick={this.HandelSend.bind(this)}>ثبت </button>:''
                }

             </div>
        );
    }
}

export default AddSliderWithSuggest;