import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Quantity = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/ChichiMan/ChichiMan statistic/ChichiMaStatistic-quantity')
);
const Quality = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/ChichiMan/ChichiMan statistic/ChichiMaStatisticQality')
);


class App extends Component {
    render() {
        const { match } = this.props;

        return (

            <div className="dashboard-wrapper">
                <Suspense fallback={<div className="loading" />}>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={`${match.url}/users-to-chichi`} />
                        <Route
                            path={`${match.url}/quantity`}
                            render={props => <Quantity {...props} />}
                        />
                        <Route
                            path={`${match.url}/quality`}
                            render={props => <Quality {...props} />}
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
