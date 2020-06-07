import React, { useState } from 'react';
import {GetAllProduct} from "../../functions/ServerConnection";
import {error_Notification, getProductList} from "../../functions/componentHelpFunction";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../Common/Loader/Loader";
import PreviewProduct from "./sub/PreviewProduct/PreviewProduct";

export default function ShowProductAll() {

    const [productSeparate, setproductSeparate] = useState([]);
    const [pageStart, setpageStart] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const loadMore=async()=>{

        // ***get all product and current page ***
        let Response = await GetAllProduct(pageStart);
        if (Response!=='error') {
            let{Products,Page}=Response;
            // *** modify  products to our label value ***
            let productsSeparate = getProductList(Products);
            // *******update state*****
            setproductSeparate([...productSeparate,...productsSeparate]);
            console.log(productSeparate);
            setpageStart(Page+1);
            // ***** check if product length is zero then stop loop****
            sethasMore(Products.length !== 0);
        }else {
            error_Notification('Network Error')
        }
    };


    return (
        <InfiniteScroll
            className="row rtl m-0"
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={<div className="loader col-6 offset-3" key={0}><Loader/></div>}
        >
            <div className='d-flex  w-100  flex-wrap'  >
                {productSeparate.length>0 && Array.isArray(productSeparate)  ?
                    productSeparate.map((todo, index) =>
                        <PreviewProduct Main={todo.Main} sub={todo.sub}  key={index} class={' col-sm-6 col-lg-3  '}/>
                    ) : ''
                }
            </div>
        </InfiniteScroll>
    );
}
