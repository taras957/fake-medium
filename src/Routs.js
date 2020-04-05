import React from 'react'
import { Route, Switch} from 'react-router-dom'
import GlobalFeed from './pages/GlobalFeed/GlobalFeed'
import Article from './pages/Article/Article'
import Authentiaction from './pages/Authentication'
export default () => {
    return (
      <Switch>
        <Route path="/" exact component={GlobalFeed}></Route>
        <Route path="/aticle/:slug" component={Article}></Route>
        <Route path="/login" component={Authentiaction}></Route>
        <Route path="/register" component={Authentiaction}></Route>
      </Switch>
    );
}
