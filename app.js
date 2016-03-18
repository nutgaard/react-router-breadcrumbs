/* eslint react/no-multi-comp:0 */
/* eslint react/prop-types:0 */
import React from 'react';
import Breadcrumbs, { combineResolvers, textResolver, resolver, key, childOf, pathname, path } from 'react-router-breadcrumbs';
import { Link } from 'react-router';

const userlist = [
    { id: '1', name: 'John', img: 'http://cdn3.thr.com/sites/default/files/2011/08/rambo_a.jpg' },
    { id: '2', name: 'Rambo', img: 'https://i.ytimg.com/vi/bZemQdvthBs/maxresdefault.jpg' }
];

const userResolver = resolver(key(':userId')).then((_, keyValue) => userlist
    .filter((u) => u.id === keyValue)[0]
    .name
);

const itemResolver = resolver(key(':item1'), childOf(pathname('RouteName1'), path('parent')))
    .then((_, keyValue) => keyValue.toUpperCase());

const customResolver = (keyValue, text) => {
    if (keyValue === ':item2') {
        return `${keyValue}/${text}`;
    }
    return undefined;
};

const crumbResolver = combineResolvers(userResolver, itemResolver, customResolver, textResolver);

export const App = ({ routes, params, children }) => (
    <div className="animated fadeIn">
        <div>
            <Breadcrumbs routes={routes} createSeparator=" | " />
            <Breadcrumbs routes={routes} params={params} resolver={crumbResolver} />
            <div className="content">
                <h3>Navigation</h3>
                Users route: <Link to="users">Users</Link>
                <hr />
                Very long route: <Link to="/parent">Parent</Link>{" "}
                <Link to="/parent/child1">Child1</Link>{" "}
                <Link to="/parent/child1/item1">Item1</Link>{" "}
                <Link to="/parent/child1/item1/child2">Child2</Link>{" "}
                <Link to="/parent/child1/item1/child2/item2">Item2</Link>{" "}
                <Link to="/parent/child1/item1/child2/item2/child3">Child3</Link>{" "}
                <br />
                Second very long route: <Link to="/parent-2">Parent-2</Link>{" "}
                <Link to="/parent-2/child1">Child1-2</Link>{" "}
                <Link to="/parent-2/child1/item1">Item1-2</Link>{" "}
                <Link to="/parent-2/child1/item1/child2">Child2-2</Link>{" "}
                <Link to="/parent-2/child1/item1/child2/item2">Item2-2</Link>{" "}
                <Link to="/parent-2/child1/item1/child2/item2/child3">Child3-2</Link>{" "}
                <h3>Content</h3>
                {children}
                <a href="https://github.com/nutgaard/react-router-breadcrumbs" className="github">
                    <img src="GitHub-logo.png" alt="Github link to repository"/>
                    <h4 className="github-link">Check out the GitHub Repository</h4>
                </a>
            </div>
        </div>
    </div>
);

export const Info = () => (
    <div>
        <div>
            The breadcrumbs will use the route names for non-dynamic
            routes or the parameter value for :item1 and :item2.
        </div>
    </div>
);

export const NoMatch = () => (
    <div>
        <div>
            <Breadcrumbs routes={this.props.routes}/>
        </div>
    </div>
);

export class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: { id: 0, name: '', img: '' } };
    }

    componentDidMount() {
        this.setUserState();
    }

    componentWillUpdate(nextProps) {
        if (this.state.user.id !== nextProps.params.userId) {
            this.setUserState();
        }
    }

    setUserState() {
        this.setState({
            user: this.findUserById(this.props.params.userId)[0]
        });
    }

    findUserById(id) {
        return userlist.filter((item) => item.id === id);
    }

    render() {
        return (
            <div>
                <div>
                    <hr />
                    This is what we know:
                    <br />ID: {this.state.user.id}
                    <br />NAME: {this.state.user.name}
                </div>
            </div>
        );
    }
}

export class UserImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: { id: 0, name: '', img: '' } };
    }

    componentDidMount() {
        this.setUserState();
    }

    componentWillUpdate(nextProps) {
        if (this.state.user.id !== nextProps.params.userId) {
            this.setUserState();
        }
    }

    setUserState() {
        this.setState({
            user: this.findUserById(this.props.params.userId)[0]
        });
    }

    findUserById(id) {
        return userlist.filter((item) => item.id === id);
    }

    render() {
        return (
            <div>
                <div>
                    <hr />
                    This is what we know:
                    <img src={this.state.user.img} alt="Rambo"/>
                </div>
            </div>
        );
    }
}


export class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: userlist };
    }

    componentWillMount() {
        if ('users' in this.props) {
            this.setState({ users: this.props.users });
        }
    }

    render() {
        return (
            <div>
                <h1>User List</h1>
                <div className="master">
                    <ul>
                        {this.state.users // eslint-disable-line newline-per-chained-call
                            .map((user) => (
                                <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>
                            ))}
                    </ul>
                </div>
                <div className="detail">

                    {this.props.children}
                </div>
            </div>
        );
    }
}

export const User = (props) => (
    <div>
        <hr />
        You're one click away from learning everything we know
        about user no {props.params.userId}.<br />
        Click{" "}<strong>
        <Link to={`/users/${props.params.userId}/details`}>here</Link></strong> for more details.
        <Link to={`/users/${props.params.userId}/image`}>Images here</Link>
        <br />
        {props.children}
    </div>
);
