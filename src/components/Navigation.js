import React from 'react';
// import { useHistory } from 'react-router-dom';
import { authService } from '../fbase';

const Navigation = props => {

    // const history = useHistory();
    const logOutClick = () => {
        authService.signOut();
        // history.push("/");
    };
    return (
        <>
            <div>
                Navigation
        </div>
            {props.userObj ? <p onClick={logOutClick}>Log Out</p> : null}
        </>
    )
}

export default Navigation;