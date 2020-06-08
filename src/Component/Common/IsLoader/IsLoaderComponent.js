import React, {useState, useEffect} from 'react';
import Loader from "../Loader/Loader";

const IsLoaderComponent = (props) => {
    let{isLoader}=props;
    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
    });

    return (
        <div className="w-100">
            {
                isLoader
                    ? <div className='d-flex justify-content-center align-items-center'>
                        <div className='col-6'>
                            <Loader/>
                        </div>
                    </div> :
                    <div>
                        {props.children}
                    </div>

            }
        </div>
    );
};

export default IsLoaderComponent;