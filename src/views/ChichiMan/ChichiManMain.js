import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from './../../layout/AppLayout';
import ChichiManInfoCard
    from "../../Component/ChichiMan/ChichiMan-Info/Main-Chichi-Info/sub/ChichiManInfoCard/ChichiManInfoCard";

const ChichiManSignIn = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../Component/ChichiMan/ChiChi Man Sign In/ChichiManSignIn')
);
const ChichiManInfo = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './ChichiMan-Info/ChichiMan-info')
);
const Vote = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './ChichiMan-vote/ChichiMan-vote')
);
const Statistic = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './ChichiMan-statistic/ChichiMan-statistic')
);
const ChichiList = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../Component/ChichiMan/chichiMan-List/ChichiManList')
);

const ChichiManInfoSubmit = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../Component/ChichiMan/chichiMan-List/ChichiMan-info-submit-info/ChichiMan-info-submit-info')
);
const ChichiManHistoryOrders = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ './../../Component/ChichiMan/chichiMan-historyOrders/chichiManHistoryOrders')
);
const ChichiManCheckOut = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/ChichiMan/ChichiMan-Check-out/ChichiManCheckOut')
);
const ChichiManStatus = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/ChichiMan/ChichiMan-status/ChichiManStatus')
);
const ChichiTOUsers = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/ChichiMan/ChichiManVote/ChichiManVoteChichiToUser')
);
const UsersToChichi = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/ChichiMan/ChichiManVote/ChichiManVoteUserToChichi')
);
const Quantity = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/ChichiMan/ChichiMan statistic/ChichiMaStatistic-quantity')
);
const Quality = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/ChichiMan/ChichiMan statistic/ChichiMaStatisticQality')
);
const Situation = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/ChichiMan/ChichiMan-orders-chichiman/ChichiMan-orders-chichiMan')
);



class App extends Component {
    render() {
        const { match } = this.props;

        return (
            <AppLayout>
                <div className="dashboard-wrapper">
                    <Suspense fallback={<div className="loading" />}>
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={`${match.url}/sign-in/:id?/:step?`} />
                            <Route
                                path={`${match.url}/sign-in/:id?/:step?`}
                                render={props => <ChichiManSignIn {...props} item={"ثبت شماره موبایل"} />}
                            />
                            {/*<Route*/}
                                {/*path={`${match.url}/info`}*/}
                                {/*render={props => <ChichiManInfo {...props} />}*/}
                            {/*/>*/}
                            {/**************lists*************/}
                            <Route
                                path={`${match.url}/list`}
                                render={props => <ChichiList  header='list-detail' {...props} />}
                            />
                            <Route
                                path={`${match.url}/list-detail/:userId`}
                                render={props => <ChichiManInfoSubmit {...props} />}
                            />
                            {/**************Situation*************/}
                            <Route
                                path={`${match.url}/situation`}
                                render={props => <Situation type={'chichiman'} {...props} />}
                            />
                            {/**************history-orders*************/}

                            <Route
                                path={`${match.url}/history-orders`}
                                render={props => <ChichiList header='history-order-detail' {...props} />}
                            />
                            <Route
                                path={`${match.url}/history-order-detail/:userId`}
                                render={props => <ChichiManHistoryOrders {...props} />}
                            />
                            {/**************Vote*************/}
                            <Route
                                path={`${match.url}/vote/users-to-chichi`}
                                render={props => <ChichiList header='vote/users-to-chichi-detail'{...props} />}
                            />
                            <Route
                                path={`${match.url}/vote/chichi-to-users`}
                                render={props => <ChichiList header='vote/chichi-to-users-detail' {...props} />}
                            />

                            <Route
                                path={`${match.url}/vote/users-to-chichi-detail/:userId`}
                                render={props => <UsersToChichi {...props} />}
                            />
                            <Route
                                path={`${match.url}/vote/chichi-to-users-detail/:userId`}
                                render={props => <ChichiTOUsers {...props} />}
                            />

                            {/*************statistic*************/}
                            <Route
                                path={`${match.url}/statistic/quality`}
                                render={props => <ChichiList header='statistic/quality-detail'{...props} />}
                            />
                            <Route
                                path={`${match.url}/statistic/quantity`}
                                render={props => <ChichiList header='statistic/quantity-detail' {...props} />}
                            />

                            <Route
                                path={`${match.url}/statistic/quantity-detail/:userId`}
                                render={props => <Quantity {...props} />}
                            />
                            <Route
                                path={`${match.url}/statistic/quality-detail/:userId`}
                                render={props => <Quality {...props} />}
                            />
                            {/**************CheckOut*************/}
                            <Route
                                path={`${match.url}/check-out`}
                                render={props => <ChichiList header='check-out-detail'  {...props} />}
                            />
                            <Route
                                path={`${match.url}/check-out-detail/:userId`}
                                render={props => <ChichiManCheckOut {...props} />}
                            />
                            {/******************status*************/}
                            <Route
                                path={`${match.url}/status`}
                                render={props => <ChichiList header='status-detail' {...props} />}
                            />
                            <Route
                                path={`${match.url}/status-detail/:userId`}
                                render={props => <ChichiManStatus {...props} />}
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
