import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Navigation from './nav/navigation';
import PostListPage from './post/postListPage';
import PostCreateAndUpdatePage from './post/postCreateAndUpdatePage';
import LoginPage from './user/loginPage';
import PostInfoPage from './post/postInfoPage';
import RegisterPage from './user/registerPage';
import Auth from './hoc/auth';
import MainPage from './main/main';

function App() {
    // route = 요청 경로와 렌더링할 컴포넌트 설정
    // switch = 하위 라우터중 하나를 선택한다
    // redirect = 요청 경로를 다른 경로로 리다이렉션

    // Auth(Component) 로 감싸서 요청 시 props에 route데이터가 담기지 않음. 
    // withRouter를 사용하여 route정보를 사용하거나 Auth 컴포넌트에서 props를 전달하는 방식으로 route데이터를 사용 가능
    return (
        <div className="container">
            <Router> 
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={Auth(MainPage)} />
                    <Route exact path="/post/list" component={Auth(PostListPage)} />
                    <Route exact path="/post/create" component={Auth(PostCreateAndUpdatePage)} />
                    <Route exact path="/post/update/:id" component={Auth(PostCreateAndUpdatePage)} />
                    <Route exact path="/post/info/:id" component={Auth(PostInfoPage)} />
                    <Route exact path="/users/login" component={LoginPage} />
                    <Route exact path="/users/register" component={RegisterPage} />
                    <Redirect path="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
