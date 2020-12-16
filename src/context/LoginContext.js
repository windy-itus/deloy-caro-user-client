import React, { useState, createContext } from 'react';
import { socket, msgOnline, msgLogout } from './Socket'
export const LoginContext = createContext();
export const SocketContext = createContext();


export const LoginProvider = props => {
    const [isLogin, setIsLogin] = useState(true);

    React.useEffect(() => {
        msgOnline(setIsLogin)
    }, [])

    const handleLogin = (token) => {
        localStorage.setItem('id_token', JSON.stringify(token));
        msgOnline(setIsLogin)
    }

    const handleLogout = async () => {
        msgLogout(setIsLogin)
    }
    return (
        <LoginContext.Provider value={[isLogin, handleLogin, handleLogout]}>
            <SocketContext.Provider value={socket}>
                {props.children}
            </SocketContext.Provider>
        </LoginContext.Provider>
    )
}