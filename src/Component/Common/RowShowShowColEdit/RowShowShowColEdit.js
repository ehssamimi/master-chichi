import React, {Component} from 'react';

class RowShowShowColEdit extends Component {
    render() {
        let{label,value,col,className}=this.props;
        return (
            <div className={['d-flex','collapseSpanHeight','align-items-end','mt-2' , col,className||''].join(' ')} dir='rtl'>
                <span className='collapseValue gray'>{label} <span className='pr-2'>:</span></span>
                <span className=' collapseValue'>{value}</span>
            </div>
        );
    }
}

export default RowShowShowColEdit;