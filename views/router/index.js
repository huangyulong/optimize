import { Switch, Route, HashRouter} from 'react-router-dom'
import React from 'react'
import AsyncComponent from './asyncComponent'

export default class Routers extends React.Component {
    render() {
        return(
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={AsyncComponent(()=>import('../pages/home/index.jsx'))} />
                    <Route path="/detail"  component={AsyncComponent(()=>import('../pages/detail/index.jsx'))} />
                </Switch>
            </HashRouter>
        )
    }
}