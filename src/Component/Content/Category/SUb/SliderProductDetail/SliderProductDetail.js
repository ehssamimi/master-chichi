import React, {Component} from 'react';

 import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card, CardTitle, Row} from "reactstrap";
import GlideComponent from "../../../../../components/carousel/GlideComponent";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import PreviewProductDetail from "../../../Product/sub/PreviewProductDetail/PreviewProductDetail";
import PreviewProduct from "../../../Product/sub/PreviewProduct/PreviewProduct";

const NoControlCarouselItem = ({ Main,sub }) => {
console.log('Main');
console.log(Main);
console.log('sub');
console.log(sub);
    return (
        <div className="glide-item col-12 cursor-pointer" >
            <Card>
                <div className="position-relative vh25">
                    <img className="card-img-top img-self-fill " src={Main['Images']} alt={ 'a'} />
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


class SliderProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state={
            files: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.productSeparate !== state.files) {
            return {
                files: props.productSeparate,
            };
        }
        // Return null if the state hasn't changed
        return null;
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
        let{files}=this.state;
        //
        // console.log(files);
        return (
            <Row id='addSlider'>

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
                                    items: 3,
                                    partialVisibilityGutter: 40
                                },
                                mobile: {
                                    breakpoint: {
                                        max: 464,
                                        min: 0
                                    },
                                    items:2,
                                    partialVisibilityGutter: 30
                                },
                                tablet: {
                                    breakpoint: {
                                        max: 1024,
                                        min: 464
                                    },
                                    items: 3,
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
                                    <div key={key}   >
                                        <PreviewProduct Main={item['Main']} sub={item['sub']}  class={''}/>
                                        {/*<NoControlCarouselItem Main={item['Main']} sub={item['Main']}/>*/}
                                    </div>
                                );
                            })}

                        </Carousel>
                    </div>
                </Colxx>
            </Row>





        );
    }
}

export default SliderProductDetail;