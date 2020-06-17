import React, {Component} from 'react';
import SliderPageEdit from "../ShowPreviewHomePage/SliderOnePage/SliderPageEdit/SliderPageEdit";
import {detailImages, detailThumbs} from "../../../../data/carouselItems";
import HalfPagesEdit from "./HalfPageEdit/HalfPagesEdit";

class SliderTwoPages extends Component {
    render() {
        return (
            <div>
                <HalfPagesEdit/>

            </div>
        );
    }
}

export default SliderTwoPages;