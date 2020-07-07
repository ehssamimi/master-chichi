import React, {Component} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card, CardTitle, FormGroup, Row} from "reactstrap";
import GlideComponent from "../../../../../components/carousel/GlideComponent";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import AddNewHomePageComponent from "../../../Main/Edit/AddNewHomePageComponent/AddNewHomePageComponent";
import HeaderNameHomPage
    from "../../../../Common/ComponentFunctional/HeaderNameHomPage/HeaderNameHomPage/HeaderNameHomPage";

const NoControlCarouselItem = ({ Destination, img }) => {

    return (
        <div className="glide-item col-12 cursor-pointer" >
            <Card>
                <div className="position-relative vh25 height12rem">
                    <img className="card-img-top img-self-fill " src={img} alt={img} />
                    {/*Destination: null*/}
                    {/*DestinationId: null*/}
                    {/*Image: "http://chichiapp.ir:3005/download/5d9884457c1e36d6e452598e"*/}
                    {/*Position: 4*/}
                </div>

            </Card>
        </div>
    );
};


const CustomDot = ({ onClick, active, index, carouselState }) => {
    const { currentSlide } = carouselState;
    return (
        <li style={{ background: active ? "initial" : "initial" }} className='h-1vh mb-2 ml-1'>
            <button
                style={{ background: active ? "#922C88" : "initial" }}
                className="br50 h-100 w-25"
                onClick={() => onClick()}
            />
        </li>
    );
};


class NewHeaderSlider extends Component {

    constructor(props) {
        super(props);
        this.state={
            files: []
        }
    }
    ClickImg(id){
        console.log("aaaa");
        console.log(id);
        this.props.GetSliderType(id)
    }
    static getDerivedStateFromProps(props, state) {
        if (props.DetailImages !== state.files) {
            return {
                files: props.DetailImages,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    render() {
        let{header,error,Edit}=this.props;

        return (
            <Row id='addSlider' dir="ltr">
                <HeaderNameHomPage header={header} error={error} Edit={Edit} handelChangeName={ (e)=>{ this.props.GetCategoriesName(e.target.value)} }/>

                 <Colxx xxs="12" className="pl-0 pr-0 mb-3">
                    <div>
                        <Carousel
                            additionalTransfrom={0}
                            arrows
                            autoPlaySpeed={3000}
                            centerMode={false}
                            className=""
                            containerClass="container-with-dots"
                            // customDot={<CustomDot />}
                            dotListClass=""
                            draggable
                            focusOnSelect={false}
                            infinite
                            itemClass=""
                            keyBoardControl
                            minimumTouchDrag={80}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            responsive={{
                                desktop: {
                                    breakpoint: {
                                        max: 3000,
                                        min: 1024
                                    },
                                    items: 2,
                                    partialVisibilityGutter: 40
                                },
                                mobile: {
                                    breakpoint: {
                                        max: 464,
                                        min: 0
                                    },
                                    items: 1,
                                    partialVisibilityGutter: 30
                                },
                                tablet: {
                                    breakpoint: {
                                        max: 1024,
                                        min: 464
                                    },
                                    items: 2,
                                    partialVisibilityGutter: 30
                                }
                            }}
                            showDots={true}
                            sliderClass=""
                            slidesToSlide={1}
                            swipeable
                        >
                            {this.state.files.map((item,key) => {
                                return (
                                    <div key={key} onClick={this.ClickImg.bind(this , item.id)} >
                                        <NoControlCarouselItem {...item} />
                                    </div>
                                );
                            })}

                        </Carousel>
                        {error!==undefined && error['atLeast']? (
                            <div className="invalid-feedback d-block">
                                { error['atLeast']}
                            </div>
                        ) : null}
                    </div>
                </Colxx>
            </Row>





        );
    }
}

export default NewHeaderSlider;