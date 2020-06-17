import React, {Component} from 'react';
import {Card, CardBody, CardTitle, Row} from "reactstrap";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import GlideComponent from "../../../../../components/carousel/GlideComponent";
import HeaderPreviewComponentHomePage from "../../HeaderPreviewComponentHomePage/HeaderPreviewComponentHomePage";

const NoControlCarouselItem = ({ Destination, img }) => {

    return (
        <div className="glide-item col-12" >
            <Card>
                <div className="position-relative vh25">
                    <img className="card-img-top img-self-fill " src={img} alt={img} />
                    {/*Destination: null*/}
                    {/*DestinationId: null*/}
                    {/*Image: "http://chichiapp.ir:3005/download/5d9884457c1e36d6e452598e"*/}
                    {/*Position: 4*/}
                </div>
                {/*<CardBody>*/}
                    {/*<h6 className="mb-4">{Destination}</h6>*/}
                    {/*<footer>*/}
                        {/*<p className="text-muted text-small mb-0 font-weight-light">*/}
                            {/*DestinationId: {DestinationId}*/}
                        {/*</p>*/}
                        {/*<div className='d-flex'  >*/}
                            {/*<span className='  d-flex  '>*/}
                                {/*{Position}*/}
                                {/*Position:*/}
                            {/*</span>*/}


                        {/*</div>*/}

                    {/*</footer>*/}
                {/*</CardBody>*/}
            </Card>
        </div>
    );
};

class AddHeadersSlider extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:'',Files:[]
        }
    }
    // componentWillReceiveProps(props){
    //     this.setState({
    //         Files:props.DetailImages
    //     })
    // }
    //


    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.DetailImages !== prevProps.DetailImages) {
    //         this.setState({
    //             Files:this.props.DetailImages
    //         })
    //         // this.fetchData(this.props.userID);
    //     }
    // }
    static getDerivedStateFromProps(props, state) {
        if (props.DetailImages !== state.Files) {
            return {
                Files: props.DetailImages,
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
    ClickImg(id){
        console.log("aaaa")
        console.log(id);
        this.props.GetSliderType(id)
    }
    render() {
        let {DetailImages,header}=this.props;
        let {Files}=this.state;
        console.log('Files');
        console.log(Files);
        return (
            <div >
                <Row>
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
                        <GlideComponent settings={
                            {
                                gap: 5,
                                perView:2,
                                type: "carousel",
                                breakpoints: {
                                    480: { perView: 1 },
                                    800: { perView: 2 },
                                    1200: { perView: 2 }
                                },
                                hideNav: false
                            }
                        }>
                            {Files.map((item,key) => {
                                return (
                                    <div key={key} onClick={this.ClickImg.bind(this , item.id)} >
                                        <NoControlCarouselItem {...item} />
                                    </div>
                                );
                            })}
                        </GlideComponent>
                    </Colxx>
                </Row>


            </div>
        );
    }
}

export default AddHeadersSlider;