 import React from "react";
import { Button, Tooltip } from "reactstrap";
import {FaRegEdit} from "react-icons/fa";

class TooltipeCompoent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false
        };
    }
    toggle = () => {
        this.setState(prevState => ({
            tooltipOpen: !prevState.tooltipOpen
        }));
    };

    render() {
        return (
            <span>


                <div
                    className={this.props.className}
                    onClick={ this.props.HandelClick()}
                    id={"Tooltip-" +this.props.id}
                >
                    {
                        this.props.children
                    }
                </div>

        <Tooltip
            placement={this.props.position||"top"}
            isOpen={this.state.tooltipOpen}
            target={"Tooltip-" +this.props.id}
            toggle={this.toggle}
        >
            {this.props.text}
        </Tooltip>
      </span>
        );
    }
}
export default TooltipeCompoent;
