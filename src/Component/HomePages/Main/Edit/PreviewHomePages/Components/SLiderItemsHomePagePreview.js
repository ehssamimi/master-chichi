import React, {Component} from 'react';
import {Row, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import { Colxx, Separator } from "../../../../../../components/common/CustomBootstrap";
import GlideComponent from "../../../../../../components/carousel/GlideComponent";
import {GetAllItemList } from "../../../../../functions/ServerConnection";
import NotificationManager from "../../../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import PreviewPackages from "../../../../Sub/WonderPackageAddHomePage/subPackage/PreviewPackages";
import PreviewItems from "../../../../Sub/ItemList/PreviewItems/PreviewItems";
import {error_Notification} from "../../../../../functions/componentHelpFunction";
const NoControlCarouselItem = ({ Name, Image, CurrentPrice, PrevPrice }) => {
    return (
        <div className="glide-item">
            <Card>
                <div className="position-relative vh25">
                    <img className="card-img-top img-self-fill " src={Image} alt={Name} />
                    {/*{badges &&*/}
                    {/*badges.map((b, index) => {*/}
                    {/*return (*/}
                    {/*<span*/}
                    {/*key={index}*/}
                    {/*className={`badge badge-pill badge-${*/}
                    {/*b.color*/}
                    {/*} position-absolute ${*/}
                    {/*index === 0*/}
                    {/*? "badge-top-left"*/}
                    {/*: "badge-top-left-" + (index + 1)*/}
                    {/*}`}*/}
                    {/*>*/}
                    {/*{b.title}*/}
                    {/*</span>*/}
                    {/*);*/}
                    {/*})}*/}
                </div>
                <CardBody>
                    <h6 className="mb-4">{Name}</h6>
                    <footer>
                        {/*<p className="text-muted text-small mb-0 font-weight-light">*/}
                        {/*{Name}*/}
                        {/*</p>*/}
                        <div className='d-flex'  >
                            <span className='  d-flex mr-auto '>
                                {CurrentPrice}
                                تومان
                            </span>
                            <span className='ml-auto text-muted text-line' >
                                <span>{PrevPrice}</span>
                                <span>تومان</span>



                            </span>

                        </div>

                    </footer>
                </CardBody>
            </Card>
        </div>
    );
};



class SLiderItemsHomePagePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteItem: false, Edit: false, itemsList: []
        }
    }

    async handelDelete() {
        this.props.deleteComponent(this.props.header,'ItemList',this.props.position);

        // let data= await DeleteCitemList(this.props.items.Title);
        // // let{Data}=this.props.items;
        // let id=1;
        //
        // if(data===200){
        //     NotificationManager.success(
        //
        //         "congratulation",
        //         "your categories deleted",
        //         3000,
        //         null,
        //         null,
        //         "success"
        //     );
        //     console.log(data);
        //     const $el = document.getElementById(`${id}`);
        //     const duration = 2;
        //     const from = { opacity: 0};
        //     TweenMax.to($el, duration, from);
        //     setTimeout(() => {
        //         $el.remove();
        //     }, 2000)
        // }
        this.toggleLarge()
    }


    handelclickDelete() {
        this.setState({
            deleteItem: true
        })
    }

    toggleLarge = () => {
        this.setState(prevState => ({
            deleteItem: !prevState.deleteItem
        }));
    };

    async handelclickEdit() {
        this.setState({
            Edit: true
        });

        // let itemsList = await GetAllItemList();
        // // console.log(itemsList);
        // this.setState({
        //     itemsList
        // });

        let {state:state2,Description:itemsList } = await GetAllItemList( );
        console.log(itemsList);
        if (state2===200){
            this.setState({
                itemsList
            })
        }else {
            error_Notification(state2,itemsList)
        }



    }

    ClickEdit(Name) {
        console.log(Name);
        this.props.ChangeComponent(Name, 'ItemList', this.props.position);
        this.toggleEdit()
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            Edit: !prevState.Edit
        }));
    };

    render() {
        // console.log(items);
        // console.log(this.props.items);
        let {Data}=this.props.items;
        let{itemsList}=this.state;
        // console.log(itemsList)
        return (
            <div>
                <Row>
                    <Colxx xxs="12" id={1}>
                        {
                            this.props.Edit?"":
                                <CardTitle className='d-flex'>
                                    <div className='mr-auto'>
                                        <span className=' simple-icon-trash cursor-pointer'
                                              onClick={this.handelclickDelete.bind(this)}></span>
                                        <span className='  iconsminds-file-edit cursor-pointer'
                                              onClick={this.handelclickEdit.bind(this)}></span>
                                    </div>
                                    {
                                        this.props.items.Title
                                    }
                                </CardTitle>
                        }

                    </Colxx>
                    <Colxx xxs="12" className="pl-0 pr-0 mb-5">
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
                            { Data.map(item => {
                                return (
                                    <div key={item._id}>
                                        <NoControlCarouselItem {...item} />
                                    </div>
                                );
                            })}
                        </GlideComponent>
                    </Colxx>
                </Row>
                <Modal
                    isOpen={this.state.deleteItem}
                    size="lg"
                    toggle={this.toggleLarge}
                >
                    <ModalHeader toggle={this.toggleLarge}>
                        Delete Category {this.props.header}

                    </ModalHeader>
                    <ModalBody>
                        Are u sure?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handelDelete.bind(this)}>
                            Yes
                        </Button>{" "}
                        <Button color="secondary" onClick={this.toggleLarge}>
                            Cancel
                        </Button>
                    </ModalFooter>

                </Modal>
                <Modal
                    isOpen={this.state.Edit}
                    size="md"
                    toggle={this.toggleEdit}
                >
                    <ModalHeader toggle={this.toggleEdit}>
                        Change ItemList {this.props.header}

                    </ModalHeader>
                    <ModalBody>
                        <div className='col-12 d-flex '>
                            <div className='col-12 d-flex flex-column justify-content-end'>
                                {
                                    itemsList.length>0? itemsList.map((cat ,index)=><PreviewItems Title={cat.Title} key={index} clickPreview={this.ClickEdit.bind(this)} select={true} baner={true}/>):""
                                }
                            </div>
                            <div className='col-6'>

                            </div>

                        </div>
                    </ModalBody>


                </Modal>
            </div>
        );
    }
}

export default SLiderItemsHomePagePreview;