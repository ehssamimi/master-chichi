import React, {Component} from 'react';
import PreViewBanner from "./PreViewBanner/PreViewBanner";
import AddBanerHomePage from "./AddBaner/AddBanerHomePage";
import {GetBanners, GetBanerDetail} from "../../../functions/ServerConnection";
import axis from './../../../../assets/img/4th.jpg'
import {error_Notification} from "../../../functions/componentHelpFunction";
import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";


class MainBaner extends Component {
    constructor(props) {
        super(props);
        this.state={
            AllBanners:[],ax:axis,name:'',Destination:"",IsLoader:true
        }
    }

    async componentDidMount(){
        await  this.GetAllBaners()
    }

// *******handel get all baners*******
    GetAllBaners = async () => {
        this.setState({
            IsLoader:true
        })
        let {state ,Description:AllBanners} = await GetBanners();
        if (state!==200){
            error_Notification(state,AllBanners)
        }else {
            this.setState({
                AllBanners:AllBanners.Items,IsLoader:false
            })
        }
    }

    // ********i dont know this is neccecery or not "*****************"

    async ClickEdit(value ,id) {
        console.log(value);
        let data= await GetBanerDetail(value);
        console.log(data);
        let header=data.Name;
        // let ax =data.Items[0].Image;
        let ax =data.Image;
        let name=data.Name;
        let Destination=data.Destination;
        console.log(ax);
        // console.log(name);

        this.setState({
            header ,ax ,Edit:true,id,name,Destination
        })
    }

    render() {
        let{AllBanners,IsLoader,ax}=this.state;
        return (
            <div className='w-100 d-flex'  >
                <div className='col-6'>
                            <AddBanerHomePage  id={1} header={'title'} ax={ax} name={this.state.name} Destination={this.state.Destination}
                                                updateListComponents={()=>{this.GetAllBaners()}}
                            />
                </div>
                <div className='col-6'>
                    <IsLoaderComponent isLoader={IsLoader}>
                        {
                            AllBanners.map((item, index) => <PreViewBanner id={item._id} key={index} header={item.Name}
                                                                           ax={item.Image} index={index}
                                                                           clickPreview={this.ClickEdit.bind(this)}/>)

                        }
                    </IsLoaderComponent>

                 </div>

            </div>
        );
    }
}

export default MainBaner;