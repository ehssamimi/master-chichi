import React, {Component} from 'react';
import {Card, CardBody, CardTitle, FormGroup, Label, Row} from "reactstrap";
import Select from "react-select";
import IntlMessages from "../../../../helpers/IntlMessages";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import * as Const from "../../../../constants/ServerConst";
import {GetCategoriesAll, GetCategoriesNameID, GetDestination} from './../../../../Component/functions/ServerConnection'
import {GetProductNameID} from "../../../functions/ServerConnection";
 import ReactAutoSuggest from "../../../../components/common/ReactAutoSuggest";
import cakes from "../../../../data/cakes";
import AutoSuggestEdit from "../AutoSuggestEdit/AutoSuggestEdit";
import AutoSuggestProductCatNAmeId from "../SliderAddHomePage/AutoSuggestProductCatNameId/AutoSuggestProductCatNAmeId";



// const selectData = [
//     { label: "Cake", value: "cake", key: 0 },
//     { label: "Cupcake", value: "cupcake", key: 1 },
//     { label: "Dessert", value: "dessert", key: 2 }
// ];
class Destination extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedOption: "",selectData:[],   value: "",dataNAme:[],itemID:''
        };
    }
    async componentDidMount(){
        let Destination = await GetDestination();
        // this.changeProductFeild('ل');
        this.changeCategoryFeild(  );

        let selectData = [];
        for (let i = 0; i < Destination.ValidDestination.length; i++) {
            // console.log(Destination.ValidDestination[i]);
            let row = {label: Destination.ValidDestination[i], value: Destination.ValidDestination[i] };
            selectData.push(row);
        }
        this.setState({
            selectData
        })


    }


    async changeCategoryFeild(){
        let product=await GetCategoriesNameID();

        console.log(product);
        // console.log("aaaaaaaaaaaaaaa");
        // let selectData=[];
        // for (let i = 0; i < product.length; i++) {
        //     let row={value: product[i]['name'],label: product[i]['name'],destination:product[i]['_id'],image:product[i]['image']};
        //     selectData.push(row);
        // }
        const dataNAme = product.map(item => {
            return { name: item['name'] ,destination:item['_id']}
        });
        this.setState({
             dataNAme
        })
    }

    async changeProductFeild(name){
        let product=await GetProductNameID(name);

        // console.log(product);
        //  let selectData=[];
        //
        // for (let i = 0; i < product.length; i++) {
        //     let row={value: product[i]['Name'],label: product[i]['Name'],destination:product[i]['_id'] };
        //     selectData.push(row);
        // }

        const dataNAme = product.map(item => {
            return { name: item['Name'] ,destination:item['_id']}
        });
        // console.log('dataNAme');
        // console.log(dataNAme);


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

// Example use:
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
            // console.log(row['destination']);
            // console.log(JSON.parse(row));
            // console.log(Object.values(filtered)[0]['destination'] );
        }





        // console.log('cat');
        // console.log(selectedOption['value']);
        // console.log('data name');
        // console.log(dataNAme);
        // console.log(value)


    }


    handleChange = selectedOption => {
        this.setState({ selectedOption },()=>{
            // this.props.GetDestinationString(selectedOption.value)
        });
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
                        {/*<IntlMessages id="Destination" />*/}
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
                        selectedOption['value']!==undefined?  <FormGroup className="form-group has-float-label position-relative ">
                            <Label>
                                <IntlMessages id="نام نمونه مورد نظر" />
                            </Label>
                            {
                                <AutoSuggestEdit
                                    placeholder={"نام نمونه مورد نظر را وارد کنید "}
                                    data={dataNAme}
                                    className="react-select"
                                    onChange={value => this.handelChange(this, value ||'n')}

                                />
                            }
                        </FormGroup>:''
                    }


                </div>


            </div>




        );
    }
}

export default Destination;