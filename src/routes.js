import {Switch, Route} from 'react-router-dom'
import React from 'react'

import GlobalFeed from "./pages/globalFeed";
// import Article from "./pages/article";
import Login from "./pages/login";
import SingUp from "./pages/singUp";
// import TagFeed from "./pages/tagFeed";
// import YourFeed from "./pages/yourFeed";
// import CreateArticle from "./pages/createArticle";
// import EditArticle from "./pages/editArticle";
// import Settings from "./pages/settings";

export default ()=>{
    return (
        <Switch>
            <Route path="/" component={GlobalFeed} exact />
            {/*<Route path="/settings" component={Settings} />*/}
            {/*<Route path="/articles/:slug/edit" component={EditArticle}/>*/}
            {/*<Route path="/articles/new" component={CreateArticle}/>*/}
            {/*<Route path="/articles/:slug" component={Article}/>*/}
            {/*<Route path="/feed" component={YourFeed} />*/}
            {/*<Route path="/tags/:slug" component={TagFeed} />*/}
            <Route path="/login" component={Login}/>
            <Route path="/register" component={SingUp}/>
        </Switch>
    )
}
