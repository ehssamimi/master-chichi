import React, {Component} from 'react';
import { Collapse  } from 'reactstrap';
 import {RowShowShowColEdit} from "../RowShowShowColEdit/ShowInRowComponents";
import CollapseHeaderComponent from "./CollapseHeaderComponent/CollapseHeaderComponent";

class CollapseRow extends Component {
    constructor(props) {
        super(props);
         this.state = { collapse: true ,store:'',sub:[],Keys:''};
    }

    componentDidMount() {
        let {store} = this.props;
        let {sub} = store;
        let Keys;
        Keys=Object.keys(sub);
        this.setState({
            store, sub,Keys
        });
    }


    render() {
        let{store,sub,Keys}=this.state;
         return (
            <div className='mt-5 col-12'>


                <CollapseHeaderComponent onClick={()=> this.setState(prevState => ({collapse:!prevState.collapse}))} collapse={this.state.collapse} header={store.header} divClass={this.props.color||"purpleColor"}/>


                <Collapse isOpen={this.state.collapse}>
                    <div className='d-flex  w-100 flex-wrap '  >
                        {Keys ?
                            Keys.map((todo, index) =>
                                <RowShowShowColEdit label={todo} value={sub[todo]} key={index} col={ todo==='آدرس'?'col-12':this.props.col||'col-4'} className='fS1vw'/>
                            ) : ''
                        }
                    </div>
                </Collapse>

                <hr/>
            </div>
        );
    }
}

export default CollapseRow;