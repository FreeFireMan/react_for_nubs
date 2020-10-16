import React, {useEffect, useState} from 'react'
import useFetch from "../../hooks/useFetch";

import {Link, Redirect} from "react-router-dom";
import BackendErrorMessage from "../../components/backendErrorMessage";

const SingUp = (props) => {
    console.log('SingUp');

    const pageTitle = 'Sing Up'
    const descriptionLink = '/login'
    const descriptionText = 'Have an account?'
    const apiUrl =  '/signup'
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('+380978065905')
    const [{isLoading, response,error},doFetch] = useFetch(apiUrl)
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)




    const handleSubmit = (e) => {
        e.preventDefault();
        const body = JSON.stringify(
            {email, password, username, profile: {phone}}
            )
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
            setIsSuccessfullSubmit(true)
        }

    },[response,])


    if(isSuccessfullSubmit){
        return <Redirect to={'/login'}/>
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
                                            name='email'
                                            type='email'
                                            className="form-control form-control-lg"
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}

                                        />
                                    </fieldset>
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

                                        type='tel'

                                        className="form-control form-control-lg"
                                        placeholder="Username"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}

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
