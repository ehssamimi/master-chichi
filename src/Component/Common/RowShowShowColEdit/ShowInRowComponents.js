import React from "react";

export function RowShowShowEditWithoutLabel(props) {
        let{value,col,className}=props;
    return (
        <div className={['d-flex','collapseSpanHeight','align-items-end','mt-2' , col,className||''].join(' ')} dir='rtl'>
            <span className=' collapseValue'>{value}</span>
        </div>
    );
}

export function RowShowShowColEdit(props) {
    let{label,value,col,className}=props;
    return (
        <div className={['d-flex','collapseSpanHeight','align-items-end','mt-2' , col,className||''].join(' ')} dir='rtl'>
            <span className='collapseValue gray FS-c-1'>{label} <span className='pr-2'>:</span></span>
            <span className=' collapseValue FS-c-1'>{value}</span>
        </div>
    );
}
export function ShowShowline(props) {
    let{label,value,col,className}=props;
    return (
        <div className={['d-flex','collapseSpanHeight','align-items-end','mt-2' , col,className||''].join(' ')} dir='rtl'>
            <span className='collapseValue gray FS-c-1'>{label} <span className='pr-2'>:</span></span>
            <span className=' collapseValue FS-c-1'>{value}</span>
        </div>
    );
}