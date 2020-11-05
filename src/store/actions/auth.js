export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userData) => {
    return dispatch => {
        clearLogoutTimer();
        dispatch(setLogoutTimer(userData.expires));
        dispatch(
            {
                type: AUTHENTICATE,
                userData: userData
            }
        );
    }
}

export const logout = () => {
    return async dispatch => {
        const response = await fetch("http://localhost:3001/partners/auth/logout", {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (response.ok) {
            clearLogoutTimer();
            dispatch({ type: LOGOUT });
        }
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expires => {
    return dispatch => {
        const now = new Date().getTime()
        const expireTime = new Date(expires).getTime()
        timer = setTimeout(() => {
            dispatch(logout());
        }, expireTime - now);
    }
}


export const register = (email, username, password) => {
    return async dispatch => {
        const response = await fetch("http://localhost:3001/partners/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            })
        });

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong...';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!'
            }
            throw new Error(message);
        }
        const resData = await response.json();
        dispatch(authenticate(resData))
    }
}

export const login = (email, password) => {
    return async dispatch => {

        const response = await fetch("http://localhost:3001/partners/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });


        if (response.status !== 200) {
            const errorResData = await response.json();
            console.log('err', errorResData)
            const errorId = errorResData.error.message;
            let message = 'Something went wrong...';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!'
            }
            throw new Error(message);

        }

        const resData = await response.json();
        console.log('!!!', resData);
        dispatch(authenticate(resData));


    }
}

export const authCheckState = () => {
    return async dispatch => {
        const response = await fetch("http://localhost:3001/partners/auth/partner-data", {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const resData = await response.json();
        if (!resData.error) {
            dispatch(authenticate(resData));
        } else {
            dispatch(logout());
        }
    }
}

