import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ChichiTOUsers = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/ChichiMan/ChichiManVote/ChichiManVoteChichiToUser')
);
const UsersToChichi = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/ChichiMan/ChichiManVote/ChichiManVoteUserToChichi')
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
                            path={`${match.url}/users-to-chichi`}
                            render={props => <UsersToChichi {...props} />}
                        />
                        <Route
                            path={`${match.url}/chichi-to-users`}
                            render={props => <ChichiTOUsers {...props} />}
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
