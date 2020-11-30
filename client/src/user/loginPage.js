import React,{useState} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHandler = (e)=>{
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = (e)=>{
        setPassword(e.currentTarget.value)
    }
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        
        let body = {
            email:Email,
            password:Password,
        }
        axios.post('/users/login', body)
        .then(res=>{
            if(res.data.loginSuccess){
                // props.history.push('/');
                window.location.replace('/');
            }else{
                alert('Login Failed');
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
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
