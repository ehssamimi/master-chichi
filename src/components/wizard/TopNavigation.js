import React, { Component, Fragment } from "react";
import { WithWizard } from 'react-albus';
import { NavLink } from "react-router-dom";

export class TopNavigation extends Component {
    constructor(props) {
        super(props);
        this.getClassName = this.getClassName.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.state={
            item:"",count:1,
        }

    }

    getClassName(steps, step, index, stepItem) {
        if (steps.indexOf(step) === index) {
            return "step-doing";
        } else if (steps.indexOf(step) > index || stepItem.isDone) {
            stepItem.isDone = true;
            return "step-done";
        }
    }

    // ************* go to each level*********
// ********************** update item ***********
    static  getDerivedStateFromProps(props, state) {
        if (props.item !== state.item) {
            return {item: props.item }
        }
        // Return null if the state hasn't changed
        return null;
    }





    itemClick(stepItem, push) {
        if(this.props.disableNav) {
            return;
        }
        this.props.topNavClick(stepItem, push)
    }

    render() {
        console.log(  'item');
        console.log(this.state.item);

        // **************checking if  need update info go to specific steps***********
        if (this.state.item!=="" && this.state.count===1) {
            console.log("click function");
            this.setState({
                count:2
            });
            let item = document.getElementById('items');
            item.click();
        }
        return (
                 <WithWizard render={({ next, previous, step, steps, go, push }) => (
                    <ul className={"nav nav-tabs wizz " + this.props.className + (this.props.disableNav ? " disabled" : "")}>
                        {/***************go to steps that u need to update info************/}
                        <NavLink to="#"  id='items' className="nav-link d-none" onClick={()=> this.itemClick(this.state.item, push)}>
                            {this.state.item['name']}
                        </NavLink>
                        {/*******************show all steps header***/}
                        {
                            steps.map((stepItem, index) => {
                                if (!stepItem.hideTopNav) {
                                    return (
                                        <li key={index}  className={"nav-item " + this.getClassName(steps, step, index, stepItem)}>
                                            <NavLink to="#"  className="nav-link" onClick={()=> this.itemClick(stepItem, push)}>
                                                <span>{stepItem.name}</span>
                                                <small>{stepItem.desc}</small>
                                            </NavLink>
                                        </li>
                                    )
                                } else {
                                    return <Fragment key={index} />
                                }
                            })
                        }
                    </ul>
                )} />


        )
    }
}