import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from './../../../layout/AppLayout';
import MainChichiInfo from "../../../Component/ChichiMan/ChichiMan-Info/Main-Chichi-Info/Main-chichi-info";


const ChichiManInfo = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/ChichiMan/ChichiMan-Info/ChichiMan-info-current-trip/ChichiMan-info')
);
const ChichiManCheckOut = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/ChichiMan/ChichiMan-Info/ChichiMan-info-check-out/ChichiMan-info-check-out')
);
const ChichiManVote = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/ChichiMan/ChichiMan-Info/ChichiMan-info-vote/ChichiMan-info-vote')
);
const ChichiManStatic = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/ChichiMan/ChichiMan-Info/ChichiMan-info-static/ChichiMan-info-static')
);
const ChichiManSubmitInfo = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/ChichiMan/ChichiMan-Info/ChichiMan-info-submit-info/ChichiMan-info-submit-info')
);
const ChichiManHistoryTrip = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/ChichiMan/ChichiMan-Info/ChichiMan-info-history-trip/ChichiMAn-info-history-trip')
);
const ChichiManSituation = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/ChichiMan/ChichiMan-Info/ChichiMan-info-situation/ChichiManInfoSituation')
);

class App extends Component {
    render() {
        const { match } = this.props;

        return (

                <div className="dashboard-wrapper">
                    <Suspense fallback={<div className="loading" />}>
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={`${match.url}/main`} />
                            <Route
                                path={`${match.url}/main`}
                                render={props => <MainChichiInfo {...props} />}
                            />
                            <Route
                                path={`${match.url}/current-trip`}
                                render={props => <ChichiManInfo {...props} />}
                            />
                            <Route
                                path={`${match.url}/check-out`}
                                render={props => <ChichiManCheckOut {...props} />}
                            />
                            <Route
                                path={`${match.url}/vote`}
                                render={props => <ChichiManVote {...props} />}
                            />
                            <Route
                                path={`${match.url}/static`}
                                render={props => <ChichiManStatic {...props} />}
                            />
                            <Route
                                path={`${match.url}/submit-info`}
                                render={props => <ChichiManSubmitInfo {...props} />}
                            />

                            <Route
                                path={`${match.url}/trip-history`}
                                render={props => <ChichiManHistoryTrip {...props} />}
                            />
                            <Route
                                path={`${match.url}/situation`}
                                render={props => <ChichiManSituation {...props} />}
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
