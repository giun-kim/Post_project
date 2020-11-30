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
    const onSubmitHandle = (e) => {
        e.preventDefault();
        let body = {
            title: Title,
            post: Post,
            user_id: props.auth.id
        }
        axios
            .post('/post/update/' + props.match.params.id, body)
            .then(res => {
                alert('수정 완료')
                props
                    .history
                    .push('/post/list')
            })
            .catch(err => {
                alert('error');
            })
        }
    const cancleHandle = () => {
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
    const deleteHandle = (e) => {
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
                    <div className="div-form-container">
                        <form onSubmit={onSubmitHandle}>
                            <div className="title">
                                <label>제목</label>
                                <input type="text" name="title" value={Title} onChange={titleChangeHandle}/>
                            </div>
                            <textarea className="post"
                                name="post"
                                cols="30"
                                rows="10"
                                placeholder="내용을 입력해 주세요."
                                onChange={postChangeHandle}
                                value={Post}/>
                            <div className="button">
                            {User===props.auth.id ? <button>수정</button> : null }
                                <button onClick={cancleHandle}>돌아가기</button>
                                <button onClick={deleteHandle}>삭제</button>
                            </div>
                        </form>
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
                                <button onClick={cancleHandle}>돌아가기</button>
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
