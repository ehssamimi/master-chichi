import React, {Component} from 'react';
import {WithWizard} from "react-albus/lib";
import {Button} from "reactstrap";
import {Form} from "formik";

class WizardBottonNavigations extends Component {
    render() {
        return (
            <WithWizard render={({ next, previous, step, steps }) => (
                <div className={"wizard-buttons  col-12 mt-2 " + this.props.className}>



                    <Button color="primary"
                            className={ "mr-1  " + (steps.indexOf(step) <= 0 ? "disabled" : "")}
                            onClick={() => { this.props.onClickPrev(previous, steps, step) }}>
                        {this.props.prevLabel}
                    </Button>
                    <Button color="primary" type="submit"
                            className={"ml-auto " +(steps.indexOf(step) >= steps.length - 1 ? "disabled" : "")}
                        // onClick={() => { this.props.onClickNext(next, steps, step) }}
                    >
                        {this.props.nextLabel}
                    </Button>


                    <Button id='sendItems'  onClick={() => { this.props.onClickNext(next, steps, step) }} className='d-none'>send</Button>
                </div>
            )} />
        );
    }
}

export default WizardBottonNavigations;