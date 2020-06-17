import React, {Component} from 'react';
import {GetItemList,GetItemDetail} from "../../../../functions/ServerConnection";
import SliderItems from "./SliderItems/SliderItems";

class PreviewItems extends Component {
    constructor(props) {
        super(props);
this.state={
    items:null,Title:''
}
    }
    static getDerivedStateFromProps(props, state) {
        if (props.Title !== state.Title) {
            return {
                Title: props.Title,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    async componentDidMount(){
        // let Name='arsenal';

        let Destination = await GetItemDetail(this.props.Title);
        console.log(Destination);
        this.setState({
            items:Destination
        })

    }

    render() {
        let{items}=this.state;
        return (
            <div>{
                items?<SliderItems items={items} {...this.props}/>:''
            }
                {/*<SliderItems/>*/}
            </div>
        );
    }
}

export default PreviewItems;