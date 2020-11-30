import React,{useState, useRef} from 'react'
import { Link } from 'react-router-dom';

function Pagenation(props) {
    const pageNumbers=[];
    const [PageArraykey, setPageArraykey] = useState(0)

    for(let i = 1; i<=Math.ceil(props.totalPosts / props.postsPerPage); i++){
        pageNumbers.push(i);
    }

    const division = (n) => {
        let arr = pageNumbers;
        let len = arr.length;
        let cnt = Math.floor(len / n);
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
        if(n===0){
            if(PageArraykey === 0){
                return props.paginate(0)
            }
            setPageArraykey(PageArraykey-1)
        }else{
            if(PageArraykey===pageArray.length -1){
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
