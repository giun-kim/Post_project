import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function PostCreateAndUpdatePage(props) {
    console.log(props)
    const [Title, setTitle] = useState('')
    const [Post, setPost] = useState('')

    useEffect(() => {
        // props.match.params.id === undefined = 새로 만들기로 든어온 경우
        // props.match.params.id 값이 있을 경우 = 게시글 수정을 통해 들어온 경우
        if(props.match.params.id !== undefined){
            setTitle(props.history.location.state.title)
            setPost(props.history.location.state.post)
        }
    }, [])
    const cancleCreateHandle = () => {
        props.history.push('/post/list')
    }
    const cancleUpdateHandle = () => {
        props.history.push('/post/info/'+props.match.params.id)
    }
    const onCreateSubmitHandle = (e) => {
        e.preventDefault();
        if(Title.length<=0) return alert('제목을 입력해 주세요')
        if(Post.length<=0) return alert('내용을 입력해주세요.')
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
    const onUpdateSubmitHandle = (e) => {
        e.preventDefault();
        if(Title.length<=0) return alert('제목을 입력해 주세요')
        if(Post.length<=0) return alert('내용을 입력해주세요.')
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
                    .push('/post/info/'+props.match.params.id)
            })
            .catch(err => {
                alert('error');
            })
        }
    const postChangeHandle = (e) => {
        setPost(e.currentTarget.value)
    }
    const titleChangeHandle = (e) => {
        setTitle(e.currentTarget.value)
    }
    return (props.match.params.id === undefined ?(
        <div className="container">
            <div className="div-form-container">
                <form onSubmit={onCreateSubmitHandle}>
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
                        <button onClick={cancleCreateHandle}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    )
    :
    (
    <div className="container">
        <div className="div-form-container">
            <form onSubmit={onUpdateSubmitHandle}>
                <div className="title">
                    <label>제목</label>
                    <input type="text" name="title" value={Title} onChange= {titleChangeHandle}/>
                </div>
                <textarea className="post"
                    name="post"
                    cols="30"
                    rows="10"
                    placeholder="내용을 입력해 주세요."
                    onChange={postChangeHandle}
                    value={Post}/>
                <div className="button">
                    <button>수정하기</button>
                    <button onClick={cancleUpdateHandle}>취소</button>
                </div>
            </form>
        </div>
    </div>
    ))
}

export default withRouter(PostCreateAndUpdatePage);
