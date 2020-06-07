import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const All = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/Content/Product/ShowProductAll')
);
const Add = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/Content/Product/Content-product-add')
);

const Info = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/Content/Product/Content-product-info')
);


class App extends Component {
    render() {
        const { match } = this.props;

        return (
            <div className="dashboard-wrapper">
                <Suspense fallback={<div className="loading" />}>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
                        <Route
                            path={`${match.url}/all`}
                            render={props => <All {...props} />}
                        />
                        <Route
                            path={`${match.url}/each/info/:Id`}

                            render={(props) => <Info {...props} />}
                         />
                        <Route
                            path={`${match.url}/add/:Id?`}
                            render={props => <Add {...props} />}
                        />

                        <Redirect to="/error" />
                    </Switch>
                </Suspense>
            </div>
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