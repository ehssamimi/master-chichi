import React, {Component} from 'react';
import {getProductinSubCategogy} from "../../../../functions/ServerConnection";
import InfiniteScroll from "react-infinite-scroller";
import PreviewProduct from "../../../Product/sub/PreviewProduct/PreviewProduct";

class SubCategoryProductInfinityScroll extends Component {
    constructor(props) {
        super(props);
        this.state={
            productSeparate:[],
            pageStart:1,
            hasMore:true,
            last_page:1
        }
    }


    async loadMore(){
        console.log("loadMore");
        let{pageStart,last_page}=this.state;

        // let Response = await GetAllProduct(pageStart);

        let Response = await getProductinSubCategogy(this.props.name,pageStart);
        let{Products,Page}=Response['Description'];
        console.log(Products);
        let productSeparate=[]
        if (Products!==[]){
            Products.map((each, index) => {
                    let sub = {"تعداد": each['Count'],"تولید": each['Manufacture'],"دسته بندی": each['Category'] };
                    let Main = {
                        "name": each['UniqueValue'],
                        "Attribute": each['Attribute'],
                        "Description": each['Description'],
                        "PrevPrice": each['PrevPrice'],
                        "CurrentPrice": each['CurrentPrice'],
                        "Images": each['Images'][0],
                        "ViewCount": each['ViewCount'] ,
                        "Off": each['Off'],
                        "id":each['_id']
                    };
                    let row={'Main':Main,'sub':sub};
                    productSeparate.push(row)
                }
            );
            this.setState(prevState=>({
                productSeparate:[ ...prevState.productSeparate , ...productSeparate ],
                hasMore:Page !== last_page,
                pageStart:Page+1
            }));
        } else {
            console.log(Products)
        }

    }



    render() {
        let {productSeparate}=this.state;
        // console.log(productSeparate);
        // console.log(this.props);


        return (


                <InfiniteScroll
                    className="row  m-0"
                    pageStart={0}
                    loadMore={this.loadMore.bind(this)}
                    hasMore={this.state.hasMore}
                    useWindow={false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    <div className='d-flex  w-100  flex-wrap'  >
                        {productSeparate.length>1 ?
                            productSeparate.map((todo, index) =>
                                <PreviewProduct Main={todo.Main} sub={todo.sub}  key={index} class={' col-sm-6 col-lg-4  '}/>
                            ) : <div className='d-flex justify-content-center align-items-center w-100 h-100'>
                                <span className='fs-13vw purpleColor'>محصولی درون این دسته بندی وجود ندارد!</span>
                            </div>
                        }
                    </div>
                    {/*{this.state.article.map((product, index)=><Iteam product={product} key={index}/>)}*/}
                </InfiniteScroll>


        );
    }
}

export default SubCategoryProductInfinityScroll;