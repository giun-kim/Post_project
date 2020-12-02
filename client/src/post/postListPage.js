import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import './postList.css'
import Pagenation from './paginate/pagenation'
import Items from './paginate/items'

function PostListPage(props){
    const [Posts, setPosts] = useState([])
    const [Loading, setLoading] = useState(false)
    // 현재 페이지
    const [CurrentPage, setCurrentPage] = useState(1)
    // 한 페이지에 보여줄 컨텐츠 수
    const [PostsPerPage, setPostsPerPage] = useState(10)
    useEffect(() => {
        setLoading(true)
        axios.get('/post/list')
        .then(res=>{
            setPosts(res.data);
            setLoading(false)
        })
    }, []);
    // 현재 페이지 * 한 페이지에 나타낼 게시글 수
    const indexOfLastPost = CurrentPage * PostsPerPage;
    // 현재 페이지의 마지막 게시글 수 - 한 페이지에 나타낼 게시글 수
    const indexOfFirstPost = indexOfLastPost - PostsPerPage;
    // 현재 페이지 게시글
    const currentPosts = Posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {
        if(pageNumber===0){
            return alert('첫 번째 페이지 입니다.')
        }else if(pageNumber=== -1){
            return alert('마지막 페이지 입니다.')
        }else{
            setCurrentPage(pageNumber);
        }
    }

    const handleCreate = ()=>{
        props.history.push('/post/create')
    };
   
    const createButton = ()=> {
        if(props.auth.isAuth){
           return  <button onClick={handleCreate}>게시글 만들기</button>
        }else{
            return null;
        }
    }
    return(Posts.length !==0 ? (
        <div className="container">
            <Items Posts={currentPosts} loading={Loading}/>
            <Pagenation postsPerPage={PostsPerPage} currentPage = {CurrentPage} totalPosts={Posts.length} paginate={paginate} />
            <div className="new-post">
                {createButton()}
            </div>
        </div>
        )
        :(
            <div className="new-post">
                {createButton()}
            </div> 
        ))
}

export default withRouter(PostListPage)
