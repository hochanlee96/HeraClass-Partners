import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from "../fbase";

const Auth = props => {

    const history = useHistory();

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const onInputChange = event => {
        if (event.target.name === "email") {
            setEmailInput(event.target.value)
        } else if (event.target.name === 'password') {
            setPasswordInput(event.target.value)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (!isLogin) {
                data = await authService.createUserWithEmailAndPassword(
                    emailInput,
                    passwordInput
                );
            } else {
                data = await authService.signInWithEmailAndPassword(emailInput, passwordInput);
            }
            console.log(data);
            history.push('/');
        } catch (error) {
            setError(error.message);
        }
    };


    const LogInOrSignUp = () => {
        setIsLogin(prev => !prev)
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
                <input type="password" required placeholder="Password" value={passwordInput} name="password" onChange={onInputChange} />
                <input type="submit" />
            </form>
        </>
    )
}

export default Auth;