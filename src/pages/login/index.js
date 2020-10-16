import React, {useContext, useEffect, useState} from 'react'
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {CurrentUserContext} from "../../contexts/currentUser";
import {Link, Redirect} from "react-router-dom";
import BackendErrorMessage from "../../components/backendErrorMessage";

const Login = (props) => {

    const pageTitle = 'Sing In'
    const descriptionLink = '/register'
    const descriptionText = 'Need an account?'
    const apiUrl = '/token/'

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [{isLoading, response,error},doFetch] = useFetch(apiUrl)
    const [,setToken] = useLocalStorage('token')
    const [currentUser,dispatch] = useContext(CurrentUserContext)
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)




    const handleSubmit = (e) => {
        e.preventDefault();
        const body = JSON.stringify({username, password})
        console.log('user');
        console.log(body);
        doFetch({
            method: 'post',
            body
        })
    }


    useEffect(()=>{
        if(!response){
            return;
        }

        if(response.hasOwnProperty('access')){
            console.log('response access');
            setIsSuccessfullSubmit(true)
            setToken(JSON.stringify(response))
        }
    },[response,setToken])


    if(isSuccessfullSubmit){
        return <Redirect to={'/'}/>
    }

    return (
        <div className="auth-page">
            <div className='container'>
                <div className="row ">
                    <div className="col-md-6 offset-sm-3 col-xs-12">
                        <h1 className="text-center">{pageTitle}</h1>
                        <p className="text-xs-center">
                            <Link to={descriptionLink}>{descriptionText}</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            {error && <BackendErrorMessage backendError={error} />}
                            <fieldset>
                                <fieldset className="form-group">
                                    <input

                                        type='text'
                                        className="form-control form-control-lg"
                                        placeholder="Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}

                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <input
                                        type='password'
                                        className="form-control form-control-lg"
                                        placeholder="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}

                                    />
                                </fieldset>
                                <button
                                    className="btn btn-lg btn-primary pull-right"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {pageTitle}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Login
