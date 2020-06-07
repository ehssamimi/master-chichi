import React, {Component} from 'react';
import PreviewProductDetail from "./sub/PreviewProductDetail/PreviewProductDetail";

class ContentProductInfo extends Component {
    render() {
        return (
            <div>
                <PreviewProductDetail {...this.props}/>
            </div>
        );
    }
}

export default ContentProductInfo;