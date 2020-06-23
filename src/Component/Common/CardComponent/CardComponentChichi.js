import React from 'react';
import {Card, CardBody, CardTitle, Row} from "reactstrap";
import {Colxx} from "../../../components/common/CustomBootstrap";

const CardComponentChichi = (props) => {

    return (
        <div dir='rtl'>
            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <div className='d-flex justify-content-start'>
                                    <span>{props.header}</span>
                                </div>
                            </CardTitle>
                            {props.children}
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>
        </div>
    );
};

export default CardComponentChichi;
