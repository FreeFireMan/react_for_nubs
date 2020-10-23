import {useEffect, useState, useCallback} from "react";

import useLocalStorage from "./useLocalStorage";

export default (url) => {
    const baseUrl = 'http://127.0.0.1:8000'
    const [isLoading, setIsLoading] =  useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const [token,setToken] = useLocalStorage('token')


    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
    },[])


    useEffect(() => {
        const tok_obj = token && JSON.parse(token)
        console.log('tok_obj');
        console.log(tok_obj.refresh);
        const Authorization = tok_obj.access ? `Bearer ${tok_obj.access}` : ''
        const requestOptions = {
            ...options,
            ...{
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization
                }
            }
        }
         console.log('requestOptions',requestOptions);

        if (!isLoading) {
            return
        }
        fetch(baseUrl + url, requestOptions)
            .then(response => {

                if( ![400, 415, 401].includes(response.status)){
                    return response.json()
                }
                else{
                    console.log("response.status",response.status);
                    if(response.status === 401){
                        const refreshRequest = {
                            method: 'POST',
                            // mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',

                            },
                            body:{
                                 "refresh" : `"refresh":${tok_obj.refresh}`,
                            }

                        }
                        console.log("refreshRequest");
                        console.log(refreshRequest);
                        fetch(baseUrl + '/token/refresh/', refreshRequest)
                            .then( response =>{
                                console.log(response);
                                console.log('response');
                                return response.json()
                            })
                            .then( response =>{
                                console.log(response);
                                console.log('response');
                                if(response.hasOwnProperty('access')){
                                    tok_obj.access = response.access
                                    setToken(JSON.stringify(tok_obj))
                                }
                            })
                            .catch(error =>{
                                console.log('ERROR', error);
                                setError(error)
                            })
                    }

                    setIsLoading(false)
                    response.json().then( res=>{
                            console.log('ERROR', res);
                            setError(res)
                        }
                    )
                }

            })
            .then(res => {
                console.log('success', res);
                setResponse(res)
                setIsLoading(false)
            })
            .catch((response) => {
                setIsLoading(false)
                console.log('fetch_ERROR', response);
                setError(response)
            })

    },[isLoading,url,options,token])

    return [{isLoading, response, error}, doFetch]
}
