import React,{useState} from 'react'
import { Link } from 'react-router-dom';

function Pagenation(props) {
    const pageNumbers=[];
    const [PageArraykey, setPageArraykey] = useState(0)

    // totalPosts = 전체 게시글 수, postsPerPage = 한 페이지에 나타낼 게시글 수
    for(let i = 1; i<=Math.ceil(props.totalPosts / props.postsPerPage); i++){
        // Math.ceil() = 소수점 올림
        pageNumbers.push(i);
    }

    // 배열에 페이지네이션 한 페이지에 나탈낼 n개 만큼의 게시글 담기
    const division = (n) => {
        let arr = pageNumbers;
        let len = arr.length;
        let cnt = Math.floor(len / n);  // Math.floor() = 소수점 버림
        if((len/n)%1 === 0){
            cnt = Math.floor(len / n) - 1;
        }
        let tmp = [];
    
        for (let i = 0; i <= cnt; i++) {
            tmp.push(arr.splice(0, n));
        }
        return tmp;
    }
 
    const pageArray = division(5);
    const pageControlHandle = (n) => {
        if(n===0){ // 이전 버튼 
            if(PageArraykey === 0){ // 첫 번째 페이지일 경우
                return props.paginate(0)
            }
            setPageArraykey(PageArraykey-1)
        }else{ // 다음 버튼
            if(PageArraykey===pageArray.length -1){ // 마지막 페이지일 경우
                return props.paginate(-1)
            }
            setPageArraykey(PageArraykey+1)
        }
    }
    const pageNum = pageArray[PageArraykey].map((number, key)=>{
        return(
            <li key={key} className="pagination-li">
                <Link onClick={()=>props.paginate(number)} to="/post/list">{number}</Link>
            </li>
        )
    })

    return (
        <div className="pagination-div">
            <button onClick={()=>pageControlHandle(0)}>◀</button>
            <ul className="pagination-ul">
                {pageNum}
            </ul>
            <button onClick={()=>pageControlHandle(1)}>▶</button>
        </div>
    )
}

export default Pagenation
