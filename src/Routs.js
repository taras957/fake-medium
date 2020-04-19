import React from 'react'
import { Route, Switch} from 'react-router-dom'
import GlobalFeed from './pages/GlobalFeed/GlobalFeed'
import Article from './pages/Article/Article'
import Authentiaction from './pages/Authentication'
import TagFeed from './pages/TagFeed/TagFeed'
import YourFeed from './pages/YourFeed/YourFeed'
import CreateArticle from "./pages/CreateArticle/CreateArticle";
import EditArticle from './pages/EditArticle/EditArticle'
import Settings from "pages/Settings/Settings";
import UserProfile from 'pages/UserProfile/UserProfile'

export default () => {
    return (
      <Switch>
        <Route path="/" exact component={GlobalFeed}></Route>
        <Route path="/profiles/:slug" component={UserProfile}></Route>
        <Route path="/profiles/:slug/favorites" component={UserProfile}></Route>
        <Route path="/articles/new" component={CreateArticle}></Route>
        <Route path="/article/:slug/edit" component={EditArticle}></Route>
        <Route path="/tags/:slug" component={TagFeed}></Route>
        <Route path="/settings" component={Settings}></Route>
        <Route path="/feed" component={YourFeed}></Route>
        <Route path="/article/:slug" component={Article}></Route>
        <Route path="/login" component={Authentiaction}></Route>
        <Route path="/register" component={Authentiaction}></Route>
      </Switch>
    );
}
