import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth'

const Auth = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [emailInput, setEmailInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const onInputChange = event => {
        if (event.target.name === "email") {
            setEmailInput(event.target.value)
        } else if (event.target.name === "username") {
            setUsernameInput(event.target.value)
        } else if (event.target.name === 'password') {
            setPasswordInput(event.target.value)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isLogin) {
                dispatch(authActions.register(emailInput, usernameInput, passwordInput))
            } else {
                dispatch(authActions.login(emailInput, passwordInput))
            }
            history.push('/');
        } catch (error) {
            setError(error.message);
        }
    };


    const LogInOrSignUp = () => {
        setIsLogin(prev => !prev)
        setUsernameInput('');
    }
    return (
        <>
            <div>
                Auth Page
            </div>
            <p onClick={LogInOrSignUp}>{isLogin ? "Log In" : "Sign Up"}</p>
            {error ? <p>{error}</p> : null}
            <form onSubmit={onSubmit}>
                <input type="email" required placeholder="Email" value={emailInput} name="email" onChange={onInputChange} />
                {isLogin ? null : <input type="text" required placeholder="Username" value={usernameInput} name="username" onChange={onInputChange} />}
                <input type="password" required placeholder="Password" value={passwordInput} name="password" onChange={onInputChange} />
                <input type="submit" />
            </form>
        </>
    )
}

export default Auth;