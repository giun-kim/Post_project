import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import './postInfo.css'
import CommentsPage from '../comment/comments'

function PostInfoPage(props) {
    const [Post, setPost] = useState('')
    const [Title, setTitle] = useState('')
    const [IsLogin, setIsLogin] = useState(null)
    const [Comments, setComments] = useState([])
    const [User, setUser] = useState(null)

    useEffect(() => {
        axios
            .get('/Post/info/' + props.match.params.id)
            .then(res => {
                setTitle(res.data.post.title)
                setPost(res.data.post.post)
                setComments(res.data.comments)
                setUser(res.data.post.user_id)
                
                if(res.data.post.user_id===props.auth.id || props.auth.isAdmin){
                    setIsLogin(true)
                }else{
                    setIsLogin(false)
                }
            })
    }, [])

    const changeComments = (comments)=> {
        setComments(comments)
    }
    const onClickCancleHandle = () => {
        props
            .history
            .push('/post/list')
    }
    const postChangeHandle = (e) => {
        setPost(e.currentTarget.value)
    }
    const titleChangeHandle = (e) => {
        setTitle(e.currentTarget.value)
    }
    const onClickUpdateHandle =()=>{
        props
            .history
            .push('/post/update/'+props.match.params.id, {title: Title, post:Post})
    }
    const onClcikDeleteHandle = (e) => {
        e.preventDefault();
        axios
            .delete('/post/delete/' + props.match.params.id)
            .then(res => {
                alert('삭제 성공');
                props
                    .history
                    .push('/post/list')
            })
    }
    return IsLogin !==null&& (
         IsLogin 
            ? (
                <div className="container">
                     <div className="div-container">
                            <div className="title">
                                <label>제목</label>
                                <input type="text" name="title" value={Title}readOnly="readOnly" onChange={titleChangeHandle}/>
                            </div>
                            <textarea className="post"
                                name="post"
                                cols="30"
                                rows="10"
                                placeholder="내용을 입력해 주세요."
                                onChange={postChangeHandle}
                                readOnly="readOnly"
                                value={Post}/>
                            <div className="button">
                            {User===props.auth.id ? <button onClick={onClickUpdateHandle}>수정</button> : null }
                                <button onClick={onClcikDeleteHandle}>삭제</button>
                                
                                <button onClick={onClickCancleHandle}>목록</button>
                            </div>
                    </div>
                    <div className="comment-div-in-postInfoPage">
                        <CommentsPage comments={Comments} post_id={props.match.params.id} auth={props.auth} changeComments={changeComments}/>
                    </div>
                </div>
                
            )
            : (
                <div className="container">
                    <div className="div-container">
                        <div className="title">
                            <label>제목</label>
                            <input type="text" name="title" value={Title} readOnly="readOnly"/>
                        </div>
                            <textarea className="post"
                                name="post"
                                cols="30"
                                rows="10"
                                placeholder="내용을 입력해 주세요."
                                value={Post}
                                readOnly="readOnly"/>
                            <div className="button">
                                <button onClick={onClickCancleHandle}>목록</button>
                            </div>
                    </div>
                    <div className="comment-div-in-postInfoPage">
                        <CommentsPage comments={Comments} post_id={props.match.params.id} auth={props.auth} changeComments={changeComments}/>
                    </div>
                </div>
            )
    )
}

export default withRouter(PostInfoPage)
