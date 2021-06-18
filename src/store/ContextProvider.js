import { createContext, useEffect, useState } from 'react'

const ContextProvider= createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin:()=>{}
})



export const AuthContextProvider =(props)=>{
    const [isLoggedIn,setIsLoggedIn] =useState(false);

    useEffect(()=>{
        const currentLoggedCheck=localStorage.getItem('logged')
        if (currentLoggedCheck==='1'){
            setIsLoggedIn(true)
        }
    }, [] )

    const loginHandler =(email,pass)=>{
        localStorage.setItem('logged',1)
        setIsLoggedIn(true)
    }
    const logoutHandler =()=>{
        localStorage.removeItem('logged')
        setIsLoggedIn(false)
    }
    return <ContextProvider.Provider value={{
        isLoggedIn:isLoggedIn,
        onLogout:logoutHandler,
        onLogin:loginHandler
    }}
    >{props.children}</ContextProvider.Provider>
}

export default ContextProvider
