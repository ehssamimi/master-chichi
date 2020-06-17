import React from "react";
import PropTypes from 'prop-types';
import Glide from '@glidejs/glide'
import { getDirection } from "../../../../../../helpers/Utils";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import {CardTitle, FormGroup, Input, InputGroup, Label} from "reactstrap";
import IntlMessages from "../../../../../../helpers/IntlMessages";

let resizeTimeOut = -1;
let mountTimeOut = -1;

export default class SliderPageEdit extends React.Component {
    static propTypes = {
        settingsImages: PropTypes.shape({
            type: PropTypes.string,
            startAt: PropTypes.number,
            perView: PropTypes.number,
            focusAt: PropTypes.number,
            gap: PropTypes.number,
            autoplay: PropTypes.bool,
            hoverpause: PropTypes.bool,
            keyboard: PropTypes.bool,
            bound: PropTypes.bool,
            swipeThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
            dragThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
            perTouch: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
            touchRatio: PropTypes.number,
            touchAngle: PropTypes.number,
            animationDuration: PropTypes.number,
            rewind: PropTypes.bool,
            rewindDuration: PropTypes.number,
            animationTimingFunc: PropTypes.string,
            direction: PropTypes.string,
            peek: PropTypes.object,
            breakpoints: PropTypes.object,
            classes: PropTypes.object,
            throttle: PropTypes.number,
            data: PropTypes.array,
        }),
        settingsThumbs: PropTypes.shape({
            type: PropTypes.string,
            startAt: PropTypes.number,
            perView: PropTypes.number,
            focusAt: PropTypes.number,
            gap: PropTypes.number,
            autoplay: PropTypes.bool,
            hoverpause: PropTypes.bool,
            keyboard: PropTypes.bool,
            bound: PropTypes.bool,
            swipeThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
            dragThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
            perTouch: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
            touchRatio: PropTypes.number,
            touchAngle: PropTypes.number,
            animationDuration: PropTypes.number,
            rewind: PropTypes.bool,
            rewindDuration: PropTypes.number,
            animationTimingFunc: PropTypes.string,
            direction: PropTypes.string,
            peek: PropTypes.object,
            breakpoints: PropTypes.object,
            classes: PropTypes.object,
            throttle: PropTypes.number,
            data: PropTypes.array,
        }),
        id: PropTypes.string,
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.onResize = this.onResize.bind(this);
        this.thumbsResize = this.thumbsResize.bind(this);
        this.onThumbClick = this.onThumbClick.bind(this);
        this.imagesSwipeEnd = this.imagesSwipeEnd.bind(this);
        this.renderDots = this.renderDots.bind(this);
        this.updateThumbBreakpoints = this.updateThumbBreakpoints.bind(this);
        this.state = {
            total: this.props.settingsImages.data.length,
            activeIndex: 0,
            thumbsPerView: Math.min(this.props.settingsThumbs.perView, this.props.settingsImages.data.length),
            renderArrows: true,
            name:'نام رو اانتخاب کنید '
        };
        this.updateThumbBreakpoints();
    }

    updateThumbBreakpoints() {
        let thumbBreakpoints = this.props.settingsThumbs.breakpoints;
        let newBreakpoints = {};
        for (var prop in thumbBreakpoints) {
            newBreakpoints[prop] = { "perView": Math.min(thumbBreakpoints[prop]["perView"], this.state.total) }
        }
        this.props.settingsThumbs.breakpoints = newBreakpoints;
    }

    onThumbClick(index) {
        this.setState({activeIndex: index});
        this.glideCarouselImages.go("=" + index);
    }

    thumbsResize () {
        let perView = Math.min(this.props.settingsThumbs.perView, this.props.settingsImages.data.length);
        this.setState({thumbsPerView: perView});
        if (this.state.total <= perView ) {
            this.setState({renderArrows: false});
        }
    }

    imagesSwipeEnd () {
        let gap = this.glideCarouselThumbs.index + this.state.thumbsPerView;
        this.setState({activeIndex: this.glideCarouselImages.index});
        if (this.state.activeIndex >= gap) {
            this.glideCarouselThumbs.go(">");
        }
        if (this.state.activeIndex < this.glideCarouselThumbs.index) {
            this.glideCarouselThumbs.go("<");
        }
    }

    componentDidMount() {
        this.glideCarouselImages = new Glide(this.carouselImages, { ...this.props.settingsImages, direction: getDirection().direction });
        this.glideCarouselImages.mount();

        this.glideCarouselThumbs = new Glide(this.carouselThumbs, { ...this.props.settingsThumbs, direction: getDirection().direction });
        this.glideCarouselThumbs.mount();

        this.glideCarouselThumbs.on("resize", this.thumbsResize);
        this.glideCarouselImages.on("swipe.end", this.imagesSwipeEnd);

        mountTimeOut = setTimeout(() => {
            var event = document.createEvent("HTMLEvents");
            event.initEvent("resize", false, false);
            window.dispatchEvent(event);
            this.glideCarouselImages.on("resize", this.onResize);
        }, 500);
    }

    componentWillUnmount() {
        clearTimeout(resizeTimeOut);
        clearTimeout(mountTimeOut);
        this.glideCarouselImages.destroy();
        this.glideCarouselThumbs.destroy();
    }

    onResize() {
        clearTimeout(resizeTimeOut);
        resizeTimeOut = setTimeout(() => {
            this.glideCarouselImages.update();
            this.glideCarouselThumbs.update();
            resizeTimeOut = -1;
        }, 500);
    }
    ClickImg(id){
        // console.log(id);
        this.props.GetSliderType(id)
    }

    renderDots() {
        let dots = [];
        for (let i = 0; i < this.state.total; i++) {
            dots.push(
                <button className="glide__bullet slider-dot" key={i} data-glide-dir={"=" + i}></button>
            );
        }
        return dots;
    }
    handelChangeName(e){
        // console.log(e.target.value);
        this.setState({
            name:e.target.value
        },()=>{
            this.props.GetCategoriesName(this.state.name)
        })

    }
    render() {
        let{className,divClass,header,Edit}=this.props;
        // console.log(header);
        console.log(Edit);

        return (
            <div>
                <div className='fs-13vw'>
                    {
                        this.props.Edit ?
                            <span dir='rtl' className='ml-2 d-flex align-items-end '>
                                     نام : {header}
                                     </span>
                            :
                            <span dir='rtl' className='d-flex  align-items-center'>
                                         <span className='ml-2'>نام:</span>
                                         <input type='text' name="id" id="id"
                                                onChange={this.handelChangeName.bind(this)}
                                                className='border-0 fS1vw backgroundDefault' placeholder={header}/>
                         </span>
                    }

                </div>


               {/*<span dir='rtl' className='d-flex justify-content-start'>*/}
                    {/*<input type='text' name="id" id="id" onChange={this.handelChangeName.bind(this)} className='border-0 fS1vw backgroundDefault' placeholder={ header} />*/}
                {/*</span>*/}
                <div className="glide details" ref={node => this.carouselImages = node}>
                    <div data-glide-el="track" className="glide__track">
                        <div className="glide__slides">
                            {
                                this.props.settingsImages.data.map((item, index) => {
                                    return (
                                        <div id={item.id} key={item.id} onClick={this.ClickImg.bind(this , item.id)} className={divClass||''} >
                                            <div className={index === this.state.activeIndex+1 ? "  glide__slide " : ['   glide__slide ',].join(' ')}
                                                 // className={['glide__slide',divClass||''].join(' ')}
                                            >
                                                <img alt="detail " src={item.img}
                                                     className={['responsive','border-0','border-radius' ,'mb-3',className||''].join(' ')}/>
                                                {/*className="responsive border-0 border-radius img-fluid mb-3 brb2"*/}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="glide thumbs d-none" ref={node => this.carouselThumbs = node}>
                    <div data-glide-el="track" className="glide__track">
                        <div className="glide__slides">
                            {
                                this.props.settingsThumbs.data.map((item, index) => {
                                    return (
                                        <div className={index === this.state.activeIndex ? "glide__slide active" : "glide__slide"} key={item.id} onClick={() => {this.onThumbClick(index)}}>
                                            <img alt="detail" src={item.img}
                                                 className="responsive border-0 border-radius img-fluid" />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    {this.state.renderArrows &&  (
                        <div className="glide__arrows" data-glide-el="controls">
                            <button className="glide__arrow glide__arrow--left" data-glide-dir="<"><i
                                className="simple-icon-arrow-left"></i></button>
                            <button className="glide__arrow glide__arrow--right" data-glide-dir=">"><i
                                className="simple-icon-arrow-right"></i></button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}