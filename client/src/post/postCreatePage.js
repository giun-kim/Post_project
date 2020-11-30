import React, {useState} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function PostCreatePage(props) {
    const [Title, setTitle] = useState('')
    const [Post, setPost] = useState('')
    const cancleHandle = () => {
        props.history.push('/post/list')
    }
    const onSubmitHandle = (e) => {
        e.preventDefault();
        let body = {
            title: Title,
            post: Post,
            user_id:props.auth.id
        }
        axios
            .post('/post/create',body)
            .then(res => {
                alert('생성 완료')
                props
                    .history
                    .push('/post/list')
            })
            .catch(err=>{
                alert('error');
            })
    }
    const postChangeHandle = (e) => {
        setPost(e.currentTarget.value)
    }
    const titleChangeHandle = (e) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div className="container">
            <div className="div-form-container">
                <form onSubmit={onSubmitHandle}>
                    <div className="title">
                        <label>제목</label>
                        <input type="text" name="title" onChange={titleChangeHandle}/>
                    </div>
                    <textarea
                    className="post"
                        name="post"
                        cols="30"
                        rows="10"
                        placeholder="내용을 입력해 주세요."
                        onChange={postChangeHandle}/>
                    <div className="button">
                        <button>만들기</button>
                        <button onClick={cancleHandle}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(PostCreatePage);
