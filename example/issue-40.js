import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Breadcrumbs from '../src/index.js';

function InstancesPage(props) {
    return (
        <div>
            <Breadcrumbs wrappingComponent="div" routes={props.routes} createSeparator=" | " />
            <h1>InstancesPage (plural)</h1>
        </div>
    );
}
function NewInstancePage(props) {
    return (
        <div>
            <Breadcrumbs wrappingComponent="div" routes={props.routes} createSeparator=" | " />
            <h1>NewInstancePage</h1>
        </div>
    );
}
function InstancePage(props) {
    return (
        <div>
            <Breadcrumbs wrappingComponent="div" routes={props.routes} createSeparator=" | " />
            <h1>InstancePage (single)</h1>
        </div>
    );
}

InstancesPage.propTypes = NewInstancePage.propTypes = InstancePage.propTypes = {
    routes: React.PropTypes.array
};

export default (
    <Router history={hashHistory}>
        <Route name="Instance" path="instances">
            <IndexRoute name="Instances" component={InstancesPage} />
            <Route breadcrumbIgnore name="NewInstance" path="new" component={NewInstancePage} />
            <Route breadcrumbIgnore name="NewInstancePage" breadcrumbName=":id" path=":id" component={InstancePage} />
        </Route>
    </Router>
);
