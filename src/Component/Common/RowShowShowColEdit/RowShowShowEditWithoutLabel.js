import React, {Component} from 'react';

class RowShowShowEditWithoutLabel extends Component {
    render() {
        let{value,col,className}=this.props;
        return (

            <div className={['d-flex','collapseSpanHeight','align-items-end','mt-2' , col,className||''].join(' ')} dir='rtl'>
                <span className=' collapseValue'>{value}</span>
            </div>
        );
    }
}

export default RowShowShowEditWithoutLabel;