import React, {Component} from 'react';
import {Input, InputGroup} from "reactstrap";

class HeaderCategoriyInput extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:''
        };
        this.handelChangeName = this.handelChangeName.bind(this);

    }

    handelChangeName(e){
        // console.log(e.target.value);
        let val=e.target.value;
        this.setState({
            // id:val.trim()
            id:val.trim()
        },()=>{
            console.log(this.state.id);
            console.log(this.state.id.trim());
            this.props.GetCategoriesName(this.state.id)
        })

    }
    render() {
        let{header}=this.props;
        return (
            <div className='mt-2 mb-2 d-flex justify-content-end  '>

                <span className='mr-auto fS08vw gray d-flex align-items-center mt-2'><span className='simple-icon-arrow-left' > </span>مشاهده همه </span>

                {/*<span className='fontSize '>{header}<span className='spanlineHeader' > |</span> </span>*/}

                <span dir='rtl'>
                    <input type='text' name="id" id="id" onChange={this.handelChangeName} className='border-0 fS1vw backgroundDefault' placeholder={header} />
                </span>
                {/*<Input*/}
                    {/*type="text"*/}
                    {/*id="id"*/}
                    {/*name="id"*/}
                    {/*onChange={this.handelChangeName}*/}
                    {/*label={this.state.id ||{header}}*/}
                {/*/>*/}
                <span className='spanlineHeader' > |</span>
            </div>
        );
    }
}

export default HeaderCategoriyInput;