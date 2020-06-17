import React, {Component} from 'react';
import SliderPageEdit from "../SliderOnePage/SliderPageEdit/SliderPageEdit";
import {detailImages, detailThumbs} from "../../../../../data/carouselItems";
import HeaderSectionHomePage from "../HeaderSectionHomePage/HeaderSectionHomePage";

class ShowItemsHomePages extends Component {
    render() {
        return (
            <div   className="w-100">

                <HeaderSectionHomePage header={this.props.header}/>

                <SliderPageEdit className='brb2 img-self-fill '  divClass={'height20vh'} settingsImages={
                    {
                        bound: true,
                        rewind: false,
                        focusAt: 0,
                        startAt: 0,
                        gap: 5,
                        perView: 2,
                        data: detailImages,
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

export default ShowItemsHomePages;