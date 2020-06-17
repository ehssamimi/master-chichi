import React, {Component} from 'react';
import {  detailThumbs } from "../../../../../data/carouselItems";
import SliderPageEdit from "./SliderPageEdit/SliderPageEdit";


class SliderOnePage extends Component {
    render() {
        return (

                <div   className="w-100">

                            <SliderPageEdit className='brb2 img-self-fill '  divClass={'NewSlider'} {...this.props} settingsImages={
                                {
                                    bound: true,
                                    rewind: false,
                                    focusAt: 0,
                                    startAt: 0,
                                    gap: 15,
                                    perView: 3,
                                    data: this.props.DetailImages,
                                }
                            } settingsThumbs={
                                {
                                    bound: true,
                                    rewind: false,
                                    focusAt: 0,
                                    startAt: 0,
                                    gap: 10,
                                    perView: 5,
                                    data: detailThumbs,
                                    breakpoints: {
                                        576: {
                                            perView: 4
                                        },
                                        420: {
                                            perView: 3
                                        }
                                    }
                                }
                            } />

                </div>
        );
    }
}

export default SliderOnePage;