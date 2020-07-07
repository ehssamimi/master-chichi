import React, {useState, useEffect} from 'react';
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import {CardTitle, Row} from "reactstrap";

const HeaderNameHomPage = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    let{header,error,Edit,handelChangeName}=props;
    return (
        <Colxx xxs="12" className='d-flex justify-content-end' >


            <CardTitle className='d-flex'>
                {
                    Edit ?

                        <span dir='rtl' className='ml-2 d-flex align-items-end '>
                                     نام : {header}
                                     </span>


                        :
                        <span dir='rtl' className='d-flex  align-items-center'>
                                         <span className='ml-2'>نام:</span>
                                         <input type='text' name="id" id="id"
                                                onChange={handelChangeName}
                                                className='border-0 fS1vw backgroundDefault' placeholder={header}/>
                            { error!==undefined && error['header']? (
                                <div className="invalid-feedback d-block">
                                    { error['header']}
                                </div>
                            ) : null}
                                    </span>
                }
            </CardTitle>
        </Colxx>
    );
};

export default HeaderNameHomPage; 
 