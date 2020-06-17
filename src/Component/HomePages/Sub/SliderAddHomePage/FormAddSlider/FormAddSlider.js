import React, {Component} from 'react';
import AutoSuggestEdit from "../../AutoSuggestEdit/AutoSuggestEdit";
import cakes from "../../../../../data/cakes";
import {CustomInput, FormGroup, InputGroup, Label} from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";

import { Button } from "reactstrap";
import Select from "react-select";
import { Colxx } from "../../../../../components/common/CustomBootstrap";
// import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../../../../components/common/CustomSelectInput";
import CropImgCropper from "../../CropImg/CropImgCropper";
import Destination from "../../Destination/Destination";
import CropSliderImg from "../../CropImg/CropSliderImg";

const selectData = [
    { label: "Cake", value: "cake", key: 0 },
    { label: "Cupcake", value: "cupcake", key: 1 },
    { label: "Dessert", value: "dessert", key: 2 }
];
const rightData = cakes.map(item => {
    return {name: item.title}
});
class FormAddSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",DestinationString:'',file:'',Destination:'' , label:'' ,Base64:''
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
    GetDestinationString(DestinationString){
        this.setState({
            DestinationString
        })
    }
    GetImgFile(file,Destination , label ,Base64){
        this.setState({
            file,Destination , label ,Base64
        })
    }

    HandelSend() {
        let {file, Destination, label, Base64, DestinationString} = this.state;
        this.props.GetData(file, Destination, label, Base64, DestinationString);
    }

    render() {

        return (
            <div className='col-12'>


                <Destination GetDestinationString={this.GetDestinationString.bind(this)}/>

                {/*<FormGroup className="form-group  position-relative has-float-label w-100 ">*/}
                    {/*<label>*/}
                        {/*<IntlMessages id="select" />*/}
                    {/*</label>*/}
                    {/*<Select*/}
                        {/*components={{ Input: CustomSelectInput }}*/}
                        {/*className="react-select"*/}
                        {/*classNamePrefix="react-select"*/}
                        {/*name="form-field-name"*/}
                        {/*value={this.state.selectedOption}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*options={selectData}*/}
                    {/*/>*/}
                {/*</FormGroup>*/}

                {/*<CropImgCropper label={this.props.header} aspect={3/2} GetImgFile={this.GetImgFile.bind(this)}/>*/}
                <CropSliderImg label={this.props.header} aspect={3/2} GetImgFile={this.GetImgFile.bind(this)} DestinationString={this.state.DestinationString} {...this.props}/>
                {/*<Button onClick={this.HandelSend.bind(this)}>send</Button>*/}

            </div>
        );
    }
}

export default FormAddSlider;