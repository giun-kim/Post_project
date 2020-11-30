import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navigation from './nav/navigation';
import PostListPage from './post/postListPage';
import PostCreatePage from './post/postCreatePage';
import LoginPage from './user/loginPage';
import PostInfoPage from './post/postInfoPage';
import RegisterPage from './user/registerPage';
import Auth from './hoc/auth';
import MainPage from './main/main'

function App() {
    return (
        <div>
            <div className="container">
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" component={Auth(MainPage)}/>
                        <Route exact path="/post/list" component={Auth(PostListPage)}/>
                        <Route exact path="/post/create" component={Auth(PostCreatePage)}/>
                        <Route exact path="/post/info/:id" component={Auth(PostInfoPage)}/>
                        <Route exact path="/users/login" component={LoginPage}/>
                        <Route exact path="/users/register" component={RegisterPage}/>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
