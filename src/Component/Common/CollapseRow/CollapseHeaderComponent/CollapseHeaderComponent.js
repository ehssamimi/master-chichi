import React, {useState, useEffect} from 'react';

const CollapseHeaderComponent = (props) => {
    let{onClick,collapse,header,divClass}=props;
    return (

            <div className='d-flex justify-content-start align-items-center ' onClick={onClick} >
                {
                    collapse?
                        <h3 className='simple-icon-minus icon-glyph mr-2'/>
                        :
                        <h3 className='simple-icon-plus icon-glyph mr-2'/>

                }
                <h3 className={divClass}>{header}:</h3>
            </div>

    );
};

export default CollapseHeaderComponent;