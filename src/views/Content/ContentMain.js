import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from './../../layout/AppLayout';

const ContentProduct = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './Product/ContentProductMain')
);
const ContentCategory = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './Category/ContentCategoryMain')
);


class App extends Component {
    render() {
        const { match } = this.props;

        return (
            <AppLayout>
                <div className="dashboard-wrapper">
                    <Suspense fallback={<div className="loading" />}>
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={`${match.url}/product`} />
                            <Route
                                path={`${match.url}/product`}
                                render={props => <ContentProduct {...props} />}
                            />
                            <Route
                                path={`${match.url}/category`}
                                render={props => <ContentCategory {...props} />}
                            />
                            <Redirect to="/error" />
                        </Switch>
                    </Suspense>
                </div>
            </AppLayout>
        );
    }
}
const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = menu;
    return { containerClassnames };
};

export default withRouter(
    connect(
        mapStateToProps,
        {}
    )(App)
);