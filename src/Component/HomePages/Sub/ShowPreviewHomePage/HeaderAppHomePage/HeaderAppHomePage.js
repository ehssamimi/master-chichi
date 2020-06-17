import React, {Component} from 'react';
import ax from './../../../../../assets/img/app-header.svg'


class HeaderAppHomePage extends Component {
    render() {
        let{ax,className}=this.props;
        return (
            <div className={['w-100' ,className||''].join(' ')}>
                <img src={ax} className='img-self-fill'/>
            </div>
        );
    }
}

export default HeaderAppHomePage;