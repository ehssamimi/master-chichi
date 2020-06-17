import React, {Component} from 'react';

class HeaderSectionHomePage extends Component {
    render() {
        let{header}=this.props;
        return (
            <div className='  mb-2 d-flex justify-content-end  '>

                <span className='mr-auto fS08vw gray d-flex align-items-center mt-2'><span className='simple-icon-arrow-left' > </span>مشاهده همه </span>
                <span className='fontSize '>{header}<span className='spanlineHeader' > |</span> </span>
            </div>
        );
    }
}

export default HeaderSectionHomePage;