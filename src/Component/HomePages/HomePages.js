import React, {Component} from 'react';
// import CategoriesHomePage from "./Sub/ShowPreviewHomePage/Categories/CategoriesHomePage";
// import HeaderAppHomePage from "./Sub/ShowPreviewHomePage/HeaderAppHomePage/HeaderAppHomePage";
// import WonderPackageHomePage from "./Sub/ShowPreviewHomePage/WonderPackageHomePage/WonderPackageHomePage";
// import appheader from './../../assets/img/app-header.svg';
// import statusHomePage from './../../assets/img/statusHomePage.jpg';
// import SliderOnePage from "./Sub/ShowPreviewHomePage/SliderOnePage/SliderOnePage";
// import ShowItemsHomePages from "./Sub/ShowPreviewHomePage/ShowItemsHomePages/ShowItemsHomePages";
import SliderTwoPages from "./Sub/SliderTwoPages/SliderTwoPages";
// import { detailImages } from "../../data/carouselItems";
import {GetHomePageTemp} from './../functions/ServerConnection'


// import ax1 from './../../assets/img/4th.jpg'
// import PreviewCategories from "./Sub/CategoriesHomePage/PreviewCategories/PreviewCategories";
// import ax from "../../assets/img/4th.jpg";
import HomePagePreview from "./Main/Edit/HomePagePreview";



class HomePages extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:''
        }
    }

    async componentDidMount() {
        let data = await GetHomePageTemp();
        this.setState({
            data
        })
        // console.log(data);
    }
    render() {
        let{data}=this.state;
        return (
            <div className='col-12'>
                {data.length>1?<HomePagePreview Classs='col-12' Data={data}/>:''}
                {/*<div className='col-5'>*/}
                    {/*<HeaderAppHomePage ax={appheader} className='height5vh'/>*/}
                    {/*<HeaderAppHomePage ax={statusHomePage} className='height15vh'/>*/}
                    {/*<SliderOnePage DetailImages={detailImages}/>*/}
                    {/*<ShowItemsHomePages header={'برترین ها'}/>*/}
                    {/*/!*<CategoriesHomePage header={'دسته بندی'} ax1={ax1} ax2={ax1} ax3={ax1} ax4={ax1}/>*!/*/}
                    {/*<PreviewCategories header={'دسته بندی'} ax1={ax1} ax2={ax1} ax3={ax1} ax4={ax1}/>*/}

                    {/*<ShowItemsHomePages header={'لبنیات'}/>*/}
                    {/*<WonderPackageHomePage header={'پکیج های شگفت انگیز'}  ax1={ax1} ax2={ax1} ax3={ax1} ax4={ax1} ax5={ax1}/>*/}
                    {/*<SliderTwoPages/>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default HomePages;