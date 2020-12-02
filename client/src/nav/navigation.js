import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import './navigation.css'

function Navigation() {
    const [LoginCheck, setLoginCheck] = useState([])
    useEffect(() => {
        axios
            .get('/users/auth')
            .then(res => {
                setLoginCheck(res.data)
            })
    }, []);

    const handleLogoutButton = () => {
        axios
            .get('/users/logout')
            .then(res => {
                window
                    .location
                    .replace('/');
            })
    }
    return (LoginCheck.length !== 0 && (
            LoginCheck.isAuth === true
            ? (
                <div className="nav-div">
                     <ul className="nav-page">
                         <li className="content-li">
                             <Link className="active" to="/">Home</Link>
                         </li>
                         <li className="content-li">
                             <Link to="/post/list">게시판</Link>
                         </li>
                         <li className="user-li">
                             <Link to="/" onClick={handleLogoutButton}>로그아웃</Link>
                         </li>
                         <li className="user-li">
            <label>{LoginCheck.role ===1 ? LoginCheck.name+' 관리자님 환영합니다' : LoginCheck.name + '님 환영합니다.'}</label>
                        </li>
                     </ul>
                </div>
            )
            : (
                <div className="nav-div">
                    <ul className="nav-page">
                        <li className="content-li">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="content-li">
                            <Link to="/post/list">게시판</Link>
                        </li>
                        <li className="user-li">
                            <Link to="/users/register">회원가입</Link>
                        </li>
                        <li className="user-li">
                            <Link to="/users/login">로그인</Link>
                        </li>
                    </ul>
                </div>
            )
    ))

}

export default Navigation