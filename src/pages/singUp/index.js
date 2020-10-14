import React, {useContext, useEffect, useState} from 'react'
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {CurrentUserContext} from "../../contexts/currentUser";
import {Link, Redirect} from "react-router-dom";
import BackendErrorMessage from "../../components/backendErrorMessage";

const SingUp = (props) => {
    console.log('props',props);
    const isLogin = props.match.path === '/login'
    const pageTitle = isLogin ? 'Sing In' : 'Sing Up'
    const descriptionLink = isLogin ? '/register' : '/login'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const apiUrl = !isLogin ? '/signup' : '/token/'
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [{isLoading, response,error},doFetch] = useFetch(apiUrl)
    const [,setToken] = useLocalStorage('token')
    const [currentUser,dispatch] = useContext(CurrentUserContext)
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
    const [isSuccessfullSubmitRegister, setIsSuccessfullSubmitRegister] = useState(false)
    // if(isLogin){
    //     setIsSuccessfullSubmitRegister(false)
    // }



    const handleSubmit = (e) => {
        e.preventDefault();
        const user = isLogin ? {username, password} : {email, password, username, profile: {phone: "+380978065905"}}
        const body = JSON.stringify(user)
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
        if(response.hasOwnProperty('username')){
            console.log('response username');
            setIsSuccessfullSubmitRegister(true)
        }
        if(response.hasOwnProperty('access')){
            console.log('response access');
            setIsSuccessfullSubmit(true)
            setToken(JSON.stringify(response))
        }
    },[response,setToken])




    if(isSuccessfullSubmitRegister){
        return <Redirect to={'/login'}/>
    }
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
                                {!isLogin && (
                                    <fieldset className="form-group">
                                        <input
                                            name='email'
                                            type='email'
                                            className="form-control form-control-lg"
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}

                                        />
                                    </fieldset>

                                )}
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
export default SingUp
