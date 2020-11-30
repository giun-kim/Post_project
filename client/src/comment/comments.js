import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './comments.css'
import {withRouter} from 'react-router-dom';

function Comments(props) {
    const [CreateComment, setCreateComment] = useState('')
    const [Comments, setComments] = useState([])
    const [GetComments, setGetComments] = useState(false)

    useEffect(() => {
        setComments(props.comments)
    }, [])

    useEffect(() => {
        axios.get('/post/comment/'+props.post_id)
        .then(res =>{
            setComments(res.data.comments)
        })
        return () => {
            setGetComments(false)
        }
    }, [GetComments])
    const commentCreateHandle = ()=> {
        const body = {
            user_id : props.auth.id,
            comment : CreateComment,
            post_id: props.post_id
        }
        axios.post('/post/comment/create', body)
        .then(res=>{
            setCreateComment('')
            setGetComments(true)
        })
    }

    const commentCreateChangeHandle = (e)=>{
        setCreateComment(e.currentTarget.value)
    }

    const createCommnet = ()=>{
        //로그인 일 때
        if(props.auth.isAuth)
        return(
            <div className="create-comment-div">
                <textarea className="create-comment-textarea" name="createComment" cols="80" rows="10" placeholder="댓글을 입력해 주세요." value={CreateComment} onChange={commentCreateChangeHandle}/>
                <div>
                    <button className="create-comment-button" onClick={commentCreateHandle}>등록</button>
                </div>
            </div>
        )
    }
    const comment_update = (id)=>{
        const body = {
            comment : document.getElementById('comment-text').innerText,
            post_id:props.post_id
        }
        axios.post('/post/comment/update/'+id, body)
        .then(res=>{
            setGetComments(true)
            alert('댓글 수정 완료')
        })
      
    }
    const comment_delete = (id)=>{
        const body = 
        axios.delete('/post/comment/delete/'+id, )
        .then(res =>{
            setGetComments(true)
        })
    }

    const comment = Comments.map((comment, key)=>{
        return(
            <div key={key} className="comment-div" id={comment.id}>
                <div>
                    <div>
                        <span><img className="comment-u-img" src="/images/userImg.png" alt="프로필 이미지" width="25px" height="25px"/></span>
                        <span className="comment-u-id-span">{comment.user.name}</span>
                    </div>
                    <div>
                        <span><p  id="comment-text" contentEditable={props.auth.id===comment.user_id 
                        ? "true" : "false"} suppressContentEditableWarning>{comment.comment}</p></span>
                    </div>
                    <div>
                        <span>{comment.date}</span>
                        {props.auth.id===comment.user_id || props.auth.isAdmin 
                        ? 
                        <span className="comment-u-d-button">
                            {props.auth.id===comment.user_id ? <button onClick={()=>comment_update(comment.id)}>수정</button> : null}
                            <button onClick={()=>comment_delete(comment.id)}>삭제</button>
                        </span> 
                        : null
                        }
                    </div>
                </div>
                <hr/>
            </div>

        )
    })
    return (
        <div className="comment-container">
            <div className="comment-all-length-div">
                <h5 className="comment-all-length">댓글 {Comments.length}</h5>
            </div>
            {createCommnet()}
            {comment}
        </div>
    )
}

export default withRouter(Comments)