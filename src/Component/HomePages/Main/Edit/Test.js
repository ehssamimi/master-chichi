import React, {Component} from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state={
            a:10,
            b:''
        }
    }
    componentDidMount(){
        this.setState({
            b:this.state.a
        })
    }
    change(){
        this.setState({
            a:20
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.change.bind(this)}>change a</button>
                <p className="alert  alert-primary">{this.state.a}</p>
                <p className="alert  alert-warning">{this.state.b}</p>

            </div>
        );
    }
}

export default Test;