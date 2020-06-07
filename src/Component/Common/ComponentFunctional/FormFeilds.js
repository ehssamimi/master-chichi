import {FormGroup, Label} from "reactstrap";
import {Field} from "formik";
import React from "react";
import {FormikReactSelect} from "../../../containers/form-validations/FormikFields";

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
