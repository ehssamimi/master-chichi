import React, {Component} from 'react';
import {Card, CardBody, CardTitle, FormGroup, Label, Row} from "reactstrap";
import Select from "react-select";
import IntlMessages from "../../../../helpers/IntlMessages";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import * as Const from "../../../../constants/ServerConst";
import {GetCategoriesAll, GetCategoriesNameID, GetDestination} from '../../../functions/ServerConnection'
import {GetProductNameID} from "../../../functions/ServerConnection";
 import ReactAutoSuggest from "../../../../components/common/ReactAutoSuggest";
import cakes from "../../../../data/cakes";
import AutoSuggestEdit from "../AutoSuggestEdit/AutoSuggestEdit";
import AutoSuggestProductCatNAmeId from "../SliderAddHomePage/AutoSuggestProductCatNameId/AutoSuggestProductCatNAmeId";
import {LabelValueOption} from "../../../functions/componentHelpFunction";


class Destination extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedOption: "",selectData:[],   value: "",dataNAme:[],itemID:''
        };
    }
    async componentDidMount(){
        // **** get all could be destinations ***
        let Destination = await GetDestination();
        if (Destination.ValidDestination!==undefined){
            let selectData=LabelValueOption(Destination.ValidDestination)
            this.setState({
                selectData
            })
        }
        // ****for default destination firs get categories***

        await this.changeCategoryFeild();

    }


    async changeCategoryFeild(){
        let product=await GetCategoriesNameID();
        if (product.length!==0){
            const dataNAme = product.map(item => {
                return { name: item['name'] ,destination:item['_id']}
            });
            this.setState({
                dataNAme
            })
        }
    }

    async changeProductFeild(name){
        let product=await GetProductNameID(name);

        const dataNAme = product.map(item => {
            return { name: item['Name'] ,destination:item['_id']}
        });
         this.setState({
            dataNAme
        })
    }


    handelChange(e, value){
        console.log('value '+value);
        this.setState({value:value});
        let {selectedOption,dataNAme}=this.state;

        if (value.length>0) {
            if (selectedOption['value']==='Category') {
                this.changeCategoryFeild(  );
            }else if (selectedOption['value']==='Product'){
                this.changeProductFeild(value)
            }
        }


        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter( key => predicate(obj[key]) )
                .reduce( (res, key) => (res[key] = obj[key], res), {} );

         console.log(Object.keys(dataNAme).length);
        if (Object.keys(dataNAme).length > 0) {
            var filtered = Object.filter(dataNAme, score => score['name'] === value);
            let row=Object.values(filtered)[0];
            if (row!==undefined){
                 this.setState({
                    itemID:row['destination']
                },()=>{
                     this.props.GetDestinationString(this.state.selectedOption.value,this.state.itemID)
                })
            }

        }



    }


    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };




    render() {
        let{selectData,dataNAme, selectedOption}=this.state;
         const data = cakes.map(item => {
            return { name: item.title }
        });
         // console.log(dataNAme)

        return (
            <div>

                <Colxx xxs="12"   className="mb-3 form-group  position-relative has-float-label">
                    <label>
                        <span>مقصد</span>
                    </label>
                    <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select w-100"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={selectData}
                    />

                </Colxx>

                <div className="col-12 ">

                    {
                        selectedOption['value']!==undefined?
                            <FormGroup className="form-group has-float-label position-relative ">
                                <Label>
                                    <IntlMessages id="نام نمونه مورد نظر"/>
                                </Label>
                                {
                                    <AutoSuggestEdit
                                        placeholder={"نام نمونه مورد نظر را وارد کنید "}
                                        data={dataNAme}
                                        className="react-select"
                                        onChange={value => this.handelChange(this, value || 'n')}

                                    />
                                }
                            </FormGroup>
                            :''
                    }


                </div>


            </div>




        );
    }
}

export default Destination;