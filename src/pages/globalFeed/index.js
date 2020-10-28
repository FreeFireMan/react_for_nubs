
import React, {useEffect} from 'react'
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {CurrentUserContext} from "../../contexts/currentUser";
import {Link, Redirect} from "react-router-dom";
import BackendErrorMessage from "../../components/backendErrorMessage";

const GlobalFeed = ()=>{
    const [{isLoading, response, error},doFetch] = useFetch('/token/refresh/')
    const [tok,setToken] = useLocalStorage('token')
    const token = JSON.parse(tok)
    console.log('token');
    console.log(token.refresh);

    const refreshToken = ()=>{
        const body = JSON.stringify({
            refresh: token.refresh
        })
        console.log('body');
        console.log(body);
        doFetch({
            method: 'post',
            body
        })
    }
    useEffect(() =>{
        console.log('useEffect');
        if(!response){
            return
        }
        token.access = response.access
        setToken(JSON.stringify(token))
    },[response,setToken])

    return (
        <div>Global Feed
            <button onClick={refreshToken}>refresh</button>
        </div>
    )
}

export default GlobalFeed
