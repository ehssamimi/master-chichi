import React, {Component} from 'react';
import { Collapse  } from 'reactstrap';
 import {NavLink} from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import {RowShowShowColEdit} from "../../../../Common/RowShowShowColEdit/ShowInRowComponents";
import CollapseHeaderComponent from "../../../../Common/CollapseRow/CollapseHeaderComponent/CollapseHeaderComponent";
class ChichimanInfoCollapseWithoutImg extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
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
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        let{store,sub,Keys}=this.state;
        // console.log(Keys);
        return (
            <div className='  col-12'>


                <div className="w-100 d-flex">
                    <CollapseHeaderComponent onClick={()=> this.setState(prevState => ({collapse:!prevState.collapse}))} collapse={this.state.collapse} header={store.header} divClass={this.props.color||"purpleColor"}/>
                    <NavLink to={`/chichi-man/sign-in/${this.props.id}/${this.props.step}`} className="ml-auto">
                        <div  className='   h3-style'>
                            <FaUserEdit/>
                        </div>
                    </NavLink>

                </div>





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

export default ChichimanInfoCollapseWithoutImg;