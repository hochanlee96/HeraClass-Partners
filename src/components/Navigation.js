import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

const Navigation = props => {


    const history = useHistory();
    const dispatch = useDispatch();

    const logOutClick = () => {
        dispatch(authActions.logout());
        history.push("/");
    };
    return (
        <>
            <div>
                Navigation
        </div>
            {props.userEmail ? <p onClick={logOutClick}>Log Out</p> : null}
        </>
    )
}

export default Navigation;