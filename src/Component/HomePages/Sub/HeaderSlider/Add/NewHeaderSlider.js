import React, {Component} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Card, CardTitle, Row} from "reactstrap";
import GlideComponent from "../../../../../components/carousel/GlideComponent";
import {Colxx} from "../../../../../components/common/CustomBootstrap";

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

// const CustomDot = ({onClick, ...rest}) => {
//     const {onMove, index, active, carouselState: {currentSlide, deviceType}} = rest;
//     const carouselItems = [ CarouselItem1, CaourselItem2, CarouselItem3];
//     // onMove means if dragging or swiping in progress.
//     // active is provided by this lib for checking if the item is active or not.
// return (
//                 <button className={active ? 'active' : 'inactive'} onClick={() => onClick()}>
//                     {React.Children.toArray(carouselItems)[index]}
//                 </button>
// )
// }
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



    handelChangeName(e){
        let val =e.target.value;
        // console.log(e );
        // console.log(e.trim());
        // console.log(e.target.value
        // );
        // console.log(e.target.value);
        this.setState({
            name:e.target.value
        },()=>{
            this.props.GetCategoriesName(this.state.name)
        })

    }

    render() {
        let{header}=this.props;
        return (
            <Row id='addSlider'>
                <Colxx xxs="12" className='d-flex justify-content-end' >


                    <CardTitle className='d-flex'>
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
                    </CardTitle>
                </Colxx>
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
                    </div>
                </Colxx>
            </Row>





        );
    }
}

export default NewHeaderSlider;