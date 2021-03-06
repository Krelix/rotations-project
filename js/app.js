/**
 * Created by @krelix on 03/02/2016
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute, RouterContext, useRouterHistory } from 'react-router'
import {createHashHistory} from 'history'
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import Home from './components/Home'
import ButtonCreator from './components/ButtonCreator'
import ButtonSimulator from './components/ButtonSimulator'
import reducers from './reducers'

// Require the Stylus file so it can be processed by webpack when building.
require('../css/stylus/main.styl')

// Create a store using the reducers defined in ./reducers/index.js
const theStore = createStore(reducers)
// Creates a history using the hashHistory element from history
// allows access to some URLs without setting up server-side rendering
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

class App extends React.Component {
    render() {
        // Return HTML content with links to other parts
        // By default, we are on the "Home" part, which load the Home component
        return (
            <div>
                <div className="navigation">
                    <Link to="/">Home</Link>
                    <Link to="/buttonMaker">Button Creator</Link>
                    <Link to="/buttonSimulator">Simulator</Link>
                </div>
                <div id="content">{this.props.children}</div>
            </div>
        )
    }
}

// Create the routes available
// Provides navigation within the app (but no direct access from URL yet)
// Root is / and its default content is the Home component
// Content (props.children) changes if you have a different route to the appropriate component
let routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="buttonMaker" component={ButtonCreator}/>
        <Route path="buttonSimulator" component={ButtonSimulator}/>
    </Route>
)

/* Old version of React Router (pre-1.0)
 Router.run(routes, (Handler) => {
 React.render(<Handler/>, document.body)
 })*/

// Render the Router which will handle components rendering depending on the route
// NOTE: Use browserHistory if you don't want to see the hash sign in the URL
ReactDOM.render(
    <Provider store={theStore}>
        <Router history={appHistory}>{routes}</Router>
    </Provider>,
    document.getElementById("app")
)