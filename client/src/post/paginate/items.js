import React from 'react'
import {withRouter} from 'react-router-dom';

function Items(props) {
    if(props.loading) return <h2>Loading...</h2>

    const handleInfoPage = (e)=>{
        const params= e.currentTarget.getAttribute('data-msg');
        if(params === null) return alert('params is null')
        props.history.push('/post/info/'+params)
    }


    const pushPosts = props.Posts.map((post, key)=>{
        return(
            <tr key={key} data-msg={post.id} onClick={handleInfoPage}>
                <td className="td_post">{post.id}</td>
                <td className="td_post_title">{post.title}</td>
                <td className="td_post">{post.user.name}</td>
                <td  className="td_post">{post.date}</td>
                <td>{post.view_count}</td>
            </tr>
        )
    })
    return (
        <div id ='postList_table'>
                <table>
                    <thead>
                        <tr>
                            <td>번호</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>날짜</td>
                            <td>조회수</td>
                        </tr>
                    </thead>
                   <tbody>
                       {pushPosts}
                   </tbody>
                </table>
            </div>
    )
}

export default withRouter(Items)