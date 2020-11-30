import axios from 'axios';
import React,{useState} from 'react'
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event)=>{
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value)
    }

    const onPasswordHandler = (e)=>{
        setPassword(e.currentTarget.value)
    }

    const onConfirmPasswordHandler = (e)=>{
        setConfirmPassword(e.currentTarget.value)
    }
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        if(Password !== ConfirmPassword){
            return alert('비밀번호를 확인해 주세요.')
        }
        let body = {
            email:Email,
            password:Password,
            name:Name,
        }
        axios.post('/users/register', body)
        .then(res=>{
            if(res.data.registerSuccess){
                alert('회원가입 성공')
                props.history.push('/');
            }else{
                alert('이메일 중복');
            }
        })
    }
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems: 'center', with:'100%',height:'100vh'
        }}>
            <form onSubmit={onSubmitHandler} style={{display:"flex", flexDirection:"column"}}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <button>회원가입</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
