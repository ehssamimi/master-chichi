import React, {Component} from 'react';
import CropSliderImg from "../../CropImg/CropSliderImg";
import Destination from "../../Destination/Destination";
import JustCropImg from "../../CropImg/JustCropImg";

class AddSliderWithSuggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",DestinationString:'',file:'',Destination:'' , label:'' ,Base64:'',error:''
        };
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };


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
    GetDestinationString(DestinationString , Destination){
        // console.log('DestinationString');
        // console.log(DestinationString);
        // console.log('DestinationID');
        // console.log(Destination);
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







    onChange = (event,value) => {
        // let {Subs}=this.state;
        // let Options=Subs[value.value];
        // this.setState({
        //     catValue:value ,SubsOption:Options
        // });
    };

    render() {
        return (
            <div className='col-12'>




                 <Destination GetDestinationString={this.GetDestinationString.bind(this)}/>

                <JustCropImg  label={this.props.header} aspect={3/2} GetImgFile={this.GetImgFile.bind(this)}/>
                {
                    this.state.file!==''?      <button className='btn  btn-primary mt-2' onClick={this.HandelSend.bind(this)}>ثبت </button>:''
                }
                {
                    this.state.error!==''?<div className='alert alert-warning col-6 offset-3 text-center'> {this.state.error}</div>:""
                }



                {/*<CropSliderImg label={this.props.header} aspect={3/2} GetImgFile={this.GetImgFile.bind(this)} DestinationString={this.state.DestinationString} {...this.props}/>*/}
            </div>
        );
    }
}

export default AddSliderWithSuggest;