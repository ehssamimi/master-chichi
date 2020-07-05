import {FormGroup, Label} from "reactstrap";
import {Field} from "formik";
import React from "react";
import {FormikReactSelect} from "../../../containers/form-validations/FormikFields";
import ImgComponent from "../../ChichiMan/ChiChi Man Sign In/Sub/ImgComponent";
import PersianClassCalender from "../PersianClassCalender/PersianClassCalender";

export  function FormInput(props) {
    let{label,name,placeHolder,setFieldTouched,errors,touched,type,component,row,DivClass}=props;
    return<div className={DivClass}>

    <FormGroup className="form-group has-float-label position-relative">
        <Label>
            <span>{label}</span>
        </Label>
        <Field className="form-control" name={name}   onBlur={setFieldTouched} type={type}
               component={component}
               rows={row}
               placeholder={placeHolder} />
        {errors[`${name}`]  && touched[`${name}`] ? (
            <div className="invalid-feedback d-block">
                {errors[`${name}`]}
            </div>
        ) : null}
    </FormGroup>
    </div>
}
export function FormSelect(props) {

    let{label,name,setFieldValue,setFieldTouched,errors,touched,option,values,DivClass}=props;
   return<div className={DivClass}>
       <FormGroup className="form-group has-float-label">
       <Label>
           <span>{label}</span>
       </Label>
       <FormikReactSelect
           name={name}
           id={name}
           value={values[`${name}`]}
           options={option}
           onChange={setFieldValue}
           onBlur={setFieldTouched}
       />
       {errors[`${name}`]  && touched[`${name}`] ? (
           <div className="invalid-feedback d-block">
               {errors[`${name}`]}
           </div>
       ) : null}
   </FormGroup>
   </div>
}


export function AddImageForm(props) {

    let{label ,errors, DivClass,GetImag,type,img}=props;


    return  <div className={DivClass}>
        <FormGroup className="form-group  position-relative ">
            <div className='d-flex justify-content-start'>
                <Label className='d-flex w-100 ml-2 mr-2'>
                    <span className='mr-auto  '>{label}</span>
                </Label>
            </div>
            <ImgComponent  Type={type} GetData={GetImag} img={img}/>

            {

                errors[`${type}`].length>1?<span className=" invalid-feedback d-block">{ errors[`${type}`]} </span>:""
            }

        </FormGroup>
    </div>
}

export function SetDataPersian(props) {

    let{label,DivClass,GetData,Data}=props;


    return <div className={DivClass}>
        <FormGroup className=" has-float-label position-relative">
            <Label>
                <span>{label}</span>
            </Label>
            <div>
                <PersianClassCalender GetData={GetData} birthDay={Data} label={label}/>
            </div>
        </FormGroup>
    </div>


}


