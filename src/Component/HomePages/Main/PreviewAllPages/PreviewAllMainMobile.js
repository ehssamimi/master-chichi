import React, {Component} from 'react';
import {GetAllHomePages} from './../../../../Component/functions/ServerConnection'
import MoveRowIndex from "../Edit/NewEdit";
import Loader from "../../Sub/Loader/Loader";


class PreviewAllMainMobile extends Component {
    constructor(props) {
        super(props);
        this.state={
            Data:[]
        }
    }

    async componentDidMount(){
        // ******get all Homepage ********
       let Data= await GetAllHomePages();
       this.setState({
           Data
       });
    }
    render() {
        let {Data}=this.state;
         return (

                <div className='w-100 d-flex  active-Coluumn '>
                    {
                        Data.length>0?Data.map((item, index) => <MoveRowIndex key={item._id} id={item._id} item={item} Name={item.Name} index={index}/>):<div className='col-6'><Loader/></div>
                     }
                </div>

        );
    }
}

export default PreviewAllMainMobile;