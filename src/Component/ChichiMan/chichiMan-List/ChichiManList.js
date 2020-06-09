import React, {Component} from 'react';
import ChichiManInfoCard from "../ChichiMan-Info/Main-Chichi-Info/sub/ChichiManInfoCard/ChichiManInfoCard";
 import InfiniteScroll from "react-infinite-scroller";
 import { ChichiManListSummery} from "../../functions/ServerConnection";
import Loader from "../../Common/Loader/Loader";

class ChichiManList extends Component {
    constructor(props) {
        super(props);
        this.state={
            listChichiMan: [],
            pageStart:1,
            hasMore:true,
            last_page:500
        }
    }

    async loadMore( ) {

        let {pageStart } = this.state;
        let Response = await ChichiManListSummery( pageStart);
         let {Description, Code} = Response;
        let Page = 1;

        if (Code === 200) {
            this.setState(prevState => ({
                listChichiMan: [...prevState.listChichiMan, ...Description],
                // hasMore:    Page !== last_page,
                pageStart: Page + 1,
                hasMore: Description.length !== 0
            }));
        }

    }
      updateList=()=>{
        console.log("update this page");
          this.setState({
              pageStart:1
          });

          this.loadMore() ;

    };


    render() {


        let{listChichiMan}=this.state;
        console.log('listChichiMan');
        console.log(listChichiMan);
        return (

            <InfiniteScroll
                className="row rtl m-0"
                pageStart={0}
                loadMore={this.loadMore.bind(this)}
                hasMore={this.state.hasMore}
                loader={<div className="loader " key={0}><Loader/></div>}
            >
                <div className='row m-0 w-100'>
                    {
                        listChichiMan.length > 0 ?
                            listChichiMan.map((chichiMan, index) => <ChichiManInfoCard updateList={this.updateList} id={chichiMan['_id']} key={index} chichiMan={chichiMan}  {...this.props}
                                                                                       class='col-sm-6 col-md-6 col-lg-6 col-xl-4  '/>) : <div className='container d-flex justify-content-center fs-13vw'>هیچ چی چی من  ثبت نشده است! </div>
                    }
                </div>
            </InfiniteScroll>
        );


    }
}

export default ChichiManList;