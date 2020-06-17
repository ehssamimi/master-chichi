import React, {Component} from 'react';
// import MoveRowIndex from "./index";
import MoveRowIndex from "./../Active/index";
class AddMainHomePage extends Component {
    componentDidMount(){
        console.log(this.props.match);
       console.log(this.props.match.params.name) ;
    }
    render() {
        return (
            <div>
                <MoveRowIndex Name={this.props.match.params.name} Edit={false} />
            </div>
        );
    }
}

export default AddMainHomePage;