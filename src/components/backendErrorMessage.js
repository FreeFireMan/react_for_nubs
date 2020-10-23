
import React from 'react'

const BackendErrorMessage = ({backendError}) =>{
    console.log("backendError");
    console.log(backendError);

    const errorMessages = Object.keys(backendError).map(value => {
        console.log('value');
        console.log(value);
        const message = backendError[value].join(' ')
        return `${value} ${message}`
    })
    return (<ul className="text-danger">
        {errorMessages.map(msg=>{
            return <li key={msg}>{msg}</li>
        })}
    </ul>)




}
export default BackendErrorMessage
