import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function (SpecificComponent, option = null, adminRoute = null) {
    function AuthenticationCheck(props) {
        // option -> null = 아무나 허용, true = 로그인 됬을 때만 허용, false = 로그인 안됬을 때만 허용
        // adminRoute -> null = 아무나, true = 관리자만 사용, false = 관리자 빼고 사용
        // 현재 미사용
        const [Data, setData] = useState([])
        useEffect(() => {
            axios
                .get('/users/auth')
                .then(res => {
                    setData(res.data);
                })
        }, [])

        if(Data.length !==0 && option ===null){
            return <SpecificComponent auth={Data} prop={props}/>
        }
        return null
    }

    return AuthenticationCheck
}
